import { Component, inject, OnInit } from '@angular/core';
import { EmpleadoServiceService } from '../../services/empleado-service.service';
import { EmpleadoResponse } from '../../interfaces/iempleado';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnInit {
  
  private empleadoService = inject(EmpleadoServiceService);
  empleadoResponse$: EmpleadoResponse  | undefined;
  
  ngOnInit(): void {
    this.empleadoService.listar().subscribe(empleados => {
      this.empleadoResponse$ = empleados; 
    });
  }

}
