import { Component, OnInit } from '@angular/core';
import {FilmModel} from "../share/film.model";
import {Observable} from "rxjs";
import {FilmService} from "../share/film.service";

@Component({
  selector: 'app-phim-le',
  templateUrl: './phim-le.component.html',
  styleUrls: ['./phim-le.component.css']
})
export class PhimLeComponent implements OnInit {

  phimles$ : Observable<FilmModel[]>;
  phimhots$ : Observable<FilmModel[]>;
  constructor(private filmService : FilmService) { }

  ngOnInit(): void {
    this.getPhimLes$();

  }
  public getPhimLes$(){
    this.phimles$ = this.filmService.getPhimLes$();
    this.phimhots$ = this.filmService.getPhimLeHots$();
  }

}
