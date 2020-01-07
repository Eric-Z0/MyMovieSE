import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Use the NgModule annotation to define a module by passing an object
@NgModule({
  // Declarations are to list any components and directives used in the app
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent] // Bootstrap declares which component to use as the first to bootstrap the application
})

// Exports an empty class, which gets annotated with configuration from NgModule
export class AppModule { }
