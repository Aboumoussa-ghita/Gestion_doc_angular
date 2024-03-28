import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DocumentService } from '../document.service';
import { DossierService } from '../dossier.service';
import { AjoutdocComponent } from '../ajoutdoc/ajoutdoc.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentComponent implements OnInit {
  documents: any[] = [];
  editingDocument: any = null;
  folderId!: string;
  folderName!: string;

  constructor(private documentService: DocumentService,private dialog: MatDialog,private auth:AuthService,private doss:DossierService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.folderId = params.get('folderId') || '';
      this.folderName = params.get('folderName') || '.';
      this.doss.setFolderIdAndName(this.folderId, this.folderName)
    });
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.documentService.getDocuments(this.auth.getCurrentUsername(), this.folderId).subscribe({
      next: (documents: any[]) => {
        this.documents = documents;
      },
      error: (error) => {
        console.error('Error loading documents:', error);
      }
    });
  }

  editDocument(document: any) {
    this.editingDocument = document;
  }

  saveDocumentChanges() {
    this.documentService.updateDocument(this.editingDocument, this.folderName).subscribe({
      next: (updatedDocument) => {
        console.log('Document updated successfully:', updatedDocument);
        this.loadDocuments();
        this.editingDocument = null;
      },
      error: (error) => {
        console.error('Error updating document:', error);
      }
    });
  }

  cancelEdit() {
    this.editingDocument = null;
  }

  deleteDocument(document: any) {
    this.documentService.deleteDocument(document.id).subscribe({
      next: mess => {
        console.log(mess);
        this.loadDocuments();
      },
      error: err => {
        console.log(err);
      }
    });
    console.log('Deleting document:', document);
  }

  addDocument() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "450px";
    dialogConfig.position = { left: '30%' };
    dialogConfig.height = "auto";
    this.dialog.open(AjoutdocComponent, dialogConfig);
  }

  confirmDelete(document: any): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce document ?');

    if (confirmation) {
      this.deleteDocument(document);
    } else {
    }
  }
}
