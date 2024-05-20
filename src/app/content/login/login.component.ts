import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TooltipModule } from "primeng/tooltip";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    TooltipModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    RippleModule,
    ButtonModule
  ],
  standalone: true
})
export class LoginComponent {
  private apiKeyPattern = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/][AQgw]==|[A-Za-z0-9+/]{2}[AEIMQUYcgkosw048]=)?$");

  protected loginForm =  new FormGroup({
    apiKey: new FormControl('', [Validators.required, Validators.pattern(this.apiKeyPattern)])
  });

  constructor(private authService: AuthService, private router: Router) {}

  onContinue(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const apiKey = this.loginForm.controls.apiKey.value ?? '';
    this.authService.login(apiKey);
  }

  get formErrorMessage(): string {
    let errorMsg = '';
    const apiKeyFormControl = this.loginForm.controls.apiKey;

    if (apiKeyFormControl.hasError('required')) {
      errorMsg = 'Die Eingabe eines gültigen API Keys ist notwendig';
    }

    if (apiKeyFormControl.hasError('pattern')) {
      errorMsg = 'Der eingegebene API Key entspricht nicht dem Base64-Format';
    }

    return errorMsg;
  }

  get nextButtonTooltip(): string {
    let tooltip = '';
    const apiKeyFormControl = this.loginForm.controls.apiKey;

    if (apiKeyFormControl.hasError('required')) {
      tooltip = 'Die Eingabe eines gültigen API Keys ist notwendig';
    }

    if (apiKeyFormControl.hasError('pattern')) {
      tooltip = 'Der eingegebene API Key entspricht nicht dem Base64-Format';
    }

    return tooltip;
  }
}
