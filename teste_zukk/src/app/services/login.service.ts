import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  //Método que verifica se o login e senha digitados são compatíveis
  login(user: String, password: String){
    if (user == "admin" && password == "1234"){

      var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0IiwibmFtZSI6IkFkbWluIiwiaWF0IjoxMjM0fQ.JgVrw-OH60dwV0UR5IivQuNZWDWM-nn4gjeBqS16gDg";
      //Se o login for compatível é salvo o token do usuário no BackEnd
      //Para manter o usuário logado o token deve estar no BackEnd
      localStorage.setItem('token', token);
      //Manda um retorno true para verificação
      return true;

    } else {
      //Se o login não for compatível É emitida um alerta de erro para o usuário
      alert("login inválido");
      //Manda um retorno false para verificação
      return false;

    }
    
  }


}
