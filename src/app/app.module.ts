import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownDirective } from './component/shared/naviagtion/dropdown.directive';
import { CollapseDirective } from './component/shared/naviagtion/collapse.directive';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './authentication/auth.service';
import { ToastrModule  } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { NaviagtionComponent } from './component/shared/naviagtion/naviagtion.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { UserComponent } from './component/job/user/user.component';
import { DetailsComponent } from './component/job/details/details.component';
import { AllComponent } from './component/job/all/all.component';
import { CreateComponent } from './component/job/create/create.component';
import { CategoryComponent } from './component/job/category/category.component';
import { JobService } from './component/job.service';
import { SearchComponent } from './component/job/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NaviagtionComponent,
    DropdownDirective,
    CollapseDirective,
    FooterComponent,
    UserComponent,
    DetailsComponent,
    AllComponent,
    CreateComponent,
    CategoryComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
  ],
  providers: [
    AuthService,
    JobService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
