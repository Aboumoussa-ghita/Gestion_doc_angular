import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DossierService {
  private apiUrl = 'http://localhost:3000/dossier';

  constructor(private http: HttpClient) { }

  private folderId: string = '';
  private folderName: string = '.';

  async setFolderIdAndName(id: string, name: string): Promise<void> {
    this.folderId = id;
    this.folderName = name;
  }

  getFolderId(): string {
    return this.folderId;
  }

  getFolderName(): string {
    return this.folderName;
  }

  getDossiers(prop: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${prop}`);
  }

  addDossier(name: string,proprietaire: string): Observable<any> {
    const formData = {name, proprietaire};
    return this.http.post<any>(this.apiUrl, formData);
  }

  updateDossier(dossier: any): Observable<any> {
    const url = `${this.apiUrl}/${dossier.id}`;
    return this.http.put<any>(url, dossier);
  }

  deleteDossier(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
