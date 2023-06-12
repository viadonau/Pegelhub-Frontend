import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    public loggedIn: boolean = false;

    public authData = new BehaviorSubject<{
        apiKey: string
    } | null>(null);
}
