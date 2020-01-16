import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieBoxComponent } from './components/movie-box/movie-box.component';
import { SortNavBarComponent } from './components/sort-nav-bar/sort-nav-bar.component';
import { SearchResultBarComponent } from './components/search-result-bar/search-result-bar.component';

import { MovieService } from './services/movie.service';
import { MovieSnapshotComponent } from './components/movie-snapshot/movie-snapshot.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AdvertisingComponent } from './components/advertising/advertising.component';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
  { path: 'profile', component: ProfileComponent},
  { path: 'movie/:movie_id', component: MovieComponent},
  { path: '', component: HomeComponent},
  { path: '**', component: NotFoundComponent},
]

// Use the NgModule annotation to define a module by passing an object
@NgModule({
  // Declarations are to list any components and directives used in the app
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    JumbotronComponent,
    MovieComponent,
    MovieBoxComponent,
    SortNavBarComponent,
    SearchResultBarComponent,
    MovieSnapshotComponent,
    PaginationComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    HomeComponent,
    AdvertisingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MovieService],
  bootstrap: [AppComponent] // Bootstrap declares which component to use as the first to bootstrap the application
})

// Exports an empty class, which gets annotated with configuration from NgModule
export class AppModule { }
