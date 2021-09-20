import { Component, OnInit } from '@angular/core';
import {FilmModel} from "../share/film.model";
import {Observable, range, Subscription} from "rxjs";
import {FilmService} from "../share/film.service";
import {DataStorageService} from "../share/data-storage.service";
@Component({
  selector: 'app-phim-moi',
  templateUrl: './phim-moi.component.html',
  styleUrls: ['./phim-moi.component.css']
})
export class PhimMoiComponent implements OnInit {
  phimmois$ : Observable<FilmModel[]>;
  phimhots$ : Observable<FilmModel[]>;
  subscription: Subscription;
  constructor(private filmService : FilmService) { }

  ngOnInit(): void {
    this.getPhimMois$();
  }
  public getPhimMois$(){
    this.phimmois$ = this.filmService.getPhimMois$();
    this.phimhots$ = this.filmService.getPhimMoiHots$();
  }

}
