import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TablaComponent } from './components/tabla/tabla.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { FormsModule } from '@angular/forms';
import { EmpleadoResponse } from './interfaces/iempleado';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TablaComponent, FormularioComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'empleados';

  listaDeEmpleados: EmpleadoResponse = {
    data: [],
    http: '', 
    message: '', 
    status: '',
  };

  actualizarLista(event: EmpleadoResponse) {
    this.listaDeEmpleados = event;
  }

}
