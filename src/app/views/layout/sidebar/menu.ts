import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true,
  },
  {
    label: 'Dashboards',
    icon: 'home',
    subItems: [
      {
        label: 'Main Dashboard',
        link: '/MainDash',
        showSubItems: '',
      },
      {
        label: 'Historical Dashboard  ',
        link: '/Historical',
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
    subItems: [
      {
        label: 'Machine State',
        link: '/machines/machineState',
      },
      {
        label: 'Line Machine',
        link: '/machines/lineMachine',
      },
    ],
  },
  // material
  {
    label: 'Material',
    isTitle: true,
  },
  {
    label: 'Material',
    icon: 'bar-chart',
    subItems: [
      {
        label: 'Material Control',
        link: '/Material/materialControl',
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
    subItems: [
      {
        label: 'Production Plan',
        link: '/planProduct',
      },
      {
        label: 'Stoppage Plan',
        link: '/planResource',
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
    subItems: [
      {
        label: 'Batch Settings',
        link: '/batchSetting',
      },
      {
        label: 'Batch Weight',
        link: '/batchSetting/batchWeight',
      },
      {
        label: 'Batch History',
        link: '/batchSetting/History',
      },
      {
        label: 'Scale History',
        link: '/Scale/status',
      },
      {
        label: 'Batch Scheduler',
        link: '/batchScheduler',
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
    subItems: [
      {
        label: 'Machine Settings',
        link: '/settings/machine-settings',
      },
      {
        label: 'Production Settings',
        link: '/settings/production-settings',
      },
      {
        label: 'Line Settings',
        link: '/settings/line-settings',
      },
      {
        label: 'Add Role',
        link: '/settings/addRole',
      },
      {
        label: 'User Management',
        link: '/settings/userMangement',
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
    subItems: [
      {
        label: 'Daily reports',
        link: '/reports/dailyReports',
      },
      {
        label: 'Energy reports',
        link: '/reports/energyReports',
      },
      {
        label: 'Becon reports',
        link: '/reports/beconReports',
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
    subItems: [
      {
        label: 'Main Scada',
        link: '/Scada/mainScada',
      },
    ],
  },
];
