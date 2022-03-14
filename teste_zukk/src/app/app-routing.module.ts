import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard.service";
import { ClientesComponent } from "./views/clientes/clientes.component";
import { LoginComponent } from "./views/login/login.component";



const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "clientes",
    component: ClientesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "**", redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}