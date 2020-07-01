import { Component, OnInit } from '@angular/core';

import { UserService } from './shared/user.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
            <app-nav-bar></app-nav-bar>
             <router-outlet>
            </router-outlet>
            <app-footer></app-footer>`
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService, private titleService: Title
  ) {}
  ngOnInit() {
    this.titleService.setTitle('Arts & Crafts');
    this.userService.makeUserRequest();
  }
}
