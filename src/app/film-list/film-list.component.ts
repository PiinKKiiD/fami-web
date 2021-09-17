import {Component, Input, OnInit} from '@angular/core';
import {FilmModel} from "../share/film.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  constructor() { }
  @Input() filmCategory = "Phim bộ mới";
  @Input() films: FilmModel[] = [];
  @Input() films$: Observable<FilmModel[]>;
  ngOnInit(): void {
  }

}
