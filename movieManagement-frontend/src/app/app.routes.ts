import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddMoviesComponent } from './add-movies/add-movies.component';
import { MovieComponent } from './movie/movie.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'addmovies',component:AddMoviesComponent},
    {path:'movie',component:MovieComponent},
    { path: 'update/:id', component: UpdateMovieComponent }, // Update movie form
    {path:'adduser',component:AddUserComponent},
    {path:'admin',component:AdminDashboardComponent},
    {path:'manageuser',component:ManageUsersComponent},
    {path:'login',component:LoginComponent},
    {path:'profile',component:ProfileComponent},

];
