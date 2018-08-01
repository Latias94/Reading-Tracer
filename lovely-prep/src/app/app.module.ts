import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { UiModule } from './ui/ui.module';
import { DataService } from './services/data.service';
import { BookFormComponent } from './components/book-form/book-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UiModule,
    HttpClientModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
