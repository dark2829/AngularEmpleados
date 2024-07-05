import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoResponse, Iempleado, IempleadoInsert } from '../interfaces/iempleado';
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

  buscarId(id: string): Observable<EmpleadoResponse> {
    const urlId = API_URLS.findId.replace("!", id);
    const url = API_URLS.base + urlId;
    return this.http.get<EmpleadoResponse>(url);
  }

  buscarName(name: string): Observable<EmpleadoResponse> {
    const urlId = API_URLS.findName.replace("!", name);
    const url = API_URLS.base + urlId;
    return this.http.post<EmpleadoResponse>(url, null);
  }

  actualizar(id: string, empleado: Iempleado): Observable<EmpleadoResponse> {
    let urlId =  API_URLS.update.replace("!", id);
    const url = API_URLS.base + urlId;
    return this.http.put<EmpleadoResponse>(url, empleado);
  }

  eliminar(id: string): Observable<EmpleadoResponse>{
    const urlId = API_URLS.delete.replace("!", id);
    const url = API_URLS.base + urlId;
    return this.http.delete<EmpleadoResponse>(url);
  }

  insertar(empleado: IempleadoInsert): Observable<EmpleadoResponse> {
    const url = API_URLS.base + API_URLS.crear;
    console.log(empleado);
    return this.http.post<EmpleadoResponse>(url, empleado);
  }
}
