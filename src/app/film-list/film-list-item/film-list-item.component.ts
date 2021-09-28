import {Component, Input, OnInit} from '@angular/core';
import {FilmModel} from "../../share/film.model";

@Component({
  selector: 'app-film-list-item',
  templateUrl: './film-list-item.component.html',
  styleUrls: ['./film-list-item.component.css']
})
export class FilmListItemComponent implements OnInit {

  constructor() { }
  @Input() film : FilmModel;
  ngOnInit(): void {

  }
  getRate(){
    let starts = 0;
    if(this.film.rate/10 <= 2)
      starts =1;
    else if( this.film.rate/10 <= 4 && this.film.rate/10 > 2)
      starts =2;
    else if( this.film.rate/10 <= 6 && this.film.rate/10 > 4)
      starts =3;
    else if( this.film.rate/10 <= 8 && this.film.rate/10 > 6)
      starts =4;
    else
      starts =5;
    return starts;
  }

}
