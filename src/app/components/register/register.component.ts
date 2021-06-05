import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean;
  error: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.error = false;
    this.submitted = false;
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get mail() {
    return this.registerForm.get('mail');
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmitForm() {
    this.submitted = true;
    const formValue = this.registerForm.value;
    this.authService.register(formValue.mail, formValue.username, formValue.password)
      .subscribe(() => {
      }, error => {
        this.submitted = false;
        if (error.status === 401) {
          this.error = true;
        }
      }, () => {
        this.router.navigate(['/']);
      });
  }

  samePasswordValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    console.log(password)
    console.log(confirmPassword)
    return password.value === confirmPassword.value ? null : {notSame: true};
  }

  private initForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.pattern("^(?=.+[0-9])(?=.+[a-z])(?=.+[A-Z])(?=.+[*.!@$%^&(){}[_\\]:;<>,.?/~_+\\-=|]).{8,32}$")]],
      confirmPassword: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]]
    }, {validators: this.samePasswordValidator});
  }
}
