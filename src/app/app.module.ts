import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilmListComponent } from './film-list/film-list.component';
import { SearcherComponent } from './searcher/searcher.component';
import { FilmHotListComponent } from './film-hot-list/film-hot-list.component';
import { FilmHotItemComponent } from './film-hot-list/film-hot-item/film-hot-item.component';
import { FilmListItemComponent } from './film-list/film-list-item/film-list-item.component';
import { PhimMoiComponent } from './phim-moi/phim-moi.component';
import { PhimLeComponent } from './phim-le/phim-le.component';
import { PhimBoComponent } from './phim-bo/phim-bo.component';
import { PhimHoatHinhComponent } from './phim-hoat-hinh/phim-hoat-hinh.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatGridListModule} from "@angular/material/grid-list";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FilmService} from "./share/film.service";
import { PlaceholderDirective } from "./share/Placeholder/placeholder.directive";
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ShareModule} from "./share/share.module";
import {AppInterceptorService} from "./share/app-interceptor.service";
@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    SearcherComponent,
    FilmHotListComponent,
    FilmHotItemComponent,
    FilmListItemComponent,
    PhimMoiComponent,
    PhimLeComponent,
    PhimBoComponent,
    PhimHoatHinhComponent,
    PlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    ShareModule,
  ],
  providers: [FilmService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
