import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserSignup } from '../models/user-signup';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: UserSignup;
  status: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}

  login(user_login: UserLogin): Observable<UserSignup> {
    return this.http.post<UserSignup>(
      'http://127.0.0.1:8000/login',
      user_login
    );
  }

  SignUp(user_signup: UserSignup): Observable<UserSignup> {
    return this.http.post<UserSignup>(
      'http://127.0.0.1:8000/signup',
      user_signup
    );
  }

  ClearForm(form: FormGroup) {
    form.reset();
  }

  ifAuthantcate():Boolean {
    let userString = localStorage.getItem('userItem');
   
    if (userString) {
      let user = JSON.parse(userString);
      
      this.user = {
        firstName: user['firstName'],
        lastName: user['lastName'],
        username: user['username'],
        password: user['password'],
      };
     
     
        this.status = true
        return true;
    }else {
      this.status= false;
      return false;
    }
    
  }
  logout(): void {
    localStorage.removeItem('userItem');
    this.status = false
    this.user = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
    };
    this.router.navigateByUrl('/auth');
  }
}
