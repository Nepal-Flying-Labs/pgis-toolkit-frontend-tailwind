import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';

const { VECTORTILE_URL } = process.env;

export const siteId = 'sites';
export const regionId = 'regions';
export const rainfallLayerId = 'rainfall-station';
export const forecastLayerId = 'forecast';
export const landslideReportLayerId = 'landslide-report';
export const riskLayerId = 'risk';
export const vulnerabilityLayerId = 'vulnerability';

export const defaultLayerIds = [
  siteId,
  regionId,
  rainfallLayerId,
  forecastLayerId,
  landslideReportLayerId,
];

export const popupExceptionKeys = [
  'site_id',
  'id',
  'project_id',
  'submission',
  'region_id',
  'site',
  'region',
];

export const municipalLayers = [
  {
    id: 'province',
    name: 'Province',
    checked: false,
    url: `${VECTORTILE_URL}/federal/province.mvt/?tile={z}/{x}/{y}`,
  },
  {
    id: 'district',
    name: 'District',
    checked: false,
    url: `${VECTORTILE_URL}/federal/district.mvt/?tile={z}/{x}/{y}`,
  },
  {
    id: 'municipality',
    name: 'Municipality',
    checked: false,
    url: `${VECTORTILE_URL}/federal/municipality.mvt/?tile={z}/{x}/{y}`,
  },
];

export const municipalStyles = {
  ...defaultStyles,
  fillOpacity: 0,
  lineColor: '#333333',
};

export const municipalLayerStyles = {
  municipality: {
    styleId: 'municipality',
    style: { ...municipalStyles },
  },
  district: {
    styleId: 'district',
    style: { ...municipalStyles },
  },
  province: {
    styleId: 'province',
    style: { ...municipalStyles },
  },
};

export const riskColors = {
  low: '#13de13',
  // medium: '#efe44d',
  medium: '#e8b620',
  high: '#dc1010',
};

export const rainfallLayer = {
  id: rainfallLayerId,
  name: 'Rainfall Stations',
  checked: false,
};

export const rainfallStyles = {
  [rainfallLayerId]: {
    styleId: rainfallLayerId,
    style: {
      ...defaultStyles,
      geometryType: 'Point',
      fillColor: '#0F7DD2',
      fillOpacity: 100,
      circleRadius: 4,
      // icon: {
      //   id: rainfallLayerId,
      //   url: 'https://assessment.naxa.com.np/media/upload/secondary_layer_icon/2017532.svg',
      //   scale: '0.01',
      //   fillColor: '#0F7DD2',
      // },
    },
  },
};

export const forecastLayer = {
  id: forecastLayerId,
  name: 'Forecast Points',
  checked: false,
};

export const forecastStyles = {
  [forecastLayerId]: {
    styleId: forecastLayerId,
    style: {
      ...defaultStyles,
      geometryType: 'Point',
      fillColor: '#D65555',
      lineColor: '#D65555',
      fillOpacity: 100,
      circleRadius: 4,
    },
  },
};

export const landslideReportLayer = {
  id: landslideReportLayerId,
  name: 'Landslide Reports',
  checked: false,
};

export const landslideReportStyles = {
  [landslideReportLayerId]: {
    styleId: landslideReportLayerId,
    style: {
      ...defaultStyles,
      geometryType: 'Point',
      fillColor: '#D60000',
      lineColor: '#D60000',
      fillOpacity: 100,
      circleRadius: 4,
    },
  },
};

export const metricLayers = [
  {
    id: riskLayerId,
    name: 'Risk',
    checked: false,
  },
  {
    id: vulnerabilityLayerId,
    name: 'Vulnerability',
    checked: false,
  },
];

export const rainfallColorScheme = ['#96ffea', '#00429d'];

export const initialMapExtent = [80.0354, 26.234302, 88.242187, 30.902225];
