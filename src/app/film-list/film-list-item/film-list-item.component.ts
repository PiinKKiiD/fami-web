import {Component, Input, OnInit} from '@angular/core';
import {FilmModel} from "../../share/film.model";

@Component({
  selector: 'app-film-list-item',
  templateUrl: './film-list-item.component.html',
  styleUrls: ['./film-list-item.component.css']
})
export class FilmListItemComponent implements OnInit {

  constructor() { }
  @Input() film : FilmModel = new FilmModel('','',new Date(),'',0, '');
  starts =0;
  ngOnInit(): void {

  }
  getRate(film: FilmModel){
    if(this.film.rate/10 <= 2)
      this.starts =1;
    else if( this.film.rate/10 <= 4 && this.film.rate/10 > 2)
      this.starts =2;
    else if( this.film.rate/10 <= 6 && this.film.rate/10 > 4)
      this.starts =3;
    else if( this.film.rate/10 <= 8 && this.film.rate/10 > 6)
      this.starts =4;
    else
      this.starts =5;
    return this.starts;
  }

}
