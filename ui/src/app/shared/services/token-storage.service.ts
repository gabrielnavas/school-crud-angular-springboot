import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private readonly TOKEN_KEY = "token";

  localStorage: Storage | undefined

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { 
    this.localStorage = document.defaultView?.localStorage;
  }

  set token(token: string) {
    if(this.localStorage) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  get token(): string | null {
    if(this.localStorage) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  logout() {
    if(this.localStorage) {
      localStorage.clear();
    }
  }
}
