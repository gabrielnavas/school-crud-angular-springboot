import { Injectable } from '@angular/core';
import { Course, createEmptyCourse } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { first, Observable, of } from 'rxjs';
import { CourseRequest } from './requests/course-request';
import { CoursePageResponse } from './responses/course-page-response';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../shared/services/storage.service';
import { StorageKey } from '../../shared/services/storage-key';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = environment.apiUrl + "/courses"

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
  ) { }

  save(request: CourseRequest): Observable<void> {
    const token = this.storageService.getValue(StorageKey.TOKEN);
    if (!token) {
      return of();
    }

    const body = {
      name: request.name,
      categoryId: request.categoryId,
      lessons: request.lessons,
    };
    return this.http.post<void>(this.API, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  edit(courseId: string, request: CourseRequest): Observable<void> {
    const token = this.storageService.getValue(StorageKey.TOKEN);
    if (!token) {
      return of();
    }

    const url = `${this.API}/${courseId}`;
    const body = {
      name: request.name,
      categoryId: request.categoryId,
      lessons: request.lessons,
    };
    return this.http.patch<void>(url, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  list(page: number = 0, size: number = 10): Observable<CoursePageResponse> {
          const token = this.storageService.getValue(StorageKey.TOKEN);
          if (!token) {
            return of({} as CoursePageResponse);
          }

    const url = `${this.API}?page=${page}&size=${size}`;
    return this.http.get<CoursePageResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      first(),
    );
  }

  getById(courseId: string): Observable<Course> {
    const token = this.storageService.getValue(StorageKey.TOKEN);
    if (!token) {
      return of(createEmptyCourse());
    }

    const url = `${this.API}/${courseId}`
    return this.http.get<Course>(url, {
      headers: {
        Authorization: `Bearer ${token}`
      } 
    }).pipe(
      first(),
    )
  }

  delete(courseId: string): Observable<void> {
    const token = this.storageService.getValue(StorageKey.TOKEN);
    if (!token) {
      return of();
    }

    const url = `${this.API}/${courseId}`
    return this.http.delete<void>(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      first(),
    )
  }
}
