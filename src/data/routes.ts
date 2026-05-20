export type RouteType = 'junior' | 'senior';

export interface BusRoute {
  id: string;
  routeNo: string;
  name: string;
  type: RouteType;
  stops: string[];
}

export const busRoutes: BusRoute[] = [
  // Junior Buses
  {
    id: 'j-15', routeNo: '15', name: 'BOD UPPAL', type: 'junior',
    stops: ['Uppal Depo', 'Uppal Bus Stop', 'Uppal X Road', 'Survey of India', 'Habsiguda', 'Tarnaka', 'Adikmet', 'Vidyanagar', 'CBIT']
  },
  {
    id: 'j-16', routeNo: '16', name: 'TARNAKA', type: 'junior',
    stops: ['Tarnaka', 'Mettuguda', 'Chilakalaguda', 'Padmarao Nagar', 'Musheerabad', 'RTC X Road', 'Indira Park', 'Lakdikapool', 'Langarhouse', 'Sun city', 'Badlaguda', 'Kalimandir', 'APPA Junction', 'CBIT']
  },
  {
    id: 'j-19', routeNo: '19', name: 'MODERN BAKERY', type: 'junior',
    stops: ['Church Ramanthapur', 'Amberpet', 'Shivam', 'Vidyanagar', 'Fever Hospital', 'Nallakunta', 'Barkatpura', 'Narayanaguda', 'Himayathnagar', 'Liberty', 'Lakdikapool', 'CBIT']
  },
  {
    id: 'j-28', routeNo: '28', name: 'SECUNDERABAD', type: 'junior',
    stops: ['Iskon Himalaya Book store Patny', 'Paradise', 'Begumpet', 'Lifestyle', 'Punjagutta', 'GVK', 'Care Hospital', 'Pension Office', 'NMDC', 'Tolichowki', 'Narayanama', 'Dargha', 'DPS', 'ORR', 'CBIT']
  },
  {
    id: 'j-29', routeNo: '29', name: 'ECIL', type: 'junior',
    stops: ['Radhika', 'A S Rao Nagar', 'Sainikpuri', 'Neredmet', 'Safilguda', 'Annadbagh', 'Malkajgiri', 'Sairam Theatre', 'Mettuguda', 'Chilakalaguda', 'Musheerabad', 'Kavadiguda', 'CBIT']
  },
  {
    id: 'j-39', routeNo: '39', name: 'L.B. NAGAR', type: 'junior',
    stops: ['Astalakshmi Temple', 'Kothapet', 'Chaitanyapuri', 'DSNR', 'Moosarambagh', 'Malakpet', 'Nalgonda X Road', 'Koti', 'Abids', 'Lakdikapool', 'Mehdipatnam', 'Langer House', 'CBIT']
  },
  {
    id: 'j-42', routeNo: '42', name: 'SAGAR X ROAD', type: 'junior',
    stops: ['Owaisi Hospital', 'Midani', 'DRDL', 'Baba Nagar', 'Chandryangutta', 'Aramghar', 'Attapur', 'Hanmantemple', 'Musi', 'Langarhouse', 'CBIT']
  },
  {
    id: 'j-45', routeNo: '45', name: 'ALAKAPURI', type: 'junior',
    stops: ['Alkapuri', 'Ratnadeep', 'Khamineni', 'L B Nagar', 'TKR Khaman', 'Gayatrinagar', 'Manda Mallamma', 'Owaisi Hospital', 'Aramghar', 'Rajendra Nagar', 'APPA', 'CBIT']
  },
  {
    id: 'j-49', routeNo: '49', name: 'BN REDDY', type: 'junior',
    stops: ['BN Reddy', 'Hastinapuram', 'Sagar X Road', 'Bhairamal guda', 'Kharmangat', 'Chempapet', 'Santosh Nagar Yadagiri Owaisi', 'Aramghar', 'CBIT']
  },
  {
    id: 'j-59', routeNo: '59', name: 'GOKUL ESI', type: 'junior',
    stops: ['Gokul', 'ESI', 'S.R Nagar', 'Maithrivanam', 'Yousufguda Check Post', 'Krishna Nagar', 'Venkatagiri', 'Jubilee Check post', 'Peddamma Temple', 'Madhapur', 'Hi-Tech City', 'Telecom Nagar', 'Mindspace', 'Gachibowli', 'ORR', 'CBIT']
  },
  {
    id: 'j-61', routeNo: '61', name: 'ALWIN JUNCTION', type: 'junior',
    stops: ['Madinaguda', 'Chandanagar', 'Lingampally', 'Railway Bridge', 'Gulmahar Park', 'HCU', 'Indranagar', 'Gachibowli', 'ORR', 'CBIT']
  },
  {
    id: 'j-63', routeNo: '63', name: 'MIYAPUR X ROAD', type: 'junior',
    stops: ['Miyapur', 'Talky Town', 'Hafeezpet', 'Kondapur', 'Kothaguda x Road', 'Botanical Garden', 'Govt. school', 'Gachibowli', 'ORR', 'CBIT']
  },
  {
    id: 'j-65', routeNo: '65', name: 'KP-Y-JUNCTION', type: 'junior',
    stops: ['Bharath Nagar', 'Musapert', 'Y Junction', 'Vivekandangar', 'KPHB', 'JNTU', 'Forum mall', 'Malaysian Township', 'shilparamam', 'Kothaguda X Road', 'Gachibowli', 'CBIT']
  },
  {
    id: 'j-69', routeNo: '69', name: 'JNTU', type: 'junior',
    stops: ['Nizampet', 'Hydernagar', 'Miyapur', 'Talky Town', 'Hafeezpet', 'Kondapur', 'Kothaguda x Road', 'Botanical Garden', 'Govt school', 'Gachibowli', 'ORR', 'CBIT']
  },

  // Senior Buses
  {
    id: 's-10', routeNo: '10', name: 'MODERN BAKERY', type: 'senior',
    stops: ['Church Ramanthapur', 'Amberpet', 'Shivam', 'Vidyanagar', 'Fever Hospital', 'Nallakunta', 'Barkatpura', 'Narayanaguda', 'Himayathnagar', 'Liberty', 'Lakdikapool', 'CBIT']
  },
  {
    id: 's-12', routeNo: '12', name: 'UPPAL X ROAD', type: 'senior',
    stops: ['NGRI', 'Habsiguda', 'Tarnaka', 'Adikmet', 'Vidyanagar', 'Lakdikapool', 'Mehdipatnam', 'Langarhouse', 'Sun city', 'Badlaguda', 'Kalimandir', 'APPA Junction', 'CBIT']
  },
  {
    id: 's-13', routeNo: '13', name: 'RAMANTHAPUR', type: 'senior',
    stops: ['Ramanthapur', 'Amberpet', 'Shivam', 'Vidyanagar', 'Lakdikapool', 'NMDC', 'Mehdipatnam', 'Tolichowki', 'Narayanama College', 'Dargha', 'DPS', 'CBIT']
  },
  {
    id: 's-14', routeNo: '14', name: 'BOD UPPAL', type: 'senior',
    stops: ['Uppal Depo', 'Uppal Bus Stop', 'Uppal X Road', 'Survey of India', 'Habsiguda', 'Tarnaka', 'Adikmet', 'Vidyanagar', 'CBIT']
  },
  {
    id: 's-17', routeNo: '17', name: 'NFC', type: 'senior',
    stops: ['NFC', 'Mallapur', 'Nacharam', 'HMT Nagar', 'Habsiguda', 'Tarnaka', 'Mettuguda', 'Chilakalaguda', 'Musheerabad', 'RTC X Road', 'Ashoknagar', 'Indira Park', 'Lakdikapool', 'CBIT']
  },
  {
    id: 's-18', routeNo: '18', name: 'ECIL', type: 'senior',
    stops: ['ECIL X Road', 'Kamalanagar', 'HB Colony', 'ZTC', 'Lalapet', 'Tarnaka', 'Mettuguda', 'Chilakalaguda', 'Padmarao Nagar', 'Musheerabad', 'Kavadiguda', 'Lakdikapool', 'CBIT']
  },
  {
    id: 's-20', routeNo: '20', name: 'A S RAO Nagar', type: 'senior',
    stops: ['Radhika Theatre', 'A S Rao Nagar', 'Sainikpuri', 'Neredmet', 'Safilguda', 'Annadbagh', 'Malkajgiri', 'Sairam Theatre', 'Mettuguda', 'Chilakalaguda', 'CBIT']
  },
  {
    id: 's-22', routeNo: '22', name: 'A S RAO Nagar', type: 'senior',
    stops: ['Radhika Theatre', 'A S Rao Nagar', 'Sainikpuri', 'Neredmet', 'RK Puram', 'West Maredpalli', 'Sangeeth', 'Patny', 'NMDC', 'CBIT']
  },
  {
    id: 's-24', routeNo: '24', name: 'ALWAL', type: 'senior',
    stops: ['Ayyappa Swamy Temple', 'Raithubazer', 'Lothukunta', 'Lalbazer', 'Thirmalgiri', 'Kharkhana', 'JBS', 'Paradise', 'Punjagutta', 'Care hospital', 'Masabtunk', 'CBIT']
  },
  {
    id: 's-26', routeNo: '26', name: 'SUCHITRA', type: 'senior',
    stops: ['Suchitra', 'MMR Garden', 'Bowinpally', 'Sowjanya Colony', 'Ashoka Garden', 'Tadbund', 'Paradise', 'Begumpet', 'Lifestyle', 'GVK', 'Care Hospital', 'NMDC', 'CBIT']
  },
  {
    id: 's-30', routeNo: '30', name: 'INDU ARANYA', type: 'senior',
    stops: ['Bandlguda', 'Nagol X Road', 'Mohan Nagar', 'Kothapet', 'Malakpet', 'Nemboliada', 'Kachiguda', 'YMC', 'Old MLA Quarters', 'Basheerbagh', 'Lakdikapool', 'CBIT']
  },
  {
    id: 's-36', routeNo: '36', name: 'L.B. NAGAR', type: 'senior',
    stops: ['Astalakshmi Temple', 'Kothapet', 'Chaitanyapuri', 'DSNR', 'Moosarambagh', 'Malakpet', 'Nalgonda X Road', 'Koti', 'Abids', 'Lakdikapool', 'Mehdipatnam', 'Langer House', 'CBIT']
  },
  {
    id: 's-41', routeNo: '41', name: 'HAYATH NAGAR', type: 'senior',
    stops: ['Auto Nagar', 'Panama', 'Chintalkunta', 'Sagar X Road', 'TKR Khaman', 'Gayatrinagar', 'Owaisi Hospital', 'DRDI', 'Aramghar', 'Rajendra Nagar', 'APPA', 'CBIT']
  },
  {
    id: 's-44', routeNo: '44', name: 'ALAKAPURI', type: 'senior',
    stops: ['Alkapuri', 'Ratnadeep', 'Khamineni', 'L B Nagar', 'TKR Khaman', 'Gayatrinagar', 'Owaisi Hospital', 'DRDI', 'Aramghar', 'Rajendra Nagar', 'APPA', 'CBIT']
  },
  {
    id: 's-46', routeNo: '46', name: 'VANASTHALIPURAM', type: 'senior',
    stops: ['Redtunk', 'Ganesh Temple', 'Panama', 'Chintalkunta', 'Sagar X Road', 'Manda Mallamma', 'Owaisi Hospital', 'DRDI', 'Aramghar', 'Rajendra Nagar', 'APPA', 'CBIT']
  },
  {
    id: 's-47', routeNo: '47', name: 'SAGAR X ROAD', type: 'senior',
    stops: ['Sagar X Road', 'Bhairamal guda', 'Kharmangat', 'Chempapet', 'Santosh Nagar Yadagiri Owaisi', 'MIDHANI', 'Baba Nagar', 'Chandryangutta', 'Aramghar', 'Rajendra Nagar', 'APPA', 'CBIT']
  },
  {
    id: 's-48', routeNo: '48', name: 'BN REDDY', type: 'senior',
    stops: ['BN Reddy', 'Hastinapuram', 'Sagar X Road', 'Bhairamal guda', 'Kharmangat', 'Chempapet', 'Santosh Nagar Yadagiri Owaisi', 'Aramghar', 'Attapur', 'Hanmantemple', 'Musi', 'Langarhouse', 'CBIT']
  },
  {
    id: 's-52', routeNo: '52', name: 'SRINAGAR COLONY', type: 'senior',
    stops: ['Gokul', 'SR Nagar', 'Maithrivanam', 'Ameerpet', 'Srinagar Colony', 'Ratnadeep', 'TV 9', 'LVP', 'Baswathara Wisper Valley', 'Darga', 'Signal', 'DPS', 'Khajaguda', 'CBIT', 'Film Nagar']
  },
  {
    id: 's-54', routeNo: '54', name: 'PR NAGAR', type: 'senior',
    stops: ['Motinagar', 'Kalyan Nagar', 'Yousufguda X Roas', 'Krishna Nagar', 'Jubilee Check post', 'Peddammatemple', 'Madhapur', 'Hi-Tech City', 'Mindspace', 'Telecom Nagar', 'Gachibowli', 'CBIT']
  },
  {
    id: 's-60', routeNo: '60', name: 'ICRISAT', type: 'senior',
    stops: ['RC Puram', 'Beeramguda', 'Ashoknagar', 'BHEL', 'Lingampally', 'Railway Bridge', 'Nalagandla Road', 'Gopanpally X Road', 'Gowldodi', 'Wipro Cirele', 'kokapet X Road', 'CBIT']
  },
  {
    id: 's-62', routeNo: '62', name: 'MIYAPUR X ROAD', type: 'senior',
    stops: ['Miyapur', 'Talky Town', 'Hafeezpet', 'Kondapur', 'Kothaguda x Road', 'Botanical Garden', 'Govt. school', 'Gachibowli', 'ORR', 'CBIT']
  },
  {
    id: 's-64', routeNo: '64', name: 'PRAGATHI NAGAR', type: 'senior',
    stops: ['JNTU', 'Nizampet', 'Hydernagar', 'Miyapur', 'Talky Town', 'Hafeezpet', 'Kondapur', 'Gachibowli', 'ORR', 'CBIT']
  },
  {
    id: 's-66', routeNo: '66', name: 'JEEDIMETLA', type: 'senior',
    stops: ['Shapur PS', 'Chinthal', 'IDPL', 'Narsapur X Road Y Junction', 'Vivekandangar', 'KPHB', 'INTU', 'Forum mall', 'Malaysian Township', 'shilparamam', 'Telecom Nagar', 'Gachibowli', 'ORR', 'CBIT']
  },
  {
    id: 's-67', routeNo: '67', name: 'ALWIN JUNCTION', type: 'senior',
    stops: ['Madinaguda', 'Chandanagar', 'Lingampally', 'Railway Bridge', 'Gulmahar Park', 'HCU', 'Indranagar', 'Gachibowli', 'ORR', 'CBIT']
  },
  {
    id: 's-68', routeNo: '68', name: 'FEROZGUDA', type: 'senior',
    stops: ['Bowinpally', 'Balanagar', 'Kukatpally', 'KPIIB', 'JNTU', 'Forum mall', 'Malaysian Township', 'Shilparamam', 'Kothaguda X Road', 'Gachibowli', 'CBIT']
  }
];
