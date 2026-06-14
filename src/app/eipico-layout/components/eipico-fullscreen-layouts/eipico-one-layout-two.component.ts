import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout.service';
import { EipicoFullscreenLayoutBase } from './eipico-fullscreen-layout-base';
import { EIPICO_ONE_SECTIONS } from './eipico-layout-data';

@Component({
  selector: 'app-eipico-one-layout-two',
  templateUrl: './eipico-fullscreen-layout.component.html',
  styleUrls: ['./eipico-fullscreen-layout.component.scss'],
})
export class EipicoOneLayoutTwoComponent extends EipicoFullscreenLayoutBase {
  factoryId = 2;
  title = 'Eipico 1';
  pageLabel = 'Layout - 2';
  exitLink = '/eipico-layout/layout-one-copy';
  override dispensingRoomStartIndex = 3;
  override dispensingRoomEndIndex = 5;
  productionSections = EIPICO_ONE_SECTIONS.slice(6);
  override customProductionSectionGroups = [
    [EIPICO_ONE_SECTIONS[6]],
    [EIPICO_ONE_SECTIONS[7], EIPICO_ONE_SECTIONS[8]],
  ];

  constructor(
    layoutService: LayoutService,
    router: Router,
    cdr: ChangeDetectorRef,
    ngZone: NgZone,
  ) {
    super(layoutService, router, cdr, ngZone);
  }
}
