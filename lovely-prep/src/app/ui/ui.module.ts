import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import { HomeComponent } from '../components/home/home.component';
// import { BooksComponent } from '../components/books/books.component';

const routes: Routes = [
  // {path: '', component: HomeComponent},
  // {path: 'all', component: BooksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  exports: [LayoutComponent, RouterModule],
})
export class UiModule {
}
