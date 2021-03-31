import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { Usuario } from 'src/app/modelos/usuario.model';
import { ModalComponent } from './modal/modal.component';

const ELEMENT_USR: Usuario[] = [
  {
    "id": 1,
    "cedula": 20547896,
    "nombres": "Jose Miguel",
    "apellidos": "Diaz",
    "fechaNacimiento": "10-12-1987",
    "telefono": "+58 412-147-8796",
    "organizacion": "Amazon"
  },
  {
    "id": 2,
    "cedula": 10547896,
    "nombres": "Maria",
    "apellidos": "Rodriguez",
    "fechaNacimiento": "01-01-1997",
    "telefono": "+58 414-877-2257",
    "organizacion": "Facebook"
  },
  {
    "id": 3,
    "cedula": 2254889,
    "nombres": "Luisa",
    "apellidos": "Mendez",
    "fechaNacimiento": "25-11-1977",
    "telefono": "+58 416-847-7744",
    "organizacion": "Microsoft"
  },
  {
    "id": 4,
    "cedula": 18774896,
    "nombres": "Luis Jose",
    "apellidos": "Gonzalez",
    "fechaNacimiento": "08-06-1967",
    "telefono": "+58 412-889-0044",
    "organizacion": "Apple"
  },
  {
    "id": 5,
    "cedula": 25887544,
    "nombres": "Fabian",
    "apellidos": "Ramirez",
    "fechaNacimiento": "04-10-1998",
    "telefono": "+58 412-225-2200",
    "organizacion": "Google"
  }
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {
  public usuariosList = ELEMENT_USR;
  public durationInSeconds = 5;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';

  formulario = new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[0-9]+$/)]),
    nombres: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fechaNacimiento: new FormControl('', [Validators.required, Validators.minLength(3)]),
    organizacion: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private readonly dialog: MatDialog, private _snackBar: MatSnackBar) { }
  
  ngOnInit(): any {
    this.usuariosList;
  }

  openSnackBar(msj:any) {
    this._snackBar.open(msj, 'Ok', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  abrirModal(action, obj){
    obj.action = action;
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data:obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj:Usuario){
    this.usuariosList.push(row_obj); this.openSnackBar('Usuario agregado');
  }
  updateRowData(row_obj){
    this.usuariosList = this.usuariosList.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.nombres = row_obj.nombres;
        value.apellidos = row_obj.apellidos;
        value.telefono = row_obj.telefono;
      }
      return true;
    });
    this.openSnackBar('Usuario actualizado');
  }
  deleteRowData(row_obj){
    this.usuariosList = this.usuariosList.filter((value,key)=>{
      return value.id != row_obj.id;
    });
    this.openSnackBar('Usuario eliminado');
  }
}