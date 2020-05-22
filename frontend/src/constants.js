export const STATE_ROW_STATISTICS = [
  'confirmed',
  'active',
  'recovered',
  'deaths',
];
export const DISTRICT_ROW_STATISTICS = [
  'confirmed',
  'active',
  'recovered',
  'deceased',
];

export const MAP_TYPES = {
  COUNTRY: 'country',
  STATE: 'state',
  DISTRICT: 'district',
};

export const MAP_STATISTICS = {
  TOTAL: 0,
  PER_MILLION: 1,
  ZONE: 2,
  HOTSPOTS: 3,
};

export const MAP_VIEWS = {
  STATES: 0,
  DISTRICTS: 1,
};

export const MAPS_DIR =
  process.env.NODE_ENV === 'production' ? '/mini_maps' : '/maps';

export const MAP_META = {
  India: {
    geoDataFile: 'https://raw.githubusercontent.com/mc-internship/covid19visualizer/tmp-deploy/frontend/public/maps/india.json',
    mapType: MAP_TYPES.COUNTRY,
    graphObjectStates: 'india-states',
    graphObjectDistricts: 'india-districts-2019-734',
  },

  Germany: {
    geoDataFile: 'https://raw.githubusercontent.com/mc-internship/covid19visualizer/tmp-deploy/frontend/public/maps/germany.json',
    mapType: MAP_TYPES.COUNTRY,
    graphObjectStates: 'layer',
    graphObjectDistricts: 'india-districts-2019-734',
  },

  Italy: {
    geoDataFile: 'https://raw.githubusercontent.com/mc-internship/covid19visualizer/tmp-deploy/frontend/public/maps/italy.json',
    mapType: MAP_TYPES.COUNTRY,
    graphObjectStates: 'ITA_adm1',
    graphObjectDistricts: 'india-districts-2019-734',
  },

  USA: {
    geoDataFile: 'https://raw.githubusercontent.com/mc-internship/covid19visualizer/tmp-deploy/frontend/public/maps/usa.json',
    mapType: MAP_TYPES.COUNTRY,
    graphObjectStates: 'us',
    graphObjectDistricts: 'india-districts-2019-734',
  }
};

export const STATE_CODES = {
  AP: 'Andhra Pradesh',
  AR: 'Arunachal Pradesh',
  AS: 'Assam',
  BR: 'Bihar',
  CT: 'Chhattisgarh',
  GA: 'Goa',
  GJ: 'Gujarat',
  HR: 'Haryana',
  HP: 'Himachal Pradesh',
  JH: 'Jharkhand',
  KA: 'Karnataka',
  KL: 'Kerala',
  MP: 'Madhya Pradesh',
  MH: 'Maharashtra',
  MN: 'Manipur',
  ML: 'Meghalaya',
  MZ: 'Mizoram',
  NL: 'Nagaland',
  OR: 'Odisha',
  PB: 'Punjab',
  RJ: 'Rajasthan',
  SK: 'Sikkim',
  TN: 'Tamil Nadu',
  TG: 'Telangana',
  TR: 'Tripura',
  UT: 'Uttarakhand',
  UP: 'Uttar Pradesh',
  WB: 'West Bengal',
  AN: 'Andaman and Nicobar Islands',
  CH: 'Chandigarh',
  DN: 'Dadra and Nagar Haveli and Daman and Diu',
  DL: 'Delhi',
  JK: 'Jammu and Kashmir',
  LA: 'Ladakh',
  LD: 'Lakshadweep',
  PY: 'Puducherry',
};
/*
export const STATE_POPULATIONS = {
  'Andaman and Nicobar Islands': 397000,
  'Andhra Pradesh': 52221000,
  'Arunachal Pradesh': 1504000,
  Assam: 34293000,
  Bihar: 119520000,
  Chandigarh: 1179000,
  Chhattisgarh: 28724000,
  'Dadra and Nagar Haveli and Daman and Diu': 959000,
  Delhi: 19814000,
  Goa: 1540000,
  Gujarat: 67936000,
  Haryana: 28672000,
  'Himachal Pradesh': 7300000,
  'Jammu and Kashmir': 13203000,
  Jharkhand: 37403000,
  Karnataka: 65798000,
  Kerala: 35125000,
  Ladakh: 293000,
  Lakshadweep: 68000,
  'Madhya Pradesh': 82232000,
  Maharashtra: 122153000,
  Manipur: 3103000,
  Meghalaya: 3224000,
  Mizoram: 1192000,
  Nagaland: 2150000,
  Odisha: 43671000,
  Puducherry: 1504000,
  Punjab: 29859000,
  Rajasthan: 77264000,
  Sikkim: 664000,
  'Tamil Nadu': 75695000,
  Telangana: 37220000,
  Tripura: 3992000,
  'Uttar Pradesh': 224979000,
  Uttarakhand: 11141000,
  'West Bengal': 96906000,
  Total: 1332900000,
};
*/


