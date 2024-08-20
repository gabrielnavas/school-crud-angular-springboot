import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { UsersRoutingModule } from './users-routing.module';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninFormComponent } from './signin-form/signin-form.component';



@NgModule({
  declarations: [
    SignupFormComponent,
    SigninFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class UsersModule { }
