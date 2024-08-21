import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SignUpRequest } from './requests/signup-request';
import { HttpClient } from '@angular/common/http';
import { SignInRequest } from './requests/signin-request';
import { Observable } from 'rxjs';
import { SignInResponse } from './responses/signin-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API = environment.apiUrl

  constructor(
    private readonly httpCliente: HttpClient,
  ) { }

  signup(data: SignUpRequest): Observable<void> {
    const url = this.API + "/auth/signup"
    return this.httpCliente.post<void>(url, data)
  }

  signin(data: SignInRequest): Observable<SignInResponse> {
    const url = this.API + "/auth/signin"
    return this.httpCliente.post<SignInResponse>(url, data);
  }
}
