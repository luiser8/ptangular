import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { OrganizacionService } from 'src/app/servicios/organizacion/organizacion.service';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {
  public usuariosList : Object = {};
  public organizacionesList : Object = {};

  constructor(
                private usuariosService: UsuariosService, 
                private organizacionesService: OrganizacionService, 
                private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.usuariosList = this.usuariosService.getUsuarios();
    this.organizacionesList = this.organizacionesService.getOrganizaciones();
  }

  abrirModal(){
    this.dialog.open(DialogElements);
  }
}

//Componente para realizar el modal form
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'modalUsuarios.html',
})
export class DialogElements {
  constructor(public dialogRef: MatDialogRef<DialogElements>){}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
