import { Component, ViewEncapsulation } from '@angular/core';
import { DossierService } from '../dossier.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ajoutdos',
  templateUrl: './ajoutdos.component.html',
  styleUrls: ['./ajoutdos.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AjoutdosComponent {
  name: string = "";

  constructor(private auth: AuthService, private dossierService:DossierService) { }

  submitForm() {
    this.dossierService.addDossier(this.name,this.auth.getCurrentUsername()).subscribe({
      next: doc => {
        console.log('document ajouté');
      },
      error: err => {
        console.log("erreur d'ajout");
      }
    });
  }
}
