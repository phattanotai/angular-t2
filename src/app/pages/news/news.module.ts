import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewsRouting } from './news-routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, NewsRouting, FormsModule, NgbModule],
  declarations: [NewsComponent],
  exports: [NewsComponent],
  providers: [],
})
export class NewsModule {}
