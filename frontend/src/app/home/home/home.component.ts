import { DeclareVarStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { Usuario } from 'src/app/usuario/models/user';
import { UsuarioImpl } from 'src/app/usuario/models/user-impl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  usuario: Usuario = new UsuarioImpl();
  usuarioIncorrecto="";

  

  constructor(private authService: AuthService, private router:Router) {
    this.show = false;
   }

  ngOnInit(): void {
  }

  login(){
   
    if(this.usuario.usuario==null||this.usuario.contrasena==null){
       this.usuarioIncorrecto="Debe introducir un usuario y contraseña correctos para acceder al sistema";
            
      }else{
       this.authService.login(this.usuario.usuario, this.usuario.contrasena).subscribe(response=>{
      if(response.role==='ADMIN'){
        let url = `administrador`;
    this.router.navigate([url]);
      }
      if(response.role==='USER'){
        let url = `usuario`;
    this.router.navigate([url]);
      }
    });
    }   
  }

  show: boolean;

  mostrarContrasena() {
    this.show = !this.show;
}

}
