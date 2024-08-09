import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserSignup } from '../models/user-signup';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  isMobileProfileMenuOpen = false;
  status_user = false;
  user!: UserSignup;

  constructor(private authservice: AuthService) {
    
    
  }
  ngOnInit(): void {
    this.ifAuthantcate()
   
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  toggleMobileMenuProfile(): void {
    this.isMobileProfileMenuOpen = !this.isMobileProfileMenuOpen;
  }
  ifAuthantcate(): boolean {
    this.isMobileProfileMenuOpen
    this.authservice.ifAuthantcate();
    this.user = this.authservice.user;
    this.status_user = this.authservice.status;
    return this.status_user
  }
  logOut(): void {
    this.authservice.logout();
    this.user =  {
      firstName: "",
      lastName : "",
      username:"",
      password:""

    }
    this.status_user = false
    this.isMobileProfileMenuOpen = false;
    
  }
  getUser() {
    this.user = this.authservice.user;
  }
}
