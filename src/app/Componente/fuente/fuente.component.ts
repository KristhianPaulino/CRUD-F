import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CRUDService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-fuente',
  templateUrl: './fuente.component.html',
  styleUrls: ['./fuente.component.css']
})
export class FuenteComponent {

  

  ngOnInit(): void {
    
     
    
  }
   
  listCRUD: any[] = [];
  form: FormGroup;
  
  

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _CRUDservice: CRUDService ){
    this.form = this.fb.group({
      Nombres: [''],
      Apellidos: [''],
      Direccion: [''],
      Telefono: [''],
      IDaConsultar: ['']         
    })

  }

  Save(){

    console.log(this.form.value)
  
  const save: any = {
    Nombres: this.form.get('Nombres')?.value,
    Apellidos: this.form.get('Apellidos')?.value,
    Direccion: this.form.get('Direccion')?.value,
    Telefono: this.form.get('Telefono')?.value,

  }
  this._CRUDservice.SaveUser(save).subscribe(data =>{
    this.toastr.success('Usuario registrado con exito', ':)');    
    this.form.reset();
    console.log(save);
  }, error =>{
    this.toastr.error('Opps... Ocurrio un error','ERROR')
    console.log(error);
  })

      
  }
 

 ConsultarById(ID: number){
    this._CRUDservice.ConsultID(ID).subscribe(data =>{
     this.toastr.success('ID CONSULTADO', ':)')
     console.log(data);
    }, error => {
      console.log(error);
    
     
    })
}

ConsultarTodo(){
  this._CRUDservice.Consultar().subscribe(data =>{
    this.toastr.success('Datos Consultados', ':)')
    console.log(data)
  })
} 

Eliminar(id: number){
  this._CRUDservice.DeteleID(id).subscribe(data =>{
    this.toastr.error('Id Eliminado', ':(')
    console.log(data)
  })
}



 

    
  





}
