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
  isCollapsed = false;

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
    const fullAccess = true;

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
            showSubItems:
              fullAccess || this.authService.isHasAccessToMainDashboards(),
          },
          {
            label: 'Historical Dashboard',
            link: '/Historical',
            showSubItems:
              fullAccess ||
              this.authService.isHasAccessToHistoricalDashboards(),
          },
        ],
      },
      // {
      //   label: 'Machines',
      //   isTitle: true,
      // },
      {
        label: 'Machines',
        icon: 'settings',
        showSubItems:
          fullAccess ||
          this.authService.isHasAccessToMachineStatus() ||
          this.authService.isHasAccessToLineMachine(),
        subItems: [
          {
            label: 'Machine State',
            link: '/machines/machineState',
            showSubItems:
              fullAccess || this.authService.isHasAccessToMachineStatus(),
          },
          {
            label: 'Line Machine',
            link: '/machines/lineMachine',
            showSubItems:
              fullAccess || this.authService.isHasAccessToLineMachine(),
          },
        ],
      },
      // {
      //   label: 'Material',
      //   isTitle: true,
      // },
      {
        label: 'Material',
        icon: 'bar-chart',
        showSubItems:
          fullAccess || this.authService.isHasAccessToMaterialControl(),
        subItems: [
          {
            label: 'Material Control',
            link: '/Material/materialControl',
            showSubItems:
              fullAccess || this.authService.isHasAccessToMaterialControl(),
          },
        ],
      },
      // {
      //   label: 'plan',
      //   isTitle: true,
      // },
      {
        label: 'plans',
        icon: 'table',
        showSubItems:
          fullAccess || this.authService.isHasAccessToProductionPlan(),
        subItems: [
          {
            label: 'Production Plan',
            link: '/planProduct',
            showSubItems:
              fullAccess || this.authService.isHasAccessToProductionPlan(),
          },
        ],
      },
      // {
      //   label: 'Batch management',
      //   isTitle: true,
      // },
      {
        label: 'Batch Management',
        icon: 'settings',
        showSubItems:
          fullAccess ||
          this.authService.isHasAccessToBatchSettings() ||
          this.authService.isHasAccessToBatchWeight() ||
          this.authService.isHasAccessToBatchHistory() ||
          this.authService.isHasAccessToScaleHistory() ||
          this.authService.isHasAccessToBatchSchedulerView(),
        subItems: [
          {
            label: 'Batch Settings',
            link: '/batchSetting',
            showSubItems:
              fullAccess || this.authService.isHasAccessToBatchSettings(),
          },
          {
            label: 'Batch Weight',
            link: '/batchSetting/batchWeight',
            showSubItems:
              fullAccess || this.authService.isHasAccessToBatchWeight(),
          },
          {
            label: 'Batch History',
            link: '/batchSetting/History',
            showSubItems:
              fullAccess || this.authService.isHasAccessToBatchHistory(),
          },
          {
            label: 'Scale History',
            link: '/Scale/status',
            showSubItems:
              fullAccess || this.authService.isHasAccessToScaleHistory(),
          },
          {
            label: 'Batch Scheduler',
            link: '/batchScheduler',
            showSubItems:
              fullAccess || this.authService.isHasAccessToBatchSchedulerView(),
          },
        ],
      },
      // {
      //   label: 'Settings',
      //   isTitle: true,
      // },
      {
        label: 'Settings',
        icon: 'settings',
        showSubItems:
          fullAccess ||
          this.authService.isHasAccessToMachineSettings() ||
          this.authService.isHasAccessToProductionSettings() ||
          this.authService.isHasAccessToLineSettings() ||
          this.authService.isHasAccessToAddRole() ||
          this.authService.isHasAccessToUserManagement(),
        subItems: [
          {
            label: 'Add Role',
            link: '/settings/addRole',
            showSubItems: fullAccess || this.authService.isHasAccessToAddRole(),
          },
          {
            label: 'User Management',
            link: '/settings/userMangement',
            showSubItems:
              fullAccess || this.authService.isHasAccessToUserManagement(),
          },
          {
            label: 'Shift',
            link: '/settings/shift',
            showSubItems:
              fullAccess || this.authService.isHasAccessToUserManagement(),
          },
          {
            label: 'Machines',
            link: '/settings/machine-settings',
            showSubItems:
              fullAccess || this.authService.isHasAccessToUserManagement(),
          },
          {
            label: 'Profile',
            link: '/auth/view-profile',
            showSubItems:
              fullAccess || this.authService.isHasAccessToUserManagement(),
          },
        ],
      },
      // {
      //   label: 'Reports',
      //   isTitle: true,
      // },
      {
        label: 'Reports',
        icon: 'cast',
        showSubItems:
          fullAccess ||
          this.authService.isHasAccessToEnergyReport() ||
          this.authService.isHasAccessToBeconReport(),
        subItems: [
          {
            label: 'Daily reports',
            link: '/reports/dailyReports',
            showSubItems: fullAccess || true, // daily reports دايمًا تظهر مع fullAccess
          },
          {
            label: 'Becon reports',
            link: '/reports/beconReports',
            showSubItems:
              fullAccess || this.authService.isHasAccessToBeconReport(),
          },
        ],
      },
      {
        label: 'Utilities',
        icon: 'cast',
        showSubItems:
          fullAccess || this.authService.isHasAccessToEnergyReport(),
        subItems: [
          {
            label: 'Energy',
            link: '/reports/energyReports',
            showSubItems:
              fullAccess || this.authService.isHasAccessToEnergyReport(),
          },
        ],
      },
      // {
      //   label: 'Scada',
      //   isTitle: true,
      // },
      {
        label: 'Scada',
        icon: 'sliders',
        showSubItems: fullAccess || this.authService.isHasAccessToscada(),
        subItems: [
          {
            label: 'Main Scada',
            link: '/Scada/mainScada',
            showSubItems: fullAccess || this.authService.isHasAccessToscada(),
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
    this.isCollapsed = !this.isCollapsed;
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
  trackByFn(index: number, item: any) {
    return item.id || index;
  }

  // toggleSidebar(event: Event) {
  //   this.isCollapsed = !this.isCollapsed;
  // }

  toggleSubmenu(item: any) {
    item.expanded = !item.expanded;
  }

  toggleSubSubmenu(subitem: any) {
    subitem.expanded = !subitem.expanded;
  }

  isDisabled(label: string): boolean {
    const disabledItems = [
      'Line Settings',
      'Production Settings',
      'Stoppage Plan',
      'Daily reports',
    ];
    return disabledItems.includes(label);
  }
}
