import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoResponse, Iempleado } from '../interfaces/iempleado';
import { API_URLS } from '../utils/urls';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {

  private http = inject(HttpClient);

  listar(): Observable<EmpleadoResponse> {
    const url = API_URLS.base + API_URLS.findAll;
    return this.http.get<EmpleadoResponse>(url);
  }

  actualizar(id: string, empleado: Iempleado): Observable<EmpleadoResponse> {
    let urlId =  API_URLS.update.replace("!", id);
    const url = API_URLS.base + urlId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(url, id, empleado);
    return this.http.put<EmpleadoResponse>(url, empleado, {headers});
  }
}
