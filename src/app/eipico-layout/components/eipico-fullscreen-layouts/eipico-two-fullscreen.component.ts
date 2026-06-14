import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout.service';
import { EipicoFullscreenLayoutBase } from './eipico-fullscreen-layout-base';
import { EIPICO_TWO_SECTIONS } from './eipico-layout-data';

@Component({
  selector: 'app-eipico-two-fullscreen',
  templateUrl: './eipico-fullscreen-layout.component.html',
  styleUrls: ['./eipico-fullscreen-layout.component.scss'],
})
export class EipicoTwoFullscreenComponent extends EipicoFullscreenLayoutBase {
  factoryId = 3;
  title = 'Eipico 2';
  pageLabel = 'Layout';
  exitLink = '/eipico-layout/layout-two';
  productionSections = EIPICO_TWO_SECTIONS;

  constructor(
    layoutService: LayoutService,
    router: Router,
    cdr: ChangeDetectorRef,
    ngZone: NgZone,
  ) {
    super(layoutService, router, cdr, ngZone);
  }
}
