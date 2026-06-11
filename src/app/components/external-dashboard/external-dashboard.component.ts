import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-external-dashboard',
  templateUrl: './external-dashboard.component.html',
  styleUrls: ['./external-dashboard.component.scss'],
})
export class ExternalDashboardComponent {
  readonly dashboardUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'http://10.1.1.240:60/#/dashboard/embed'
    );
  }
}
