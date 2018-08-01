import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  myform: FormGroup;

  // explicit validation of each field
  titleValid: AbstractControl;
  descValid: AbstractControl;
  currPageValid: AbstractControl;
  totalPageValid: AbstractControl;
  quoteContentValid: AbstractControl;
  quoteAuthorValid: AbstractControl;

  @ViewChild('bookForm') form: any;


  constructor(private dataService: DataService, fb: FormBuilder) {
    this.myform = fb.group({
      'title': ['', [Validators.required, Validators.minLength(2)]],
      'description': ['', [Validators.required, Validators.minLength(10)]],
      'currentPage': ['', [Validators.required, Validators.min(0)]],
      'totalPage': ['', [Validators.required, Validators.min(1)]],
      'quoteContent': ['', Validators.minLength(10)],
      'quoteAuthor': ['', Validators.minLength(2)],
    }, {validator: pageValidator()});

    this.titleValid = this.myform.controls['title'];
    this.descValid = this.myform.controls['description'];
    this.currPageValid = this.myform.controls['currentPage'];
    this.totalPageValid = this.myform.controls['totalPage'];
    this.quoteContentValid = this.myform.controls['quoteContent'];
    this.quoteAuthorValid = this.myform.controls['quoteAuthor'];
  }


  ngOnInit() {
  }

  onSubmit(value: string) {
    console.log(value);
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
    this.myform.reset();
  }
}

// valid current page should not more than total page
export function pageValidator() {
  return (group: FormGroup) => {
    const current = group.controls['currentPage'];
    const total = group.controls['totalPage'];
    if (current.value !== null && total.value !== null) {
      if (current.value > total.value) {
        current.setErrors({invalidPage: true});
        return total.setErrors({invalidPage: true});
      }
    }
  };
}
