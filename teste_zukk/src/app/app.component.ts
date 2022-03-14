import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public router: Router){}
  
  title = 'teste_zukk';

  ngOnInit(): void {

      /*Função para gerar um contador de 5 minutos e expirar o token
        e retornar o usuário para tela de login*/
      setTimeout(()=>{
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }, 600000)
  }

}
