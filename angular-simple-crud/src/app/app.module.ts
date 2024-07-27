import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // 追加
import { provideHttpClient, withFetch } from '@angular/common/http'; // 修正

import { routes } from './app.routes'; // 追加

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes) // 修正
  ],
  providers: [
    provideHttpClient(withFetch()) // fetch APIを有効にする
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }