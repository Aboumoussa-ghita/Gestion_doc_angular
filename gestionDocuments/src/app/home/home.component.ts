import {Component, ViewEncapsulation} from '@angular/core';
import { HomeService } from '../home.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class HomeComponent {
  users: any[] = [];

  constructor(private homeService: HomeService, private authService: AuthService, private router: Router){}

  ngOnInit() {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
    this.homeService.getAllUsers().subscribe({
      next: user => {
        this.users = user;
      }
    })
  }

  role_user() {
    this.homeService.getUsers('user').subscribe({
      next: user => {
        this.users = user;
      }
    });
  }

  role_admin() {
    this.homeService.getUsers('admin').subscribe({
      next: user => {
        this.users = user;
      }
    });
  }

  change_status(user: any){
    this.homeService.change(user.username).subscribe({
      next: stat => {
        this.homeService.getAllUsers().subscribe({
          next: user => {
            this.users = user;
          }
        });
      },
      error: err => {
        console.log(err);
      }
    })
  }

  delete(user: any){
    this.homeService.delete(user.username).subscribe({
      next: stat => {
        this.homeService.getAllUsers().subscribe({
          next: user => {
            this.users = user;
          }
        });
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
