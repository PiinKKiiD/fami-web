import { Component, OnInit } from '@angular/core';
import {FilmModel} from "../share/film.model";
import {Observable} from "rxjs";
import {FilmService} from "../share/film.service";

@Component({
  selector: 'app-phim-hoat-hinh',
  templateUrl: './phim-hoat-hinh.component.html',
  styleUrls: ['./phim-hoat-hinh.component.css']
})
export class PhimHoatHinhComponent implements OnInit {
  phimhoathinhs$ : Observable<FilmModel[]>;
  phimhots$ : Observable<FilmModel[]>;
  constructor(private filmService : FilmService) { }

  ngOnInit(): void {
    this.getPhimHoatHinhs();

  }

  public getPhimHoatHinhs(){
    this.phimhoathinhs$ = this.filmService.getPhimHoatHinhs$();
    this.phimhots$ = this.filmService.getPhimHoatHinhHots$();
  }

}
