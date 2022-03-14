import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor() { }

  /* Método ("complementar" do método criado em clientes.component.ts) para pesquisar dados de clientes no BackEnd */
  searchId(paramForm: any, btn_excluir: any, btn_alterar: any, pos: any, arrClients: any){
    /* Se a posição pesquisada for diferente de -1 quer dizer que o registro pesquisado foi encontrado
    sendo assim, é preenchido todos os dados encontrados nos inputs do formulário */
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

      //Habilita os campos excluir e alterar
      btn_excluir.disabled = false;
      btn_alterar.disabled = false;
    } else {
      /* Se a posição pesquisada for giual a -1 o sistema retorna um alerta de erro*/
      alert("Cliente não encontrado!")
    }
  }
  /* Método ("complementar" do método criado em clientes.component.ts) para deletar dados de clientes no BackEnd */
  deleteRegistration(paramForm: any, btn_excluir: any, btn_alterar: any, pos: any, arrClients: any){
    /* Se a posição pesquisada for diferente de -1 quer dizer que o registro pesquisado foi encontrado
    sendo assim, é pego o valor do ID que está salvo em um campo invisível e o exclui do BackEnd
    em sequência limpando os campos que estavam preenchidos nos inputs*/
    if(pos != -1){
      if(paramForm.value.Address.id != null && arrClients != null){
        
        arrClients.splice(pos, 1);

        // Transformar o objeto em string e salvar em localStorage
        localStorage.setItem('customer_data', JSON.stringify(arrClients));
        
        //desabilita os campos excluir e alterar
        btn_excluir.disabled = true;
        btn_alterar.disabled = true;

        //Limpa so campos do formulário
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
      /* Se a posição pesquisada for giual a -1 o sistema retorna um alerta de erro*/
      alert("Não hé possível excluir esse cliente")
    }
  }

  /* Método ("complementar" do método criado em clientes.component.ts) para alterar dados de clientes no BackEnd */
  changeRegistration(paramForm: any, btn_excluir: any, btn_alterar: any, pos: any, arrClients: any){
  /* Se a posição pesquisada for diferente de -1 quer dizer que o registro pesquisado foi encontrado
    sendo assim, é pego o valor do ID que está salvo em um campo invisível e o altera no BackEnd 
    todos os dados que foram alterados nos inputs do formulário e em sequência limpando os campos 
    que estavam preenchidos nos inputs*/
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
        
        //Habilita os campos excluir e alterar
        btn_excluir.disabled = true;
        btn_alterar.disabled = true;

        //Limpa so campos do formulário
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
      /* Se a posição pesquisada for giual a -1 o sistema retorna um alerta de erro*/
      alert("Não hé possível alterar esse cliente")
    }
  }

}
