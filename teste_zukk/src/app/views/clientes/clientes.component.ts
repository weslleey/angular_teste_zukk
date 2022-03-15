import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public user: any = {
    userId: "",
    id: "",
    name: "",
    zipCode: "",
    address: "",
    district: "",
    city: "",
    state: "",
    phone: "",
    email: "",
  }

  public customer_data_obj: any = "";
  public customer_data_localStorage: any[] = [];
  public customer_data: any = ""
  

  constructor(private service: ConsultaCepService, private clientService: ClientesService) { }

  ngOnInit(): void {
    /* Salva os dados do BackEnd na variável para preencher a tabela quando o documento da página carrega*/
    this.customer_data_obj =  this.getDataLocalStorage();

  }

  onSubmit(form: any) {
    // console.log(form)
  }


  save(form: any) {

    var lastIndex: any = 0;

    //Verifica se há usuários cadastrados no backEnd para realizar a contagem do ID
    if (this.getDataLocalStorage() != null) {
      console.log('entrou no if')
      this.customer_data_localStorage = this.getDataLocalStorage();
      if(this.customer_data_localStorage.length > 0)
      lastIndex = this.customer_data_localStorage.slice(-1)[0].id;
    }

    //Preenche a váriavel Array para poder salvar os dados no BackEnd
    this.customer_data_localStorage.push({
      "id": (lastIndex + 1),
      "Name" : form.value.Address.name,
      "ZipCode" : form.value.Address.zipCode,
      "Address" : form.value.Address.address,
      "District" : form.value.Address.district,
      "City" : form.value.Address.city,
      "State" : form.value.Address.state,
      "Phone" : form.value.Address.phone,
      "Email" : form.value.Address.email
    });

    // Transformar o objeto em string e salvar em localStorage
    localStorage.setItem('customer_data', JSON.stringify(this.customer_data_localStorage));

    //Paga dos dados no formulário
    form.form.patchValue({
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
    
    /* Salva os dados do BackEnd na variável para preencher a tabela */
    this.customer_data_obj =  this.getDataLocalStorage();
  }

  /* Método que realiza busca no BackEnd retornando os clintes cadastrados em um Array */
  getDataLocalStorage() {
    // Receber a string
    let customer_data_string: any = localStorage.getItem('customer_data');
    // transformar em objeto novamente
    let customer_data_obj = JSON.parse(customer_data_string);
   
    return customer_data_obj;
  }

 /* Método que faz a consulta do CEP na API do viacep*/
  queryZipCode(cep: any, form: any) {

    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.resetForm(form);
        //Chamada do método onde é feito a consulta da API no consulta-cep.service.ts
        const retorno = this.service.consultZipCode(cep).subscribe(data => this.popularForm(data, form));
       
      } else {
        //cep é inválido.
        this.resetForm(form);
        alert("Formato de CEP inválido.");
      }
    } else {
      //cep sem valor, limpa formulário.
      this.resetForm(form);
    }
    
  }

  popularForm(data: any, paramForm: any){
    //Preenche o formulário com dados
    paramForm.form.patchValue({
      Address: {
        address: data.logradouro,
        district: data.bairro,
        city: data.localidade,
        state: data.uf
        
      }
    });
  }

  resetForm(paramForm: any){
    //Apaga os dados do formulário
    paramForm.form.patchValue({
      Address: {
        address: null,
        district: null,
        city: null,
        state: null
      }
    });

  }

  /* Método para pesquisar dados de clientes no BackEnd */
  searchId(paramForm: any, userId: any, btn_excluir: any, btn_alterar: any){
    /* Salva os dados do BackEnd na variável */
    var arrClients = this.getDataLocalStorage();
    /* Pega o posição do index onde o cliente pesquisado está salvo no BackEnd */
    var pos = this.verifyIndexPosition(userId.value ,arrClients);
    /* Chama o método searchId do clientes.service.ts com os paramentros necessários */
    this.clientService.searchId(paramForm, btn_excluir, btn_alterar, pos, arrClients);

  }
  /* Método para excluir dados de clientes no BackEnd */
  deleteRegistration(paramForm: any, btn_excluir: any, btn_alterar: any){
    /* Salva os dados do BackEnd na variável */
    var arrClients = this.getDataLocalStorage();
    /* Pega o posição do index onde o cliente pesquisado está salvo no BackEnd */
    var pos = this.verifyIndexPosition(paramForm.value.Address.id, arrClients);
    /* Chama o método deleteRegistration do clientes.service.ts com os paramentros necessários */
    this.clientService.deleteRegistration(paramForm, btn_excluir, btn_alterar, pos, arrClients);
    this.customer_data_obj =  this.getDataLocalStorage();

  }
  /* Método para alterar dados de clientes no BackEnd */
  changeRegistration(paramForm: any, btn_excluir: any, btn_alterar: any){
    /* Salva os dados do BackEnd na variável */
    var arrClients = this.getDataLocalStorage();
    /* Pega o posição do index onde o cliente pesquisado está salvo no BackEnd */
    var pos = this.verifyIndexPosition(paramForm.value.Address.id, arrClients);
    /* Chama o método changeRegistration do clientes.service.ts com os paramentros necessários */
    this.clientService.changeRegistration(paramForm, btn_excluir, btn_alterar, pos, arrClients);
    this.customer_data_obj =  this.getDataLocalStorage();
  }

  /* Método genérico para pesquisar posição dos dados de clientes no array do BackEnd 
  Feito para diminuir as linhas de códigos repetidas*/
  verifyIndexPosition(id: any,arrClients: any){
    var pos = arrClients.map(function(e:any) { 
      return e.id; 
    }).indexOf(parseInt(id));

    return pos;
  }

}
