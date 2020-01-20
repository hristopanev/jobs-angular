import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CreateComponent } from './component/job/create/create.component';
import { AllComponent } from './component/job/all/all.component';
import { UserComponent } from './component/job/user/user.component';
import { DetailsComponent } from './component/job/details/details.component';
import { CategoryComponent } from './component/job/category/category.component';
import { AuthGuard } from './authentication/guards/auth.guard';
import { SearchComponent } from './component/job/search/search.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'job/create', component: CreateComponent,canActivate: [AuthGuard] },
  { path: 'job/all', component: AllComponent,canActivate: [AuthGuard] },
  { path: 'job/user', component: UserComponent,canActivate: [AuthGuard] },
  { path: 'job/details/:id', component: DetailsComponent,canActivate: [AuthGuard] },
  { path: 'job/category/:category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'job/search', component: SearchComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
