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

    this.customer_data_obj =  this.getDataLocalStorage();

  }

  onSubmit(form: any) {
    console.log(form)
  }


  save(form: any) {

    var lastIndex: any = 0;

    if (this.getDataLocalStorage() != null) {
      console.log('entrou no if')
      this.customer_data_localStorage = this.getDataLocalStorage();
      if(this.customer_data_localStorage.length > 0)
      lastIndex = this.customer_data_localStorage.slice(-1)[0].id;
    }

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

    this.customer_data_obj =  this.getDataLocalStorage();
  }

  getDataLocalStorage() {
    // Receber a string
    let customer_data_string: any = localStorage.getItem('customer_data');
    // transformar em objeto novamente
    let customer_data_obj = JSON.parse(customer_data_string);
   
    return customer_data_obj;
  }


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


  searchId(paramForm: any, userId: any, btn_excluir: any, btn_alterar: any){

    var arrClients = this.getDataLocalStorage();
    var pos = this.verifyIndexPosition(userId.value ,arrClients);
    this.clientService.searchId(paramForm, btn_excluir, btn_alterar, pos, arrClients);

  }

  deleteRegistration(paramForm: any, btn_excluir: any, btn_alterar: any){

    var arrClients = this.getDataLocalStorage();
    var pos = this.verifyIndexPosition(paramForm.value.Address.id, arrClients);
    this.clientService.deleteRegistration(paramForm, btn_excluir, btn_alterar, pos, arrClients);

  }
 
  changeRegistration(paramForm: any, btn_excluir: any, btn_alterar: any){
    var arrClients = this.getDataLocalStorage();
    var pos = this.verifyIndexPosition(paramForm.value.Address.id, arrClients);
    this.clientService.changeRegistration(paramForm, btn_excluir, btn_alterar, pos, arrClients);
  }

  verifyIndexPosition(id: any,arrClients: any){
    var pos = arrClients.map(function(e:any) { 
      return e.id; 
    }).indexOf(parseInt(id));

    return pos;
  }

}
