import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  options: AnimationOptions = {
    path: 'assets/json/world-locations.json',
  };
  loading: boolean = true;
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 3500);
  }
}
