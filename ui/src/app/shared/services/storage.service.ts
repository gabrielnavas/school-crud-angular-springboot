import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { StorageKey } from './storage-key';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public static readonly TOKEN_KEY = "token";

  private localStorage: Storage | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }

  private getStorage<StorageKey>(): Storage | undefined {
    try {
      if (this.localStorage) {
        // verify storage, it's maybe full?
        this.localStorage.setItem('test', 'test');
        this.localStorage.removeItem('test');
        return this.localStorage;
      }
    } catch (e) {
      throw new Error('LocalStorage is not available');
    }
    return undefined;
  }

  setValue(key: StorageKey, value: string) {
    const storage = this.getStorage();
    if (storage) {
      storage.setItem(key, value);
    }
  }

  getValue(key: StorageKey): string | null {
    const storage = this.getStorage();
    if (storage) {
      return storage.getItem(key);
    }
    return null;
  }

  clear() {
    const storage = this.getStorage();
    if (storage) {
      return storage.clear();
    }
  }
}
