import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  viacepURL: any = "";

  constructor(private http: HttpClient) { }

  
  consultZipCode(zipCode: String) {

    return this.http.get<any[]>(`https://viacep.com.br/ws/${zipCode}/json/`);
  }
}
