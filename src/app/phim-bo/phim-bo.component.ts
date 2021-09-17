import { Component, OnInit } from '@angular/core';
import {FilmModel} from "../share/film.model";
import {Observable, Subscription} from "rxjs";
import {FilmService} from "../share/film.service";
import {DataStorageService} from "../share/data-storage.service";

@Component({
  selector: 'app-phim-bo',
  templateUrl: './phim-bo.component.html',
  styleUrls: ['./phim-bo.component.css']
})
export class PhimBoComponent implements OnInit {
  phimbos$: Observable<FilmModel[]>;
  phimhots$ : Observable<FilmModel[]>;
  subscription: Subscription;
  constructor(private filmService : FilmService) { }

  ngOnInit(): void {
    this.getPhimBosAsync();
  }

  public getPhimBosAsync(){
    this.phimbos$ = this.filmService.getPhimBos$();
    this.phimhots$ = this.filmService.getPhimBoHots$()
  }

}
