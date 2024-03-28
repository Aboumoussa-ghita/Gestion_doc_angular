import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private SignUpUrl = 'http://localhost:3000/sign_up';

  constructor(private http: HttpClient) { }

  signUpUser(username: string, password: string, email: string, first_name: string, last_name: string): Observable<any> {
    const formData = { username, password, email, first_name, last_name};
    return this.http.post(this.SignUpUrl, formData);
  }
}
