import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../models/books-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseApiUrl + '/api/Books');
  }

  getBooksByUser(createdBy: number | undefined) :Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/api/Books/' + createdBy);
  }

  getLatestBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(this.baseApiUrl +'/api/Books/Latest');
  }

  getBooksByCategory(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/api/Books/GroupByCategories');
  }
  
  createBook(bookInfo: any): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/api/Books', bookInfo, { responseType: 'text' as 'json' });
  }

  deleteBook(Id: number | undefined) : Observable<any> {
    return this.http.delete<any>(this.baseApiUrl + '/api/Books/' + Id, { responseType: 'text' as 'json' });
  }

}
