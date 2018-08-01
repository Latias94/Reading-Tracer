import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { of } from 'rxjs';
import { Book } from '../models/Book';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  booksUrl: string = 'http://localhost:5000/api/books';

  books: Book[];
  data: Observable<any>;

  constructor(private http: HttpClient) {
    // this.books = [
    //   {
    //     title: 'The Art of Coding',
    //     description: 'Coooooooool!',
    //     currentPage: 300,
    //     totalPage: 500,
    //     quote: {
    //       content: 'Very Goooooood!',
    //       author: 'A Reader',
    //     }
    //   },
    //   {
    //     title: 'The Art of Testing',
    //     description: 'Coooooooool!',
    //     currentPage: 100,
    //     totalPage: 500,
    //     quote: {
    //       content: 'Very Goooooood!',
    //       author: 'A Reader',
    //     }
    //   },
    //   {
    //     title: 'The Art of Sleeping',
    //     description: 'Coooooooool!',
    //     currentPage: 500,
    //     totalPage: 500,
    //     quote: {
    //       content: 'Very Goooooood!',
    //       author: 'A Reader',
    //     }
    //   }
    // ];
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }

  getBook(book: Book | string): Observable<Book> {
    const id = typeof book === 'string' ? book : book._id;
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url);
  }

  saveBook(book: Book): Observable<Book> {
    const body = new HttpParams()
      .set('title', book.title)
      .set('description', book.description)
      .set('currentPage', book.currentPage.toString())
      .set('totalPage', book.totalPage.toString())
      .set('quoteContent', book.quote.content)
      .set('quoteAuthor', book.quote.author);
    return this.http.post<Book>(this.booksUrl, body.toString(), httpOptions);
  }

  // can only update currentPage for demo
  updateBook(book: Book): Observable<Book> {
    const url = `${this.booksUrl}/${book._id}`;
    return this.http.put<Book>(url, {
      currentPage: book.currentPage,
    }, httpOptions);
  }

  removeBook(book: Book | string): Observable<any> {
    const id = typeof book === 'string' ? book : book._id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<any>(url, httpOptions);
  }

  // getBooks(): Observable<Book[]> {
  //   return of(this.books);
  // }

  addBook(book: Book) {
    this.books.unshift(book);
  }
}
