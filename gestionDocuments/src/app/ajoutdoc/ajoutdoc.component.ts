import { Component, ViewEncapsulation } from '@angular/core';
import { DocumentService } from '../document.service';
import { DossierService } from '../dossier.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajoutdoc',
  templateUrl: './ajoutdoc.component.html',
  styleUrls: ['./ajoutdoc.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AjoutdocComponent {
  emplacement:string = '';
  name:string  =  '';
  extension:string =  '';
  type:string =  '';
  taille:number =  0;
  proprietaire:string = '';
  folder:string = '';
  folderName:string = '.';


  constructor(private documentService: DocumentService, private auth: AuthService, private doss:DossierService, private router: Router) {
    this.proprietaire = this.auth.getCurrentUsername();
    this.folder = this.doss.getFolderId()
    this.folderName = this.doss.getFolderName()
  };

  submitForm() {
    this.emplacement = this.folderName + '/' + this.name + '.' + this.extension;
    this.documentService.addDocument(this.emplacement,this.name,this.extension,this.type,this.taille,this.proprietaire,this.folder).subscribe({
      next: doc => {
        console.log('document ajouté');
      },
      error: err => {
        console.log("erreur d'ajout");
      }
    });
  }
}
