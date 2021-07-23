import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean;
  info: boolean;

  constructor(private formBuilder: FormBuilder,
              private _authService: AuthService,
              private _titleService: Title) {
    this._titleService.setTitle("Mot de passe oublié - " + environment.name);
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmitForm() {
    this.submitted = true;
    const formValue = this.userForm.value;
    this._authService.forgotPassword(formValue.username)
      .subscribe(() => {
        this.info = true;
      }, () => {
      });
  }

  private initForm() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }
}
