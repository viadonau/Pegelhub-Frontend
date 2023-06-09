import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  
  constructor(
    private authService: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      apiKey: new FormControl()
    });
  }

  onContinue(): void {
    const formData = this.loginForm.value;
    const apiKey = formData?.apiKey || null;

    this.authService.authData.next({apiKey: apiKey});
    this.authService.loggedIn = true;
    this.router.navigate(['/']);
  }
}