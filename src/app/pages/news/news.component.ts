import { Component, OnInit } from '@angular/core';
import {
  NgbPaginationConfig,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [NgbPaginationConfig],
})
export class NewsComponent implements OnInit {
  closeResult = '';
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  newsData: any[] = [];
  paginateData: any[] = [];

  constructor(config: NgbPaginationConfig, private modalService: NgbModal) {
    config.size = 'sm';
    config.boundaryLinks = true;
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.newsData.push({
        id: i,
        name: 'name' + i,
      });
    }

    this.collectionSize = this.newsData.length;
    this.getNewsData();
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
}
