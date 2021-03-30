import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organizacion } from 'src/app/modelos/organizacion.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  constructor(private http: HttpClient) {  }

  getOrganizaciones() {
    return this.http.get<Organizacion[]>('/assets/static/organizacion.json');
  }
}