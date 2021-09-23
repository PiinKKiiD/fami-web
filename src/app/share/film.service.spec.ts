import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { fakeAsync, flush, TestBed } from "@angular/core/testing";
import { FilmModel } from "./film.model";
import { FilmService } from "./film.service";


describe('Film Service',()=>{
  let filmService: FilmService;
  let httpTestingController: HttpTestingController;

  const urlBase = 'https://fami-film-default-rtdb.asia-southeast1.firebasedatabase.app/';
  const film1: FilmModel ={
    avatar: 'https://upload.wikimedia.org/wikipedia/vi/d/df/Arrival%2C_Movie_Poster.jpg',
    note: 'dump note 1',
    createDate: new Date(),
    name: 'dump name 1',
    rate: 9,
    type: 'dump type 1',
  } as FilmModel;
  const film2: FilmModel ={
    avatar: 'https://upload.wikimedia.org/wikipedia/vi/d/df/Arrival%2C_Movie_Poster.jpg',
    note: 'dump note 2',
    createDate: new Date(),
    name: 'dump name 2',
    rate: 9,
    type: 'dump type 2',
  } as FilmModel;
  const phimlist : FilmModel[] = [film1, film2]
  const phimhots : FilmModel[] = [film2, film1];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers: [FilmService]
    });
    filmService = TestBed.inject(FilmService);
    httpTestingController = TestBed.inject(HttpTestingController);

  })

  it('Should retrive all phimbos', () =>{
    filmService.getPhimBos$().subscribe( phimbos => {
      console.log('return: ',phimbos);
      expect(phimbos).toBeTruthy();
      expect(phimbos.length).toBe(2);
      const f2 = phimbos.find(film => film.type == 'dump type 2');
      expect(f2.name).toBe('dump name 2');
    });

    const req =  httpTestingController.expectOne(urlBase + 'phimbos.json');
    expect(req.request.method).toEqual('GET');
    req.flush(Object.values(phimlist));
  })

  it('Should retrive all phimles', () =>{
    filmService.getPhimLes$().subscribe( phimles => {
      console.log('return: ',phimles);
      expect(phimles).toBeTruthy();
      expect(phimles.length).toBe(2);
      const f2 = phimles.find(film => film.type == 'dump type 2');
      expect(f2.name).toBe('dump name 2');
    });

    const req =  httpTestingController.expectOne(urlBase + 'phimles.json');
    expect(req.request.method).toEqual('GET');
    req.flush(Object.values(phimlist));
  });

  it('Should retrive all phimhoathinh', () => {
    filmService.getPhimHoatHinhs$().subscribe(phimhoathinhs =>{
      console.log('return phimhoat hinh: ', phimhoathinhs);
      expect(phimhoathinhs).toBeTruthy();
      expect(phimhoathinhs.length).toBe(2);
      const f2 = phimhoathinhs.find(film => film.type == 'dump type 1');
      expect(f2.name).toBe('dump name 1');
    });

    const req = httpTestingController.expectOne(urlBase +'phimhoathinhs.json');
    expect(req.request.method).toEqual('GET');
    req.flush(Object.values(phimlist));
  });

  it('Should return all phimmois', () =>{
    filmService.getPhimMois$().subscribe(phimmois =>{
      console.log('return phimmois: ', phimmois);
      expect(phimmois).toBeTruthy();
      expect(phimmois.length).toBe(2);
      const f2 = phimmois.find(film => film.type == 'dump type 1');
      expect(f2.name).toBe('dump name 1');
    });
    const req = httpTestingController.expectOne(urlBase + 'phimmois.json');
    expect(req.request.method).toBe('GET');
    req.flush(Object.values(phimlist));
  });

  it('should return quanlys', () =>{
    filmService.getQuanLys$().subscribe(quanlys =>{
      console.log('return quanlys: ', quanlys);
      expect(quanlys).toBeTruthy();
      expect(quanlys.length).toBe(2);
      const f2 = quanlys.find(film => film.type == 'dump type 1');
      expect(f2.name).toBe('dump name 1');
    })
    const req = httpTestingController.expectOne(urlBase + 'quanlys.json');
    expect(req.request.method).toEqual('GET');
    req.flush(Object.values(phimlist));
  })

  it('Should retrive all phimbohots', () =>{
    filmService.getPhimBoHots$().subscribe( phimbohots => {
      console.log('return phimbohots: ',phimbohots);
      expect(phimbohots).toBeTruthy();
      expect(phimbohots.length).toBe(2);
      const f2 = phimbohots.find(film => film.type == 'dump type 2');
      expect(f2.name).toBe('dump name 2');
    });

    const req =  httpTestingController.expectOne(urlBase + 'phimhoathinhs.json');
    expect(req.request.method).toEqual('GET');
    req.flush(Object.values(phimhots));
  })

  it('Should retrive all phimleshot', () =>{
    filmService.getPhimLeHots$().subscribe( phimlehots => {
      console.log('return: ',phimlehots);
      expect(phimlehots).toBeTruthy();
      expect(phimlehots.length).toBe(2);
      const f2 = phimlehots.find(film => film.type == 'dump type 2');
      expect(f2.name).toBe('dump name 2');
    });

    const req =  httpTestingController.expectOne(urlBase + 'phimmois.json');
    expect(req.request.method).toEqual('GET');
    req.flush(Object.values(phimhots));
  });

  it('Should retrive all phimhoathinhhots', () => {
    filmService.getPhimHoatHinhHots$().subscribe(phimhoathinhhots =>{
      console.log('return phimhoathinhhots: ', phimhoathinhhots);
      expect(phimhoathinhhots).toBeTruthy();
      expect(phimhoathinhhots.length).toBe(2);
      const f2 = phimhoathinhhots.find(film => film.type == 'dump type 1');
      expect(f2.name).toBe('dump name 1');
    });

    const req = httpTestingController.expectOne(urlBase +'phimles.json');
    expect(req.request.method).toEqual('GET');
    req.flush(Object.values(phimhots));
  });

  it('Should return all phimmoihots', () =>{
    filmService.getPhimMoiHots$().subscribe(phimmoihots =>{
      console.log('return phimmoihots: ', phimmoihots);
      expect(phimmoihots).toBeTruthy();
      expect(phimmoihots.length).toBe(2);
      const f2 = phimmoihots.find(film => film.type == 'dump type 1');
      expect(f2.name).toBe('dump name 1');
    });
    const req = httpTestingController.expectOne(urlBase + 'phimbos.json');
    expect(req.request.method).toBe('GET');
    req.flush(Object.values(phimhots));
  });

  it('should add a film to quanlys', () =>{
    filmService.addFilmToQuanLy(film1).subscribe(films =>{
      console.log('new films: ', films);
      expect(films).toBeTruthy();
    })
    const req = httpTestingController.expectOne(urlBase + 'quanlys.json');
    expect(req.request.method).toBe('PUT');
    req.flush(Object.values(phimhots));
  });

  it('should DEL a film to quanlys', () =>{
    filmService.delFilmFromQuanLy(1).subscribe(films =>{
      console.log('del film 1: ', films);
      expect(films).toBeTruthy();
    })
    const req = httpTestingController.expectOne(urlBase + 'quanlys.json');
    expect(req.request.method).toBe('PUT');
    req.flush(Object.values(film2));
  });

  it('should UPD a film to quanlys', () =>{
    filmService.updateFilmToQuanLy(film1, 2).subscribe(films =>{
      console.log('upd film 2 by film1: ', films);
      expect(films).toBeTruthy();
    })
    const req = httpTestingController.expectOne(urlBase + 'quanlys.json');
    expect(req.request.method).toBe('PUT');
    req.flush(Object.values([film1, film1]));
  });

  afterEach(() => {
    httpTestingController.verify();
  });


})
