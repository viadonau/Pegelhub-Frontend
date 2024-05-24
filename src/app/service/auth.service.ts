import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private router = inject(Router);
    private loggedIn: WritableSignal<boolean> = signal(false);

    initialize() {
      const apiKey: string | null = localStorage.getItem('api_key');
      this.loggedIn.set(apiKey !== null);
    }

    isUserLoggedIn(): Signal<boolean> {
      return this.loggedIn.asReadonly();
    }

    login(apiKey: string): Promise<boolean> {
      localStorage.setItem('api_key', apiKey);
      this.loggedIn.set(true);
      return this.router.navigate(['/']);
    }

    logout() {
      localStorage.removeItem('api_key');
      this.loggedIn.set(false);
      void this.router.navigate(['/login']);
    }
}
