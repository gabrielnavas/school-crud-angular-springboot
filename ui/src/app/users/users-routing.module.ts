import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { SigninFormComponent } from './signin-form/signin-form.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'signin',
}, {
  path: 'signup',
  component: SignupFormComponent,
}, {
  path: 'signin',
  component: SigninFormComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
