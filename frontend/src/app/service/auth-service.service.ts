import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, Subject, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Usuario } from "../usuario/models/user";
import { UsuarioImpl } from "../usuario/models/user-impl";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  isLogin = false;

  usuario!: Usuario;
 
  roleAs!: string;
 
  private host: string = environment.host;
  private urlEndpoint: string = `${this.host}usuarios/search/buscar-usuario?`;

  constructor(private http:HttpClient, private router:Router) { }

  login(usuario:string, contraseña:string): Observable<any> {
    var subject=new Subject();
    this.getUser(usuario,contraseña).subscribe(response=>{
    this.isLogin = true;
    this.usuario=response;
    this.roleAs = this.usuario.rol;
    sessionStorage.setItem('usuario', this.usuario.usuario);
    sessionStorage.setItem('STATE', 'true');
    sessionStorage.setItem('ROLE', this.roleAs);
   subject.next({ success: this.isLogin, role: this.roleAs });
    });//validacion del codigo de estado: 200 o 404
    return subject.asObservable();
    
  }

  logout() {
    this.isLogin = false;
    this.roleAs = '';
    sessionStorage.setItem('STATE', 'false');
    sessionStorage.setItem('ROLE', '');
    sessionStorage.setItem('usuario', '')
    this.router.navigate(['']);
    location.reload();
    return of({ success: this.isLogin, role: '' });
  }

  isLoggedIn() {
    const loggedIn = sessionStorage.getItem('STATE');
    if (loggedIn == 'true'){
      this.isLogin = true;
    }
    else{
      this.isLogin = false;
    }
    return this.isLogin;
  }

  getRole() {
    let rol:any=sessionStorage.getItem('ROLE');
    this.roleAs = rol ;
    return this.roleAs;
  }

  getUser(usuario:string, contrasena:string):Observable<any>{
    return this.http.get<any>(`${this.urlEndpoint}usuario=${usuario}&contraseña=${contrasena}`).pipe( catchError((e) =>{
      if(e.status ===404) {
        return throwError(()=> new Error (e));
      }
      if(e.roor.mensaje){
        console.error(e.error.mensaje);
      }
      return throwError(()=> new Error(e));
    })
    );
  }
  mapearUsuario(usuarioApi:any): UsuarioImpl{
    let usuario: Usuario =new UsuarioImpl();
    usuario.usuario=usuarioApi.usuario;
    usuario.contrasena=usuarioApi.contraseña;
    usuario.rol=usuarioApi.rol;
    return usuario;
  }

}