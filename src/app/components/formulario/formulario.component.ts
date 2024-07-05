import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadoResponse, IbusquedaEmpleado, Iempleado, IempleadoInsert } from '../../interfaces/iempleado';
import { EmpleadoServiceService } from '../../services/empleado-service.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{

  @Output() listaActualizada = new EventEmitter<EmpleadoResponse>();
  
  private empleadoService = inject(EmpleadoServiceService);
  empleadoResponse$: EmpleadoResponse | any;

  formulario: FormGroup;
  formularioBusqueda: FormGroup;

  constructor(
    private formBuilder : FormBuilder
  ){
    this.formulario = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      puesto: ['', Validators.required],
      salario: ['', Validators.required],
      fecha: ['', Validators.required],
      estatus: ['', Validators.required],
      rfc: ['', Validators.required],
      empleado: [''],
    });

    this.formularioBusqueda = this.formBuilder.group({
      id: [''],
      nombre: [''], 
      rfc: [''],
      estatus: ['']
    })
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  insertarEmpleado(data : any){
    console.log(data);
    const empleado: IempleadoInsert = {
      nombreCompleto: data.nombre,
      puesto: data.puesto,
      salario: data.salario,
      fechaIngreso: data.fecha,
      status: data.estatus,
      rfc: data.rfc, 
    };

    this.empleadoService.insertar(empleado).subscribe(empleados => {
      this.empleadoResponse$ = empleados;
    }, error => {
      console.log(error);
    });

    window.location.reload();
  }

  buscar(formulario: any){
    let busqueda: IbusquedaEmpleado = {};
    if(formulario.nombre !== ""){
      busqueda.nombre = formulario.nombre; 
    }
    if(formulario.rfc !== ""){
      busqueda.rfc = formulario.rfc; 
    }
    if(formulario.estatus !== ""){
      busqueda.estatus = formulario.estatus; 
    }
    if(formulario.id !== ""){
      busqueda.id = formulario.id; 
    }
    
    this.empleadoService.buscarOptions(busqueda).subscribe(empleados => {
      this.empleadoResponse$ = empleados;
      this.listaActualizada.emit(empleados);
    }, error => {
      console.log(error);
    });
  }

  reset(){
    this.formulario.reset();
  }

}
