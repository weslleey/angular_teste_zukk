import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Token Chumbado para que não seja necessário criar uma api
  //Token codificado pelo https://jwt.io/ 
  private readonly JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0IiwibmFtZSI6IkFkbWluIiwiaWF0IjoxMjM0fQ.JgVrw-OH60dwV0UR5IivQuNZWDWM-nn4gjeBqS16gDg";
  
  constructor() { }

  //Método de autenticação viculado ao auth-guard
  //Verifica se o token gerado pelo JWT é igual token do usuário, se for, retorna true senão false
  //Essa verificação seria uma verificação buscando o token no BackEnd
  auth(): boolean {
    const token: any = localStorage.getItem('token');

    if (token == this.JWT) {
      return true
    }

    return false
  }

  
}
