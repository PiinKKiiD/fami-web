
export class FilmModel{
  public avatar: string;
  public note: string;
  public createDate: Date;
  public name: string;
  public type: string;
  public rate: number;

  constructor(posterImg: string, note: string, createDate: Date, name: string, rate: number, type:string){
    if (posterImg === '')
      this.avatar = 'https://upload.wikimedia.org/wikipedia/vi/d/df/Arrival%2C_Movie_Poster.jpg';
    else
      this.avatar = posterImg;
    this.note = note;
    this.createDate = createDate;
    this.name = name;
    this.rate = rate;
    this.type = type;

  }
}
