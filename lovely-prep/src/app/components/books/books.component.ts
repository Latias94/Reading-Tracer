import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Book } from '../../models/Book';

// import { AbstractControl, FormBuilder, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  // newBook: Book;
  books: Book[];
  isEdit: boolean = false;

  currentBook: Book = {
    title: '',
    description: '',
    currentPage: null,
    totalPage: null,
    quote: {
      content: '',
      author: ''
    }
  };

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getBooks().subscribe(books => {
      this.books = books;
    });
    // this.books = [];
  }

  getProcess(book: Book) {
    const process = book.currentPage / book.totalPage;
    return process > 1 ? 1 : process;
  }

  onNewBook(isAdd: boolean) {
    // TODO
    // console.log(book);
    // this.books.unshift(book);
    this.dataService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  editBook(book: Book) {
    this.currentBook = book;
    this.isEdit = true;
  }

  removeBook(book: Book) {
    this.dataService.removeBook(book).subscribe(result => {
       // reload page
      this.dataService.getBooks().subscribe(books => {
        this.books = books;
      });
    });
  }
}

// export function minValue(min: Number): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } => {
//     const input = control.value,
//       isValid = input > min;
//     return isValid ? {'minValue': {min}} : null;
//   };
// }
