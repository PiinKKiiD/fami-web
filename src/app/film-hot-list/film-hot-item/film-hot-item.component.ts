import {Component, Input, OnInit} from '@angular/core';
import {FilmModel} from "../../share/film.model";

@Component({
  selector: 'app-film-hot-item',
  templateUrl: './film-hot-item.component.html',
  styleUrls: ['./film-hot-item.component.css']
})
export class FilmHotItemComponent implements OnInit {

  constructor() { }
  @Input() filmhot :FilmModel = new FilmModel('','',new Date(),'',0, '');
  starts = 0;
  ngOnInit(): void {

  }

  getRate(){
    if(this.filmhot.rate/10 <= 2)
      this.starts =1;
    else if( this.filmhot.rate/10 <= 4 && this.filmhot.rate/10 > 2)
      this.starts =2;
    else if( this.filmhot.rate/10 <= 6 && this.filmhot.rate/10 > 4)
      this.starts =3;
    else if( this.filmhot.rate/10 <= 8 && this.filmhot.rate/10 > 6)
      this.starts =4;
    else
      this.starts =5;
    return this.starts;
  }
}
