export const marginSizeOptions = [
  { label: 'None', value: 0 },
  { label: 'Small', value: 2 },
  { label: 'Large', value: 5 },
  { label: 'ExtraLarge', value: 8 },
];

export const resolutionOptions = [
  { label: '72 Dpi', value: 72 },
  { label: '96 Dpi', value: 96 },
  { label: '150 Dpi', value: 150 },
  { label: '300 Dpi', value: 300 },
];

export const orientationOptions = [
  { label: 'Portrait', value: 'portrait' },
  { label: 'Landscape', value: 'landscape' },
];

export const paperSizeOptions = [
  { label: 'A0', value: 'A0' }, // sizes in mm
  { label: 'A1', value: 'A1' },
  { label: 'A2', value: 'A2' },
  { label: 'A3', value: 'A3' },
  { label: 'A4', value: 'A4' },
  { label: 'A5', value: 'A5' },
];

export const paperSize = {
  A0: [841, 1189],
  A1: [594, 841],
  A2: [420, 594],
  A3: [297, 420],
  A4: [210, 297],
  A5: [148, 210],
};

export const outputFormatOptions = [
  { label: 'PNG', value: 'png' },
  { label: 'JPEG', value: 'jpeg' },
  { label: 'Clipboard', value: 'clipboard' },
  { label: 'PDF', value: 'pdf' },
  { label: 'Print', value: 'print' },
];
