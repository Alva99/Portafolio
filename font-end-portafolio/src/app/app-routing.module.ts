import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectComponent } from './components/project/project.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';


const routes: Routes = [
  {path:'', component: AboutComponent},
  {path:'sobre', component: AboutComponent},
  {path:'proyectos', component: ProjectComponent},
  {path:'crear', component: CreateComponent},
  {path:'contacto', component: ContactComponent},
  {path:'details/:id', component: DetailsComponent},
  {path:'edit/:id', component: EditComponent},
  {path:'**', component: ErrorComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
