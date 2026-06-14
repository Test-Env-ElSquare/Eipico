import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout.service';
import { EipicoFullscreenLayoutBase } from './eipico-fullscreen-layout-base';
import { EIPICO_ONE_SECTIONS } from './eipico-layout-data';

@Component({
  selector: 'app-eipico-one-layout-one',
  templateUrl: './eipico-fullscreen-layout.component.html',
  styleUrls: ['./eipico-fullscreen-layout.component.scss'],
})
export class EipicoOneLayoutOneComponent extends EipicoFullscreenLayoutBase {
  factoryId = 2;
  title = 'Eipico 1';
  pageLabel = 'Layout - 1';
  exitLink = '/eipico-layout/layout-one-copy';
  override dispensingRoomStartIndex = 0;
  override dispensingRoomEndIndex = 3;
  productionSections = EIPICO_ONE_SECTIONS.slice(0, 6);

  constructor(
    layoutService: LayoutService,
    router: Router,
    cdr: ChangeDetectorRef,
    ngZone: NgZone,
  ) {
    super(layoutService, router, cdr, ngZone);
  }
}
