import {FilmModel} from "./film.model";
import {Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { map, take, tap, filter} from 'rxjs/operators';

@Injectable()
export class FilmService{
  quanlys : FilmModel[] = [];
  constructor(private http: HttpClient) {
  }

  private firebaseStoragePath = 'https://fami-film-default-rtdb.asia-southeast1.firebasedatabase.app/';

  filmsChanged = new Subject<FilmModel[]>();

  getPhimBos$(){
    return this.http.get<FilmModel[]>(this.firebaseStoragePath +'phimbos.json');
  }

  getPhimHoatHinhs$(){
    return this.http.get<FilmModel[]>(this.firebaseStoragePath + 'phimhoathinhs.json');
  }
  getPhimMois$(){
    return this.http.get<FilmModel[]>(this.firebaseStoragePath + 'phimmois.json');
  }

  getPhimLes$(){
    return this.http.get<FilmModel[]>(this.firebaseStoragePath + 'phimles.json');
  }

  getQuanLys$(){
    console.log('geting films...');
    return this.http.get<FilmModel[]>(this.firebaseStoragePath + 'quanlys.json')
      .pipe(
      map( films =>{
        return films.map(film =>{
          return {
            ...film,
          }
        })
      }),
      tap(films =>{
        this.quanlys = films;
        this.filmsChanged.next(this.quanlys.slice());
        console.log('get film:', films);
      })
    );
  }
  getQuanLys(){
    return this.quanlys;
  }

  //Quan ly ------------------------------------------------------------:
  getPhimBoHots$(){
    return this.http.get<FilmModel[]>(this.firebaseStoragePath + 'phimhoathinhs.json');
  }

  getPhimHoatHinhHots$(){
    return this.http.get<FilmModel[]>(this.firebaseStoragePath + 'phimles.json');
  }

  getPhimMoiHots$(){
    return this.http.get<FilmModel[]>(this.firebaseStoragePath +'phimbos.json');
  }

  getPhimLeHots$(){
    return this.http.get<FilmModel[]>(this.firebaseStoragePath +'phimmois.json');
  }

  // ---------------------------------------------------------------------------------

  addFilmToQuanLy(film: FilmModel){
    this.quanlys.push(film);
    const qlys = this.quanlys.slice();
    this.filmsChanged.next(this.quanlys.slice());
    return this.http.put(this.firebaseStoragePath +'quanlys.json',qlys).subscribe(()=>{console.log("adding filmm")});
  }

  updateFilmToQuanLy(film: FilmModel, id: number){
    this.quanlys[id] = film;
    const qlys = this.quanlys.slice();
    this.filmsChanged.next(this.quanlys.slice());
    return this.http.put(this.firebaseStoragePath +'quanlys.json',qlys).subscribe(()=>{console.log("editing filmm")});
  }

  delFilmFromQuanLy(index: number){
    this.quanlys.splice(index,1);
    const qlys = this.quanlys.slice();
    this.filmsChanged.next(this.quanlys.slice());
    return this.http.put(this.firebaseStoragePath +'quanlys.json',qlys).subscribe(()=>{console.log("deleting filmm")});
  }

  getFilmFromQuanLy(index: number){
    return this.quanlys.slice()[index];
  }

}
