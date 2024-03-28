import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AjoutdosComponent } from '../ajoutdos/ajoutdos.component';
import { DossierService } from '../dossier.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
  dossiers: any[] = [];
  editingdossier: any = null;

  constructor(private dialog: MatDialog, private dossierService: DossierService, private auth: AuthService) { }

  ngOnInit(): void {
    this.loadDossiers();
  }

  editdossier(document: any) {
    this.editingdossier = document;
  }

  savedossierChanges() {
    this.dossierService.updateDossier(this.editingdossier).subscribe({
      next: updatedDossier =>{
        console.log('Document updated successfully:', updatedDossier);
        this.loadDossiers();
        this.editingdossier = null;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  cancelEdit() {
    this.editingdossier = null;
  }

  loadDossiers(): void {
    this.dossierService.getDossiers(this.auth.getCurrentUsername()).subscribe({
      next: (documents: any[]) => {
        this.dossiers = documents;
      },
      error: (error) => {
        console.error('Error loading documents:', error);
      }
    });
  }

  UpdateDossier(dossier: any) {
    this.dossierService.updateDossier(dossier).subscribe({
      next: message =>{
        console.log(message);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  deleteDossier(dossier: any) {
    this.dossierService.deleteDossier(dossier.id).subscribe({
      next: message =>{
        console.log(message);
        this.loadDossiers()
      },
      error: err => {
        console.log(err);
      }
    })
  }

  add_dos() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "450px";
    dialogConfig.position = { left: '30%' };
    dialogConfig.height = "auto";
    this.dialog.open(AjoutdosComponent, dialogConfig);
  }



}
