import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserSignup } from '../models/user-signup';
import { UserLogin } from '../models/user-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  ClassStyle = '';
  form_signup!: FormGroup;
  form_Login!: FormGroup;
  user_signup!: UserSignup;
  user_login!: UserLogin;
  message: any = null;
  alertClasse!: string;
  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form_signup = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
        ],
      ],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.form_Login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
   
  }

  changeClasse(i: number): void {
    if (i == 1) {
      this.ClassStyle = '';
    } else {
      this.ClassStyle = 'active';
    }
  }

  logIn(form_Login: FormGroup) {
    this.user_login = {
      username: form_Login.value.username,
      password: form_Login.value.password,
    };
    this.authservice.login(this.user_login).subscribe((user) => {
      if (user) {
        this.alertClasse = 'alert-succes';
        this.message = '🎉 Félicitations pour votre connexion réussie ! 🎉';
        localStorage.setItem('userItem', JSON.stringify(user));
        this.router.navigateByUrl('/home')

        setTimeout(() => {
          this.message = null;
          
          
        }, 2000);
      } else {
        this.alertClasse = 'alert-error';
        this.message =
          '❌ Oops ! Les données saisies sont incorrectes. Veuillez réessayer';
        setTimeout(() => {
          this.message = null;
        }, 3000);
      }
    });
  }

  Signup(form_signup: FormGroup) {
    this.user_signup = {
      firstName: form_signup.value.firstName,
      lastName: form_signup.value.lastName,
      username: form_signup.value.username,
      password: form_signup.value.password,
    };

    this.authservice.SignUp(this.user_signup).subscribe((data) => {
      if (data) {
        
        this.authservice.ClearForm(form_signup);
        this.alertClasse = 'alert-succes';
        this.message =
          'Félicitations ! Vous êtes maintenant inscrit(e) avec succès !';
        setTimeout(() => {
          this.ClassStyle = '';
          this.message = null;
        }, 3000);
      } else {
        this.alertClasse = 'alert-error';
        this.message =
          'Votre adresse e-mail est déjà associée à un autre compte utilisateur. Veuillez en saisir une différente ou vous connecter avec votre compte existant.';
          setTimeout(() => {
            this.message = null;
          }, 6000);
        }

    });
  }
}
