import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '../sign-up.service';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class SignUpComponent {
  username: string = '';
  last_name: string = '';
  first_name: string = '';
  password: string = '';
  confirmed_password: string = '';
  email: string = '';
  errorMessage: string | null = null;
  confirm: string | null = null;

  constructor(private signUpService: SignUpService, private router: Router) {}

  submit() {
    this.errorMessage = null;
    this.confirm = null;
    if (!this.username || !this.last_name || !this.first_name || !this.password || !this.confirmed_password || !this.email) {
      this.errorMessage = 'All fields are required.';
      return;
    }
    if (this.password !== this.confirmed_password) {
      this.confirm = 'Passwords do not match.';
      return;
    }

    this.signUpService.signUpUser(this.username, this.password, this.email, this.first_name, this.last_name)
      .subscribe({
        next: user => {
          this.router.navigate(['/login']);
        },
        error: err => {
          if (err.status === 400) {
            this.errorMessage = 'Utilisateur déjà existant.';
          } else if (err.status === 500) {
            this.errorMessage = 'Internal server error. Please try again later.';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again.';
          }
        }
      });
  }
}
