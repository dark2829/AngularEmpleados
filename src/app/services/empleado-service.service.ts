import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoResponse } from '../interfaces/iempleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {

  private http = inject(HttpClient);

  listar(): Observable<EmpleadoResponse>{
    return this.http.get<EmpleadoResponse>('http://localhost:8081/gs/empleados/empleados');
  }
}
