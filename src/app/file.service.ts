import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  // 🛑 something like the baseurl and the urls defined below should be defined using ENV variables
  // have a look at .env files and how they can be used in nodejs/angular apps
  private baseUrl = 'http://localhost:8080/file-management';

  constructor(private http: HttpClient) { }

  // why is the path = '' in function parameter?
  // ❌ A unwritten developer rule: either use typescript, or don't. If you're going to use typescript check
  // for the proper types and implement them in your code, don't just use 'any' if you're unsure of the type
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
