import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: String = "";
  public password: String = "";

  constructor(private route: Router, private service: LoginService) { 

  }

  ngOnInit(): void {

  }

  login(){
    const isTrue = this.service.login(this.user, this.password); 
    if (isTrue) this.route.navigate(['/clientes']);
    
  }

}
