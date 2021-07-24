import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-password-recovery-page',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted: boolean;
  info: boolean;

  constructor(private _activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private _authService: AuthService,
              private router: Router,
              private _titleService: Title) {
    this._titleService.setTitle("Changement de mot de passe - " + environment.name);
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  ngOnInit(): void {
    this._authService.isValidToken(this._activatedRoute.snapshot.paramMap.get("resetToken"), this._activatedRoute.snapshot.paramMap.get("username"))
      .toPromise()
      .then(isValid => {
        if (!isValid) {
          this.router.navigate(['/forgot-password']).then();
        }
      });
    this.initForm();
  }

  onSubmitForm() {
    this.submitted = true;
    const formValue = this.resetPasswordForm.value;
    this._authService.resetPassword(this._activatedRoute.snapshot.paramMap.get("resetToken"), this._activatedRoute.snapshot.paramMap.get("username"), formValue.password)
      .toPromise()
      .then(() => {
        this.router.navigate(['/login']).then();
      });
  }

  samePasswordValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    return password.value === confirmPassword.value ? null : {notSame: true};
  }

  private initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern("^(?=.+[0-9])(?=.+[a-z])(?=.+[A-Z])(?=.+[*.!@$%^&(){}[_\\]:;<>,.?/~_+\\-=|]).{8,32}$")]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: this.samePasswordValidator});
  }
}
