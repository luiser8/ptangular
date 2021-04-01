import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organizacion } from 'src/app/modelos/organizacion.model';
import { Usuario } from '../../../modelos/usuario.model';

const ELEMENT_ORG: Organizacion[] =
  [
    { "id": 1, "nombre": "Microsoft" },
    { "id": 2, "nombre": "Apple" },
    { "id": 3, "nombre": "Google" },
    { "id": 4, "nombre": "Facebook" },
    { "id": 5, "nombre": "Amazon" }
  ]

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit{
  public action: string;
  public local_data: any;
  public formUsuarios : FormGroup;

  public organizacionesList = ELEMENT_ORG;

  constructor(private dialogRef: MatDialogRef<ModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Usuario) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

ngOnInit(){
  this.formUsuarios = new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[0-9]+$/)]),
    nombres: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]),
    fechaNacimiento: new FormControl('', [Validators.required, Validators.minLength(3)]),
    organizacion: new FormControl('', [Validators.required, Validators.minLength(3)]),
  }, { updateOn: 'blur' });
}

  cerrarDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  salvar() {
    if(this.formUsuarios.valid){
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }
}