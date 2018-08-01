import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Book } from '../../models/Book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  // for data binding in html file
  book: Book = {
    title: '',
    description: '',
    currentPage: null,
    totalPage: null,
    quote: {
      content: '',
      author: ''
    }
  };
  postForEmit: Book;
  isEdit: boolean = false;
  @Output() isAddBook: EventEmitter<boolean> = new EventEmitter();

  @Input()
  set setEditBook(currentBook: Book) {
    this.book = currentBook;
    // lazy check
    this.isEdit = currentBook.title !== '';
    if (this.isEdit) {
      if (currentBook.quote.content !== '') {
        this.enabledQuote = true;
      } else {
        this.enabledQuote = false;
      }
    }
  }

  enabledAdd: boolean = false;
  enabledQuote: boolean = false;

  @ViewChild('bookForm') form: any;


  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  onSubmit({value, valid}: { value: any, valid: boolean }) {
    if (!valid) {
      console.log('Form is not valid');
    } else {
      // need re-cast data because the value properties is according to the name of input tag
      if (!this.isEdit) {
        this.dataService.saveBook(this.book).subscribe(book => {
          this.isAddBook.emit(true);
        });
      } else {
        this.dataService.updateBook(this.book).subscribe(book => {
          this.isAddBook.emit(false);
        });
        this.isEdit = false;
      }
      this.form.reset();
    }
  }
}
