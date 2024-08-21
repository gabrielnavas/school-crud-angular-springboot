import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { first, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../shared/services/storage.service';
import { StorageKey } from '../../shared/services/storage-key';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly API = environment.apiUrl + '/categories'

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
  ) { }

  list(): Observable<Category[]> {
    const token = this.storageService.getValue(StorageKey.TOKEN);
    if(!token) {
      return of([]);
    }
    
    const url = `${this.API}?page=0&size=10`;
    return this.http.get<Category[]>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .pipe(
        first(),  
      );
  }
}
