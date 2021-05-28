import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean;
  error: boolean;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.error = false;
    this.submitted = false;
  }

  ngOnInit(): void {
  this.initForm();
  }

  private initForm() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmitForm() {
    this.submitted = true;
    const formValue = this.userForm.value;
    this.authService.login(formValue.username, formValue.password)
      .subscribe(()=> {
      },error => {
      if (error.status === 401) {
        this.submitted = false;
        this.error = true;
      }
    },()=>{
        this.router.navigate(['/']);
      });
  }
}
