import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CRUDService } from 'src/app/Services/crud.service';
import {  PaginationService } from 'ngx-pagination';





@Component({
  selector: 'app-fuente',
  templateUrl: './fuente.component.html',
  styleUrls: ['./fuente.component.css']
})
export class FuenteComponent {
   
  
  
  IDconsultar: any;
  IDeliminar: any;
  accion = 'Crear';
  ID: number | undefined;
  
  ngOnInit(): void {
    
    this.ConsultarTodo();
    
    
  } 
   
  listCRUD: any[] = [];
  form: FormGroup;
  currentPage: number = 1;
  
  
  
 
  

  constructor( private fb: FormBuilder,   
    private toastr: ToastrService,
    private _CRUDservice: CRUDService,
    paginationService: PaginationService ){         
    this.form = this.fb.group({
      
      Nombre: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(3)]],
      Apellido: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(3)]],
      Direccion: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      Telefono: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(10)]],
      IDaConsultar: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(1)]],
      IDaEliminar:['', [Validators.required, Validators.maxLength(5), Validators.minLength(1)]]       
    })

    

  }

  guardarUser(){
         
  const save: any = {
    Nombre: this.form.get('Nombre')?.value,
    Apellido: this.form.get('Apellido')?.value,
    Direccion: this.form.get('Direccion')?.value,
    Telefono: this.form.get('Telefono')?.value,

  }

  if(this.ID == undefined){
    //Si no tiene valor en el ID quiere decir que es nueva tarjeta, asi que agregamos.
    this._CRUDservice.SaveUser(save).subscribe(data =>{
      this.toastr.success('Usuario registrado con exito', ':)');    
      this.form.reset();
      this.ConsultarTodo();
      console.log(save);
    }, error =>{
      this.toastr.error('Opps... Ocurrio un error','ERROR')
      console.log(error);
    })
  }

  else{
    //Si tiene valor en el ID quiere decir que vamos a editar.
    save.id = this.ID;
    this._CRUDservice.UpdateID(this.ID, save).subscribe(data =>{
      this.form.reset();
      this.accion = 'Agregar';
      this.ID = undefined;
      this.toastr.info('La tarjeta fue actualizada con exito!', 'Tarjeta Actualizada');
      this.ConsultarTodo();
    },error => {
      console.log(error);
    })
    
  }

 

      
  }
 

 ConsultarById(ID: number){

  
    this._CRUDservice.ConsultID(ID).subscribe(data =>{
     this.toastr.success('ID CONSULTADO', ':)')
     this.form.reset();
     console.log(data);     
    }, error => {
      console.log(error);
    
     
    })
}

ConsultarTodo(){

  
  this._CRUDservice.Consultar().subscribe(data =>{
    console.log(data);
    this.listCRUD = data;    
    console.log(data)
  })
} 

Eliminar(ID: number){
  this._CRUDservice.DeteleID(ID).subscribe(data =>{
    this.toastr.error('Id Eliminado', ':(')
    this.form.reset();
    this.ConsultarTodo();
    console.log(data)
  })
}

actualizarUser(save: any){
this.accion = 'Editar';
this.ID = save.id;
console.log(save);

this.form.patchValue({

  Nombre: save.nombre,
  Apellido: save.apellido,
  Direccion: save.direccion,
  Telefono: save.telefono
})
}
       


}
