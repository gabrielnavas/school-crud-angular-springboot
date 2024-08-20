import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SignUpRequest } from './signup-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API = environment.apiUrl

  constructor(
    private readonly httpCliente: HttpClient,
  ) { 
  }

  signup(data: SignUpRequest) {
    const url = this.API + "/auth/signup"
    return this.httpCliente.post<SignUpRequest>(url, data)
  }
}
