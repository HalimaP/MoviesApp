import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReadMoreComponent } from './movies/read-more/read-more.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    ModalComponent,
    ReadMoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
