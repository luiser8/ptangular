import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) {  }

  getUsuarios() {
    return this.http.get<Usuario[]>('/assets/static/usuarios.json');
  }
}