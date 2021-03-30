import { Component, OnInit } from '@angular/core';
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

  constructor(private usuariosService: UsuariosService, private organizacionesService: OrganizacionService) { }
  
  ngOnInit(): void {
    this.usuariosList = this.usuariosService.getUsuarios();
    this.organizacionesList = this.organizacionesService.getOrganizaciones();
  }
}
