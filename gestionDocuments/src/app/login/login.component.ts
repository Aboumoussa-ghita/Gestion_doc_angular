import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class LoginComponent {
  username : string = '';
  password : string = '';
  errorMessage : string  | null = null;

  constructor(private loginService: LoginService, private router: Router,private authService: AuthService) {}

  submit() {
    this.authService.login(this.username, this.password);
    this.errorMessage = this.authService.errorMessage;
  }

}
