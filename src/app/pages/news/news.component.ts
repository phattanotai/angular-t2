import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbPaginationConfig,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from '../../services/news.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [NgbPaginationConfig],
})
export class NewsComponent implements OnInit {
  @ViewChild('content', { static: true }) content: any;
  closeResult = '';
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  newsData: any[] = [];
  paginateData: any[] = [];
  title: string = 'Create News';
  EmployeeId = 3;
  modalData: any = {
    NewsId: 0,
    NameNews: '',
    Detail: '',
    Status: 0,
    UpdatedDate: '',
    ButtonView: 1,
    ButtonEdit: 1,
    ButtonDelete: 1,
  };

  modalDataState: number = 0;

  constructor(
    config: NgbPaginationConfig,
    private modalService: NgbModal,
    private newsService: NewsService
  ) {
    config.size = 'sm';
    config.boundaryLinks = true;
  }

  ngOnInit(): void {
    this.newsService.getNews(this.EmployeeId).subscribe((res) => {
      if (res.successful) {
        for (let [index, element] of res.data.entries()) {
          this.newsData.push({
            index: index + 1,
            NewsId: element.NewsId,
            NameNews: element.NameNews,
            Detail: element.Detail,
            Status: element.Status,
            UpdatedDate: element.UpdatedDate,
            ButtonView: element.ButtonView,
            ButtonEdit: element.ButtonEdit,
            ButtonDelete: element.ButtonDelete,
          });
        }

        this.collectionSize = this.newsData.length;
        this.getNewsData();
      }
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getNewsData() {
    this.paginateData = this.newsData.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  createNews() {
    this.modalDataState = 0;
    this.title = 'สร้างข่าวประชาสัมพันธ์';
    this.modalData = {
      NewsId: 0,
      NameNews: '',
      Detail: '',
      Status: 0,
      UpdatedDate: '',
      ButtonView: 1,
      ButtonEdit: 1,
      ButtonDelete: 1,
    };
    this.open(this.content);
  }

  editData(data: object) {
    this.modalDataState = 2;
    this.title = 'แก้ไขข่าวประชาสัมพันธ์';
    this.modalData = data;
    console.log(this.modalData);
    this.open(this.content);
  }

  viewData(data: object) {
    this.modalDataState = 1;
    this.title = 'รายละเอียดข่าวประชาสัมพันธ์';
    this.modalData = data;
    this.open(this.content);
  }

  deleteData(data: object) {
    console.log(data);
  }

  saveData() {
    if (this.modalDataState === 0) {
      console.log('create', this.modalData);
    } else {
      console.log('edit', this.modalData);
    }
  }

  changeStatusModal() {
    this.modalData.Status = this.modalData.Status === 0 ? 1 : 0;
    this.newsService
      .updateNewsStatus(this.modalData, this.EmployeeId)
      .subscribe((res) => {});
  }

  changeStatus(item: any) {
    item.Status = item.Status === 0 ? 1 : 0;

    this.newsService
      .updateNewsStatus(item, this.EmployeeId)
      .subscribe((res) => {});
  }
}
