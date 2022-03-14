import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(user: String, password: String){
    if (user == "admin" && password == "1234"){

      return true;

    } else {

      alert("login inválido");
      return false;

    }
    
  }
}
