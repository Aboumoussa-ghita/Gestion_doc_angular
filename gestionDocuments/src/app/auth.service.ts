import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  public errorMessage = '';
  public currentUser = '';

  constructor(private loginService: LoginService, private router: Router) {}

  login(username: string, password: string) {
    this.currentUser = username;
    this.loginService.loginUser(username, password).subscribe({
      next: role => {
        if(role == "admin")
          this.router.navigate(['/home']);
        else if(role == "user")
          this.check_status(username);
      },
      error: err => {
            if (err.status === 400) {
              this.errorMessage = 'Invalid username or password.';
            } else if (err.status === 500) {
              this.errorMessage = 'Internal server error. Please try again later.';
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again.';
            }
          }
    });
    this.isAuthenticated = true;
  }

  getCurrentUsername(): string {
    return this.currentUser;
  }

  check_status(username: string){
    this.loginService.loginStat(username).subscribe({
      next: stat => {
        if(stat == "active"){
          this.router.navigate(['/user']);
        }else{
          this.errorMessage = "Votre compte est Suspendus ! "
        }
      }
    })
  }

  logout() {
    // Implement logout logic and set isAuthenticated to false
    this.isAuthenticated = false;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
}
