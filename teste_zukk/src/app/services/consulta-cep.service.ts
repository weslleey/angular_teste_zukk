import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  viacepURL: any = "";

  constructor(private http: HttpClient) { }

  /* Método ("complementar" do método criado em clientes.component.ts) 
  que faz a consulta do CEP na API do viacep*/
  consultZipCode(zipCode: String) {
    //Retorna os dados encontrados na API
    return this.http.get<any[]>(`https://viacep.com.br/ws/${zipCode}/json/`);
  }
}
