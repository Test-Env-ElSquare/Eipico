import { AuthService } from './../../../core/services/Auth.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
  Inject,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import MetisMenu from 'metismenujs';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebarToggler') sidebarToggler: ElementRef;

  menuItems: MenuItem[] = [];

  @ViewChild('sidebarMenu') sidebarMenu: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
        if (window.matchMedia('(max-width: 991px)').matches) {
          this.document.body.classList.remove('sidebar-open');
        }
      }
    });
  }

  ngOnInit(): void {
    this.getMenuItems();
    this.cdr.detectChanges();
    const desktopMedium = window.matchMedia(
      '(min-width:992px) and (max-width: 1199px)'
    );
    desktopMedium.addEventListener('change', () => {
      this.iconSidebar;
    });
    this.iconSidebar(desktopMedium);
  }

  getMenuItems() {
    // debugger;
    const fullAccess = this.authService.isHasAccessToEvery();

    this.menuItems = [
      {
        label: 'Main',
        isTitle: true,
      },
      {
        label: 'Dashboards',
        showSubItems:
          fullAccess ||
          this.authService.isHasAccessToHistoricalDashboards() ||
          this.authService.isHasAccessToMainDashboards(),
        icon: 'home',
        subItems: [
          {
            label: 'Main Dashboard',
            link: '/MainDash',
            showSubItems: this.authService.isHasAccessToMainDashboards(),
          },
          {
            label: 'Historical Dashboard',
            link: '/Historical',
            showSubItems: this.authService.isHasAccessToHistoricalDashboards(),
          },
        ],
      },
      {
        label: 'Machines',
        isTitle: true,
      },
      {
        label: 'Machines',
        icon: 'settings',
        showSubItems:
          this.authService.isHasAccessToMachineStatus() ||
          this.authService.isHasAccessToLineMachine(),
        subItems: [
          {
            label: 'Machine State',
            link: '/machines/machineState',
            showSubItems: this.authService.isHasAccessToMachineStatus(),
          },
          {
            label: 'Line Machine',
            link: '/machines/lineMachine',
            showSubItems: this.authService.isHasAccessToLineMachine(),
          },
        ],
      },
      {
        label: 'Material',
        isTitle: true,
      },
      {
        label: 'Material',
        icon: 'bar-chart',
        showSubItems: this.authService.isHasAccessToMaterialControl(),
        subItems: [
          {
            label: 'Material Control',
            link: '/Material/materialControl',
            showSubItems: this.authService.isHasAccessToMaterialControl(),
          },
        ],
      },
      {
        label: 'plan',
        isTitle: true,
      },
      {
        label: 'plans',
        icon: 'table',
        showSubItems: this.authService.isHasAccessToProductionPlan(),
        subItems: [
          {
            label: 'Production Plan',
            link: '/planProduct',
            showSubItems: this.authService.isHasAccessToProductionPlan(),
          },
          // {
          //   label: 'Stoppage Plan',
          //   link: '/planResource',
          //   showSubItems: this.authService.isHasAccessToStoppagePlan(),
          // },
        ],
      },

      {
        label: 'Batch management',
        isTitle: true,
      },
      {
        label: 'Batch Management',
        icon: 'settings',
        showSubItems:
          this.authService.isHasAccessToBatchSettings() ||
          this.authService.isHasAccessToBatchWeight() ||
          this.authService.isHasAccessToBatchHistory() ||
          this.authService.isHasAccessToScaleHistory() ||
          this.authService.isHasAccessToBatchSchedulerView(),
        subItems: [
          {
            label: 'Batch Settings',
            link: '/batchSetting',
            showSubItems: this.authService.isHasAccessToBatchSettings(),
          },
          {
            label: 'Batch Weight',
            link: '/batchSetting/batchWeight',
            showSubItems: this.authService.isHasAccessToBatchWeight(),
          },
          {
            label: 'Batch History',
            link: '/batchSetting/History',
            showSubItems: this.authService.isHasAccessToBatchHistory(),
          },
          {
            label: 'Scale History',
            link: '/Scale/status',
            showSubItems: this.authService.isHasAccessToScaleHistory(),
          },
          {
            label: 'Batch Scheduler',
            link: '/batchScheduler',
            showSubItems: this.authService.isHasAccessToBatchSchedulerView(),
          },
        ],
      },
      {
        label: 'Settings',
        isTitle: true,
      },
      {
        label: 'Settings',
        icon: 'settings',
        showSubItems:
          this.authService.isHasAccessToMachineSettings() ||
          this.authService.isHasAccessToProductionSettings() ||
          this.authService.isHasAccessToLineSettings() ||
          this.authService.isHasAccessToAddRole() ||
          this.authService.isHasAccessToAddRole(),
        subItems: [
          // {
          //   label: 'Machine Settings',
          //   link: '/settings/machine-settings',
          //   showSubItems: this.authService.isHasAccessToMachineSettings(),
          // },
          // {
          //   label: 'Production Settings',
          //   link: '/settings/production-settings',
          //   showSubItems: this.authService.isHasAccessToProductionSettings(),
          // },
          // {
          //   label: 'Line Settings',
          //   link: '/settings/line-settings',
          //   showSubItems: this.authService.isHasAccessToLineSettings(),
          // },
          {
            label: 'Add Role',
            link: '/settings/addRole',
            showSubItems: this.authService.isHasAccessToAddRole(),
          },
          {
            label: 'User Management',
            link: '/settings/userMangement',
            showSubItems: this.authService.isHasAccessToUserManagement(),
          },
          {
            label: 'Shift',
            link: '/settings/shift',
            showSubItems: this.authService.isHasAccessToUserManagement(),
          },

          {
            label: 'Machines',
            link: '/settings/machine-settings',
            showSubItems: this.authService.isHasAccessToUserManagement(),
          },
          {
            label: 'Profile',
            link: '/auth/view-profile',
            showSubItems: this.authService.isHasAccessToUserManagement(),
          },
        ],
      },
      {
        label: 'Reports',
        isTitle: true,
      },
      {
        label: 'Reports',
        icon: 'cast',
        showSubItems:
          this.authService.isHasAccessToEnergyReport() ||
          this.authService.isHasAccessToBeconReport(),
        subItems: [
          {
            label: 'Daily reports',
            link: '/reports/dailyReports',
            // showSubItems: this.authService.isHasAccessToBeconReport(),
          },
          {
            label: 'Becon reports',
            link: '/reports/beconReports',
            showSubItems: this.authService.isHasAccessToBeconReport(),
          },
        ],
      },

      {
        label: 'Utilities',
        icon: 'cast',
        showSubItems: this.authService.isHasAccessToEnergyReport(),
        subItems: [
          {
            label: 'Energy',
            link: '/reports/energyReports',
            showSubItems: this.authService.isHasAccessToEnergyReport(),
          },
        ],
      },
      {
        label: 'Scada',
        isTitle: true,
      },
      {
        label: 'Scada',
        icon: 'sliders',
        showSubItems: this.authService.isHasAccessToscada(),
        subItems: [
          {
            label: 'Main Scada',
            link: '/Scada/mainScada',
            showSubItems: this.authService.isHasAccessToscada(),
          },
        ],
      },
    ];
  }

  ngAfterViewInit() {
    new MetisMenu(this.sidebarMenu.nativeElement);
    this._activateMenuDropdown();
  }

  toggleSidebar(e: Event) {
    this.sidebarToggler.nativeElement.classList.toggle('active');
    this.sidebarToggler.nativeElement.classList.toggle('not-active');
    if (window.matchMedia('(min-width: 992px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-folded');
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-open');
    }
  }

  /**
   * Toggle settings-sidebar
   */
  toggleSettingsSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('settings-open');
  }

  /**
   * Open sidebar when hover (in folded folded state)
   */
  operSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.add('open-sidebar-folded');
    }
  }

  /**
   * Fold sidebar after mouse leave (in folded state)
   */
  closeSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.remove('open-sidebar-folded');
    }
  }

  /**
   * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
   */
  iconSidebar(mq: MediaQueryList) {
    if (mq.matches) {
      this.document.body.classList.add('sidebar-folded');
    } else {
      this.document.body.classList.remove('sidebar-folded');
    }
  }

  /**
   * Switching sidebar light/dark
   */
  onSidebarThemeChange(event: Event) {
    this.document.body.classList.remove('sidebar-light', 'sidebar-dark');
    this.document.body.classList.add((<HTMLInputElement>event.target).value);
    this.document.body.classList.remove('settings-open');
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * Reset the menus then hilight current active menu item
   */
  _activateMenuDropdown() {
    this.resetMenuItems();
    this.activateMenuItems();
  }

  /**
   * Resets the menus
   */
  resetMenuItems() {
    const links = document.getElementsByClassName('nav-link-ref');

    for (let i = 0; i < links.length; i++) {
      const menuItemEl = links[i];
      menuItemEl.classList.remove('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.remove('mm-active');
        const parent2El = parentEl.parentElement;

        if (parent2El) {
          parent2El.classList.remove('mm-show');
        }

        const parent3El = parent2El?.parentElement;
        if (parent3El) {
          parent3El.classList.remove('mm-active');

          if (parent3El.classList.contains('side-nav-item')) {
            const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

            if (firstAnchor) {
              firstAnchor.classList.remove('mm-active');
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.remove('mm-show');

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.remove('mm-active');
            }
          }
        }
      }
    }
  }

  /**
   * Toggles the menu items
   */
  activateMenuItems() {
    const links: any = document.getElementsByClassName('nav-link-ref');
    let menuItemEl: HTMLElement | null =
      document.querySelector('.your-selector');
    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (window.location.pathname === links[i]['pathname']) {
        menuItemEl = links[i];

        break;
      }
    }

    if (menuItemEl) {
      menuItemEl?.classList.add('mm-active');
      const parentEl = menuItemEl?.parentElement;

      if (parentEl) {
        parentEl.classList.add('mm-active');

        const parent2El = parentEl.parentElement;
        if (parent2El) {
          parent2El.classList.add('mm-show');
        }

        const parent3El = parent2El?.parentElement;
        if (parent3El) {
          parent3El.classList.add('mm-active');

          if (parent3El.classList.contains('side-nav-item')) {
            const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

            if (firstAnchor) {
              firstAnchor.classList.add('mm-active');
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.add('mm-show');

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.add('mm-active');
            }
          }
        }
      }
    }
  }
}
