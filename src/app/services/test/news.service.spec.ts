import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Other imports
import { NewsService } from '../news.service';
import { environment } from 'src/environments/environment';

describe('NewsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let newsService: NewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [NewsService],
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

  it('call getNews()', () => {
    const EmployeeId = 3;
    const newsData = {
      successful: true,
      data: [],
    };
    newsService.getNews(EmployeeId).subscribe((res) => {
      expect(res.successful).toEqual(newsData.successful);
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/ED-GetNews?EmployeeId=` + EmployeeId
    );
    expect(req.request.method).toEqual('GET');
    req.flush(newsData);
  });

  it('call updateNews() status 1', () => {
    const successful = false;
    const EmployeeId = 3;
    const updateData = {
      NewsId: 1,
      Status: 1,
    };
    const newsData = {
      successful: true,
      data: [],
    };
    newsService.updateNewsStatus(updateData, EmployeeId).subscribe((res) => {
      expect(res).toEqual(successful);
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/ED-UpdateStatusNews`
    );

    expect(req.request.method).toEqual('POST');
    req.flush(successful);
  });

  it('call updateNews() status 0', () => {
    const successful = true;
    const testData = {
      NewsId: 1,
      Status: 0,
    };
    const EmployeeId = 3;

    newsService.updateNewsStatus(testData, EmployeeId).subscribe((res) => {
      expect(res).toEqual(successful);
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/ED-UpdateStatusNews`
    );

    expect(req.request.method).toEqual('POST');
    req.flush(successful);
  });
});
