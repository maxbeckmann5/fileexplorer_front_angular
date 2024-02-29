import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = 'http://localhost:8080/file-management';

  constructor(private http: HttpClient) { }

  getFiles(path: string = ''): Observable<any> {
    return this.http.get(`${this.baseUrl}/list-files${path}`);
  }

  getFileAttributes(fileName: string): Observable<any> {
    return this.http.get(`http://localhost:8080/attributes/${fileName}`);
  }

  deleteFile(fileName: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/delete/${fileName}`);
  }
}
