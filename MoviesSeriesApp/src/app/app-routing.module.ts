import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { ReadMoreComponent } from './movies/read-more/read-more.component';

const routes: Routes = [
  {path: '', redirectTo: '/home',  pathMatch: 'full'},
  {path: 'home', component: MoviesComponent},
  {path:'home/read-more/:id/:title', component: ReadMoreComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
