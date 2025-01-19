import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddMoviesComponent } from './add-movies/add-movies.component';
import { MovieComponent } from './movie/movie.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'addmovies',component:AddMoviesComponent},
    {path:'movie',component:MovieComponent},
    { path: 'update/:id', component: UpdateMovieComponent }, // Update movie form

];
