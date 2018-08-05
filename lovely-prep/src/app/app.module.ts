import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { UiModule } from './ui/ui.module';
import { DataService } from './services/data.service';
import { BookFormComponent } from './components/book-form/book-form.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { BookComponent } from './components/book/book.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookFormComponent,
    HomeComponent,
    BookComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UiModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
