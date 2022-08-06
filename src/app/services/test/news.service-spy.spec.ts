import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Other imports
import { NewsService } from '../news.service';
import { environment } from 'src/environments/environment';
import { defer } from 'rxjs';

describe('NewsService Spy', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let newsService: NewsService;
  let httpClientSpy: { get: jasmine.Spy };
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        NewsService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    }).compileComponents();

    newsService = TestBed.inject(NewsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the NewsService', () => {
    expect(newsService).toBeDefined();
  });

  it('call getNews()  true', fakeAsync(() => {
    const testData = {
      successful: true,
      data: [
        {
          NewsId: 1,
          NameNews: 'การใช้งานระบบ',
          Detail:
            'เริ่มต้นการใช้งานระบบได้ตั้งแต่วันที่ 1 มิถุนายน 2565 เป็นต้นไป',
          Status: 1,
          UpdatedDate: '2022-08-07T01:57:40.000',
          ButtonView: 1,
          ButtonEdit: 1,
          ButtonDelete: 1,
        },
        {
          NewsId: 2,
          NameNews: 'ทดสอบ',
          Detail: 'ทดสอบ',
          Status: 1,
          UpdatedDate: '2022-08-07T01:56:16.000',
          ButtonView: 1,
          ButtonEdit: 1,
          ButtonDelete: 1,
        },
      ],
    };
    const EmployeeId = 3;
    httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(testData)));

    newsService.getNews(EmployeeId).subscribe((data) => {
      expect(data).toEqual(testData);
    });
    tick();
  }));

  it('call getNews()  false', fakeAsync(() => {
    const testData = {
      successful: false,
      data: [
        {
          NewsId: 1,
          NameNews: 'การใช้งานระบบ',
          Detail:
            'เริ่มต้นการใช้งานระบบได้ตั้งแต่วันที่ 1 มิถุนายน 2565 เป็นต้นไป',
          Status: 1,
          UpdatedDate: '2022-08-07T01:57:40.000',
          ButtonView: 1,
          ButtonEdit: 1,
          ButtonDelete: 1,
        },
        {
          NewsId: 2,
          NameNews: 'ทดสอบ',
          Detail: 'ทดสอบ',
          Status: 1,
          UpdatedDate: '2022-08-07T01:56:16.000',
          ButtonView: 1,
          ButtonEdit: 1,
          ButtonDelete: 1,
        },
      ],
    };
    const EmployeeId = 3;
    httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(testData)));
    newsService.getNews(EmployeeId).subscribe((data) => {
      expect(data.successful).toEqual(false);
    });
    tick();
  }));
});
