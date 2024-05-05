import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  private apiKeyPattern = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/][AQgw]==|[A-Za-z0-9+/]{2}[AEIMQUYcgkosw048]=)?$");

  protected loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      apiKey: new FormControl('', [Validators.required, Validators.pattern(this.apiKeyPattern)])
    });
  }

  onContinue(): void {
    const formData = this.loginForm.value;
    const apiKey = formData?.apiKey || null;

    this.authService.authData.next({apiKey: apiKey});
    this.authService.loggedIn = true;
    this.router.navigate(['/']);
  }

  get formErrorMessage(): string {
    let errorMsg = '';
    const apiKeyFormControl = this.loginForm.get('apiKey');

    if (apiKeyFormControl?.hasError('required')) {
      errorMsg = 'Die Eingabe eines gültigen API Keys ist notwendig';
    }

    if (apiKeyFormControl?.hasError('pattern')) {
      errorMsg = 'Der eingegebene API Key entspricht nicht dem Base64-Format';
    }

    return errorMsg;
  }

  get nextButtonTooltip(): string {
    let tooltip = '';
    const apiKeyFormControl = this.loginForm.get('apiKey');

    if (apiKeyFormControl?.hasError('required')) {
      tooltip = 'Die Eingabe eines gültigen API Keys ist notwendig';
    }

    if (apiKeyFormControl?.hasError('pattern')) {
      tooltip = 'Der eingegebene API Key entspricht nicht dem Base64-Format';
    }

    return tooltip;
  }
}
