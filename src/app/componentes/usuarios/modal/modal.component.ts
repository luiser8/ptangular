import { Component, Inject, Optional } from '@angular/core';
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
})

export class ModalComponent {
  public action: string;
  public local_data: any;

  public organizacionesList = ELEMENT_ORG;

  formulario = new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[0-9]+$/)]),
    nombres: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fechaNacimiento: new FormControl('', [Validators.required, Validators.minLength(3)]),
    organizacion: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Usuario) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  salvar() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }
}