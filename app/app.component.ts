import { Component } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <a routerLinkActive="active" 
       routerLink="/login">Login</a> |
    <a routerLinkActive="active" 
       routerLink="/home">Home</a> | 
    <a routerLinkActive="active" 
      routerLink="/catalog">Catalog</a> 
    <router-outlet></router-outlet>
    <div>
    <b>Wait for some time and Navigate through the header to see the changes.</b> <br/>
    Time Spent on seperate pages.
     <br/>
    <p *ngFor="let pageinfo of timeSpentOnPages">
    <b> pageName: </b>  {{pageinfo.pageUrl}} <br/>
    <b> timeSpent:</b>  {{moment.utc(pageinfo.timeSpent).format('H:mm:ss')}}<br/>
    </p>
    </div>
  </div>
  `,
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  lastIn: any= '';
  currentPage = '';
  timeSpentOnPages = [];
  moment = moment;
  constructor(private router: Router) {
    this.router.events.subscribe((event: any)=> {
      if (!this.currentPage) {
        this.currentPage = event.url;
        this.lastIn = Date.now();
      }
      if (this.currentPage !== event.url) {
        const timeSpent = Date.now() - this.lastIn;
        console.log('timeSpent', timeSpent);
        const pageInfo = {
          pageUrl : this.currentPage,
          timeSpent
        }
        this.timeSpentOnPages.push(pageInfo);
        this.lastIn = Date.now();
        this.currentPage = event.url;
      }
    })
  }
}
