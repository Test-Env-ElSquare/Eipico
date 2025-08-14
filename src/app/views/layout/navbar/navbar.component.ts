import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../core/services/Auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentLocationWithoutRouting: any;
  title: any;
  showWithRouting: boolean = false;
  UserEmail: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private location: Location,
    private _Auth: AuthService
  ) {}

  ngOnInit(): void {
    this.UserEmail = this._Auth.CurrentUser?.user;
    let currentWithoutRouting = this.location.prepareExternalUrl(
      this.location.path()
    );
    this.currentLocationWithoutRouting = currentWithoutRouting
      .replace('/', '')
      .replace(/\//g, ' / ');
    this.router.events.subscribe((elem: Event) => {
      if (elem instanceof NavigationEnd) {
        this.showWithRouting = true;
        this.routesFunc();
      }
    });
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  routesFunc() {
    let location = this.location.prepareExternalUrl(this.location.path());
    this.title = location.replace('/', '').replace(/\//g, ' / ');
  }
  toggleSidebar(e: any) {
    //e?.pranyDefault()!;
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: any) {
    e.preventDefault();
    this.router.navigate(['/auth/login']);
    this._Auth.logOut();
  }
}
