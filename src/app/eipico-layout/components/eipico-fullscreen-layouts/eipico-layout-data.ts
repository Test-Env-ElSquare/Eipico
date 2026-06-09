export interface LayoutLine {
  name: string;
  lineId: number;
}

export interface LayoutSection {
  label: string;
  machines: LayoutLine[];
}

export const EIPICO_ONE_SECTIONS: LayoutSection[] = [
  {
    label: 'Penam',
    machines: [{ name: 'IMA 2', lineId: 26 }],
  },
  {
    label: 'Cephalo',
    machines: [
      { name: 'Perry 2', lineId: 28 },
      { name: 'IMA 1', lineId: 2 },
    ],
  },
  {
    label: 'Beta_Lactal (strile)',
    machines: [{ name: 'Perry 1', lineId: 25 }],
  },
  {
    label: 'Dry Mix',
    machines: [
      { name: 'Ulman 300', lineId: 43 },
      { name: 'Dry Syrup', lineId: 42 },
      { name: 'Countec', lineId: 44 },
      { name: 'Ulman (Standalone)', lineId: 72 },
    ],
  },
  {
    label: 'Ampole',
    machines: [
      { name: 'IMA 3', lineId: 68 },
      { name: 'ROTA 7', lineId: 62 },
      { name: 'ROTA 5', lineId: 63 },
      { name: 'ROTA 4', lineId: 64 },
      { name: 'IMA 2', lineId: 65 },
      { name: 'IMA 4', lineId: 66 },
      { name: 'ROTA 6', lineId: 67 },
    ],
  },
  {
    label: 'Drops',
    machines: [
      { name: 'Eye Drops 1', lineId: 24 },
      { name: 'Eye Drops 2', lineId: 20 },
      { name: 'Eye Drops 3', lineId: 23 },
    ],
  },
  {
    label: 'Tablet',
    machines: [
      { name: ' C80_1', lineId: 45 },
      { name: 'C80_2', lineId: 46 },
      { name: 'TR200', lineId: 69 },
      { name: 'Ulman ubs4', lineId: 54 },
      { name: 'Zebler (Romaco)', lineId: 55 },
      { name: 'BQS', lineId: 56 },
      { name: 'Ulman800 (Ulman1)', lineId: 57 },
      { name: 'Ulman800 (Ulman2)', lineId: 58 },
      { name: 'Janson1', lineId: 59 },
      { name: 'Janson2', lineId: 60 },
      { name: 'Ulman300', lineId: 61 },
    ],
  },
  {
    label: 'Syrup',
    machines: [
      { name: 'Line 6 Drops', lineId: 36 },
      { name: 'Line 5 Vangard', lineId: 34 },
      { name: 'Line 4 ss4', lineId: 33 },
      { name: 'Line 3 Bocsh', lineId: 3 },
      { name: 'Line 2 ss new', lineId: 40 },
      { name: 'Line 1 ss3', lineId: 38 },
    ],
  },
  {
    label: 'Ointment',
    machines: [
      { name: 'Line AXO', lineId: 32 },
      { name: 'Line COM', lineId: 41 },
      { name: 'Line IMA', lineId: 37 },
      { name: 'Line Supp', lineId: 27 },
    ],
  },
];

export const EIPICO_TWO_SECTIONS: LayoutSection[] = [
  {
    label: 'Ointment',
    machines: [{ name: 'Ointment Line 1', lineId: 50 }],
  },
  {
    label: 'Drops',
    machines: [{ name: 'IMA', lineId: 31 }],
  },
  {
    label: 'Syrup',
    machines: [
      { name: 'CAM Line 1', lineId: 29 },
      { name: 'CAM Line 2', lineId: 30 },
    ],
  },
  {
    label: 'Tablet',
    machines: [
      { name: 'Ulman 300 (Standalone)', lineId: 44 },
      { name: 'IMA 1', lineId: 52 },
      { name: 'IMA 2', lineId: 53 },
    ],
  },
  {
    label: 'Effer',
    machines: [
      { name: 'DrySyrup', lineId: 47 },
      { name: 'IMA 1', lineId: 48 },
      { name: 'IMA 2', lineId: 49 },
    ],
  },
  {
    label: 'Hormone (Ampole)',
    machines: [
      { name: 'Ampoule', lineId: 70 },
      { name: 'Vial', lineId: 51 },
    ],
  },
];
