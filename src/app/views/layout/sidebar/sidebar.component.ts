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
import { Permission } from '../../../core/models/permission';
import { PermissionService } from '../../../core/services/permission.service';

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
    private router: Router,
    private perms: PermissionService
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
          this.perms.hasAny([
            Permission.HistoricalDashboards,
            Permission.MainDashboards,
          ]),
        icon: 'home',
        subItems: [
          {
            label: 'Main Dashboard',
            link: '/MainDash',
            showSubItems:
              fullAccess || this.perms.has(Permission.MainDashboards),
          },
          {
            label: 'Historical Dashboard',
            link: '/Historical',
            showSubItems:
              fullAccess || this.perms.has(Permission.HistoricalDashboards),
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
          fullAccess ||
          this.perms.hasAny([Permission.MachineStatus, Permission.LineMachine]),
        subItems: [
          {
            label: 'Machine State',
            link: '/machines/machineState',
            showSubItems:
              fullAccess || this.perms.has(Permission.MachineStatus),
          },
          {
            label: 'Line Machine',
            link: '/machines/lineMachine',
            showSubItems: fullAccess || this.perms.has(Permission.LineMachine),
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
        showSubItems: fullAccess || this.perms.has(Permission.MaterialControl),
        subItems: [
          {
            label: 'Material Control',
            link: '/Material/materialControl',
            showSubItems:
              fullAccess || this.perms.has(Permission.MaterialControl),
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
        showSubItems: fullAccess || this.perms.has(Permission.ProductionPlan),
        subItems: [
          {
            label: 'Production Plan',
            link: '/planProduct',
            showSubItems:
              fullAccess || this.perms.has(Permission.ProductionPlan),
          },
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
          fullAccess ||
          this.perms.hasAny([
            Permission.BatchSettings,
            Permission.BatchWeight,
            Permission.BatchHistory,
            Permission.ScaleHistory,
            Permission.BatchSchedulerView,
          ]),
        subItems: [
          // {
          //   label: 'Batch Settings',
          //   link: '/batchSetting',
          //   showSubItems:
          //     fullAccess || this.perms.has(Permission.BatchSettings),
          // },
          {
            label: 'Batch Weight',
            link: '/batchSetting/batchWeight',
            showSubItems: fullAccess || this.perms.has(Permission.BatchWeight),
          },
          {
            label: 'Batch History',
            link: '/batchSetting/History',
            showSubItems: fullAccess || this.perms.has(Permission.BatchHistory),
          },
          {
            label: 'Scale History',
            link: '/Scale/status',
            showSubItems: fullAccess || this.perms.has(Permission.ScaleHistory),
          },
          {
            label: 'Batch Scheduler',
            link: '/batchScheduler',
            showSubItems:
              fullAccess || this.perms.has(Permission.BatchSchedulerView),
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
          fullAccess ||
          this.perms.hasAny([
            Permission.MachineSettings,
            Permission.ProductionSettings,
            Permission.LineSettings,
            Permission.AddRole,
            Permission.UserManagement,
            Permission.BatchSettings,
            Permission.Everything,
          ]),
        subItems: [
          {
            label: 'Batch Settings',
            link: '/batchSetting',
            showSubItems:
              fullAccess || this.perms.has(Permission.BatchSettings),
          },
          {
            label: 'Add Role',
            link: '/settings/addRole',
            showSubItems: fullAccess || this.perms.has(Permission.AddRole),
          },
          {
            label: 'User Management',
            link: '/settings/userMangement',
            showSubItems:
              fullAccess || this.perms.has(Permission.UserManagement),
          },
          {
            label: 'Shift',
            link: '/settings/shift',
            showSubItems:
              fullAccess || this.perms.has(Permission.UserManagement),
          },
          // {
          //   label: 'Machines',
          //   link: '/settings/machine-settings',
          //   showSubItems:
          //     fullAccess || this.perms.has(Permission.UserManagement),
          // },
          {
            label: 'Profile',
            link: '/auth/view-profile',
            showSubItems:
              fullAccess || this.perms.has(Permission.UserManagement),
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
          fullAccess ||
          this.perms.hasAny([Permission.EnergyReport, Permission.BeconReport]),
        subItems: [
          {
            label: 'Becon reports',
            link: '/reports/beconReports',
            showSubItems: fullAccess || this.perms.has(Permission.BeconReport),
          },
          // {
          //   label: 'Daily reports',
          //   link: '/reports/dailyReports',
          //   showSubItems: fullAccess || this.perms.has(Permission.BeconReport),
          // },
          // {
          //   label: ' Daily reports',
          //   link: '/reports/dailyReports',
          //   showSubItems: fullAccess || this.perms.has(Permission.BeconReport),
          // },
        ],
      },
      {
        label: 'Utilities',
        icon: 'cast',
        showSubItems: fullAccess || this.perms.has(Permission.EnergyReport),
        subItems: [
          {
            label: 'Energy',
            link: '/reports/energyReports',
            showSubItems: fullAccess || this.perms.has(Permission.EnergyReport),
          },
        ],
      },
      // {
      //   label: 'Scada',
      //   isTitle: true,
      // },
      // {
      //   label: 'Scada',
      //   icon: 'sliders',
      //   showSubItems: fullAccess || this.perms.has(Permission.Scada),
      //   subItems: [
      //     {
      //       label: 'Main Scada',
      //       link: '/Scada/mainScada',
      //       showSubItems: fullAccess || this.perms.has(Permission.Scada),
      //     },
      //   ],
      // },
      {
        label: 'Layout',
        isTitle: true,
      },
      {
        label: 'Layout',
        icon: 'bar-chart',
        showSubItems: fullAccess || this.perms.has(Permission.Everything),
        subItems: [
          {
            label: 'Eipico one',
            link: '/eipico-layout/eipico-one',
            showSubItems: fullAccess || this.perms.has(Permission.Everything),
          },
          {
            label: 'Eipico two',
            link: '/eipico-layout/eipico-two',
            showSubItems: fullAccess || this.perms.has(Permission.Everything),
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
