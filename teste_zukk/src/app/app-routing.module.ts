import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientesComponent } from "./views/clientes/clientes.component";
import { LoginComponent } from "./views/login/login.component";



const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "clientes",
    component: ClientesComponent
  }
//   {
//     path: "products/create",
//     component: ProductCreateComponent
//   },
//   {
//     path: "products/update/:id",
//     component: ProductUpdateComponent
//   },
//   {
//     path: "products/delete/:id",
//     component: ProductDeleteComponent
//   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}