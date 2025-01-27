import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { EmpleadoServiceService } from '../../services/empleado-service.service';
import { EmpleadoResponse, Iempleado } from '../../interfaces/iempleado';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, ReactiveFormsModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnInit {

  @Input() listaDeEmpleados: EmpleadoResponse = {
    data: [],
    http: '', 
    message: '', 
    status: '',
  };
  
  private empleadoService = inject(EmpleadoServiceService);
  headers = ["ID", "Nombre", "Puesto", "Salario", "Estatus", "RFC", "Acciones"]
  empleadoResponse$: EmpleadoResponse | any;
  empleadoSeleccionado: Iempleado | any; 
  formulario: FormGroup;

  constructor(
    private formBuilder : FormBuilder
  ){
    this.formulario = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      salario: ['', Validators.required],
      fecha: ['', Validators.required],
      estatus: ['', Validators.required],
      rfc: ['', Validators.required],
      empleado: [''],
    });
  }

  ngOnInit(): void {
    this.empleadoService.listar().subscribe(empleados => {
      if(this.listaDeEmpleados.data.length != 0){
        this.empleadoResponse$ = this.listaDeEmpleados;
      }else{
        this.empleadoResponse$ = empleados; 
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaDeEmpleados']) {
      this.empleadoResponse$ = changes['listaDeEmpleados'].currentValue;
    }
  }

  modificarEmpleado(data : any): any{
    const id = data.id;
    let empleado: Iempleado = data.empleado; 
    empleado.nombreCompleto = data.nombre;
    empleado.salario = data.salario; 
    empleado.fechaIngreso = data.fecha; 
    empleado.status = data.estatus; 
    empleado.rfc = data.rfc; 
    this.empleadoService.actualizar(id, empleado).subscribe(empleados => {
      this.empleadoResponse$ = empleados; 
      this.empleadoService.listar().subscribe(empleados => {
        this.empleadoResponse$ = empleados; 
      });
    }, error => {
      console.log(error);
    });
  }

  seleccionarEmpleado(empleado: Iempleado):any{
    this.formulario.patchValue({
      nombre: empleado.nombreCompleto,
      salario: empleado.salario,
      fecha: empleado.fechaIngreso,
      estatus: empleado.status,
      rfc: empleado.rfc, 
      id: empleado.id,
      empleado: empleado
    });
  }

  eliminarEmpleado(id: string){
    this.empleadoService.eliminar(id).subscribe(empleados => {
      this.empleadoResponse$ = empleados; 
      this.empleadoService.listar().subscribe(empleados => {
        this.empleadoResponse$ = empleados; 
      }, error => {
        console.log(error);
      });
    });
  }

  reset(){
    this.formulario.reset();
  }

}
