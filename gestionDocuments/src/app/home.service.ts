import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private homeUrl = 'http://localhost:3000/home';
  
  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any> {
    return this.http.get(this.homeUrl);
  }

  getUsers(role: string = 'user'): Observable<any> {
    return this.http.get(`${this.homeUrl}/${role}`);
  }

  change(username: string): Observable<any> {
    const formData = {username};
    return this.http.post(this.homeUrl, formData);
  }

  delete(username: string): Observable<any>{
    return this.http.delete(`${this.homeUrl}/${username}`);
  }
}
