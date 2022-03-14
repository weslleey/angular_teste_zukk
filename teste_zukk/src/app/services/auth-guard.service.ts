import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate{
    constructor(public auth: AuthService, public router: Router){}

    /*O guard verifica a troca de rotas, se a autenticação não for válida 
    ele redireciona o usuário para a tela de login novamente e rerorna o valor false*/
    canActivate(rout: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        if(!this.auth.auth()){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}

