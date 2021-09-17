import {Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {FilmModel} from './film.model'
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from "../auth/auth.service";
import {FilmService} from "./film.service";
@Injectable({
  providedIn:'root'
})
export class DataStorageService{
  private firebaseStoragePath = 'https://fami-film-default-rtdb.asia-southeast1.firebasedatabase.app/';

  constructor(private http: HttpClient,
              private filmService: FilmService,
              private authService: AuthService) {
  }


  updateQuanly2DB(){
    /*const quanlys = this.filmService.getFilms('quanlys');
    this.http.put(
      this.firebaseStoragePath+'quanlys.json',
      quanlys
    ).subscribe(response =>{console.log(response)});*/
  }
}
