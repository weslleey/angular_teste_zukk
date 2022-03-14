import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor() { }

  searchId(paramForm: any, btn_excluir: any, btn_alterar: any, pos: any, arrClients: any){
  
    if(pos != -1){
      paramForm.form.patchValue({
        Address: {
          id: arrClients[pos].id,
          address: arrClients[pos].Address,
          district: arrClients[pos].District,
          city: arrClients[pos].City,
          state: arrClients[pos].State, 
          zipCode: arrClients[pos].ZipCode,
          name: arrClients[pos].Name,
          phone: arrClients[pos].Phone,
          email: arrClients[pos].Email
        }
      });

      btn_excluir.disabled = false;
      btn_alterar.disabled = false;
    } else {
      alert("Cliente não encontrado!")
    }
  }

  deleteRegistration(paramForm: any, btn_excluir: any, btn_alterar: any, pos: any, arrClients: any){

    if(pos != -1){
      if(paramForm.value.Address.id != null && arrClients != null){
        
        arrClients.splice(pos, 1);

        // Transformar o objeto em string e salvar em localStorage
        localStorage.setItem('customer_data', JSON.stringify(arrClients));

        btn_excluir.disabled = true;
        btn_alterar.disabled = true;

        paramForm.form.patchValue({
          userId: null, 
          Address: {
            id: null,
            address: null,
            district: null,
            city: null,
            state: null, 
            zipCode: null,
            name: null,
            phone: null,
            email: null
          }
        });

      }
    } else {
      alert("Não hé possível excluir esse cliente")
    }
  }

  changeRegistration(paramForm: any, btn_excluir: any, btn_alterar: any, pos: any, arrClients: any){
  
    if(pos != -1){
      if(paramForm.value.Address.id != null && arrClients != null){
        
        
        arrClients[pos].id = paramForm.value.Address.id;
        arrClients[pos].Address = paramForm.value.Address.address;
        arrClients[pos].District = paramForm.value.Address.district;
        arrClients[pos].City = paramForm.value.Address.city;
        arrClients[pos].State = paramForm.value.Address.state;
        arrClients[pos].ZipCode = paramForm.value.Address.zipCode;
        arrClients[pos].Name = paramForm.value.Address.name;
        arrClients[pos].Phone = paramForm.value.Address.phone;
        arrClients[pos].Email = paramForm.value.Address.email;
       

        // Transformar o objeto em string e salvar em localStorage
        localStorage.setItem('customer_data', JSON.stringify(arrClients));

        btn_excluir.disabled = true;
        btn_alterar.disabled = true;

        paramForm.form.patchValue({
          userId: null, 
          Address: {
            id: null,
            address: null,
            district: null,
            city: null,
            state: null, 
            zipCode: null,
            name: null,
            phone: null,
            email: null
          }
        });

      }
    } else {
      alert("Não hé possível alterar esse cliente")
    }
  }

}
