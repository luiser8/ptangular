import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { Usuario } from 'src/app/modelos/usuario.model';
import { ModalComponent } from './modal/modal.component';

const ELEMENT_USR: Usuario[] = [
  {
    "id": 1,
    "cedula": 20547896,
    "avatar":"20547896.png",
    "nombres": "José Miguel",
    "apellidos": "Díaz",
    "fechaNacimiento": "10-12-1987",
    "telefono": "+58 412-147-8796",
    "organizacion": "Amazon"
  },
  {
    "id": 2,
    "cedula": 10547896,
    "avatar":"10547896.png",
    "nombres": "Maria",
    "apellidos": "Rodriguez",
    "fechaNacimiento": "01-01-1997",
    "telefono": "+58 414-877-2257",
    "organizacion": "Facebook"
  },
  {
    "id": 3,
    "cedula": 2254889,
    "avatar":"2254889.png",
    "nombres": "Luisa",
    "apellidos": "Mendez",
    "fechaNacimiento": "25-11-1977",
    "telefono": "+58 416-847-7744",
    "organizacion": "Microsoft"
  },
  {
    "id": 4,
    "cedula": 18774896,
    "avatar":"18774896.png",
    "nombres": "Luis José",
    "apellidos": "González",
    "fechaNacimiento": "08-06-1967",
    "telefono": "+58 412-889-0044",
    "organizacion": "Apple"
  },
  {
    "id": 5,
    "cedula": 25887544,
    "avatar":"25887544.png",
    "nombres": "Fabián",
    "apellidos": "Ramírez",
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
  public search: any = '';

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
        this.agregarUsuario(result.data);
      }else if(result.event == 'Update'){
        this.actualizarUsuario(result.data);
      }else if(result.event == 'Delete'){
        this.eliminarUsuario(result.data);
      }
    });
  }

  agregarUsuario(usuario:Usuario){
    this.usuariosList.push({
      "id": Number(this.usuariosList.length + 1),
      "cedula": usuario.cedula,
      "avatar": `${usuario.cedula}.png`,
      "nombres": usuario.nombres,
      "apellidos": usuario.apellidos,
      "fechaNacimiento": usuario.fechaNacimiento,
      "telefono": usuario.telefono,
      "organizacion": usuario.organizacion
    }); 
    this.openSnackBar('Usuario agregado');
  }

  actualizarUsuario(usuario){
    this.usuariosList = this.usuariosList.filter((value)=>{
      if(value.id == usuario.id){
        value.cedula = usuario.cedula;
        value.nombres = usuario.nombres;
        value.apellidos = usuario.apellidos;
        value.telefono = usuario.telefono;
        value.fechaNacimiento = usuario.fechaNacimiento;
        value.organizacion = usuario.organizacion;
      }
      return true;
    });
    this.openSnackBar('Usuario actualizado');
  }

  eliminarUsuario(usuario) {
    if (usuario.id) {
      this.usuariosList = this.usuariosList.filter((value) => {
        return value.id != usuario.id;
      });
      this.openSnackBar('Usuario eliminado');
    }
  }
}