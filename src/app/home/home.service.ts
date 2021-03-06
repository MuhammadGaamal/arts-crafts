import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HomeService {
  isNumber = Number.isFinite;
  brandOptions = [
    'ADStore',
    'YasmeenGallery',
    'Handmade4U',
    'ArtCreative',
    'ElZahraaAccessories',
    'DreamWay',
    'Sendeyan',
    'Stitches',
    // 'Decoration',
    // 'Accessories',
    // 'Clothes',
    // 'Gifts',
    // 'Wallets',
    // 'Bags',
    // 'Furniture',
    // 'Crochet'
  ];
  defaultPrices = [
    '0,100',
    '100,200',
    '200,300',
    '300,400',
    '400,500',
    '500,600',
    '600,10000'
    // '0,500',
    // '500,600',
    // '600,700',
    // '700,800',
    // '800,900',
    // '900,1000',
    // '1000,20000'
  ];
  priceOptions = [
    {name: 'Under 100 EGP', value: '0,100'},
    {name: '100 to 200 EGP', value: '100,200'},
    {name: '200 to 300 EGP', value: '200,300'},
    {name: '300 to 400 EGP', value: '300,400'},
    {name: '400 to 500 EGP', value: '400,500'},
    {name: '500 to 600 EGP', value: '500,600'},
    {name: 'Above 100 EGP', value: '1000,20000'}
  ];
  osOptions = [
    'Clothes',
    'Accessories',
    'Crochet',
    'BagsWallets',
    'GiftsDecoration'
    // 'Scarfs',
    // 'Shoes',
    // 'Handbag',
    // 'Jewelries',
    // 'Dresses'
  ];
  ramOptions = ['64', '32', '16', '12', '8', '4', '2'];
  processorOptions = [
    'S',
    'M',
    'L',
    'XL',
    'XXL'
  ];
  storageOptions = ['Men', 'Women'];
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  serializeQueryParams(queryObj) {
    const serializedObj = {};
    const list = Object.keys(queryObj);
    let brands = [];
    let os = [];
    let processor = [];
    let storage = [];
    let ram = [];
    let min: number;
    let max: number;

    list.forEach(value => {
      switch (value) {
        case 'brand': {
          const keys = Object.keys(queryObj.brand);
          brands = keys.filter(key => queryObj.brand[key]);
          break;
        }
        case 'os': {
          const keys = Object.keys(queryObj.os);
          os = keys.filter(key => queryObj.os[key]);
          break;
        }
        case 'price': {
          let price = queryObj.price;
          if (price) {
            price = price.split(',');
            min = price[0];
            max = price[1];
          }
          break;
        }
        case 'processor': {
          const keys = Object.keys(queryObj.processor);
          processor = keys.filter(key => queryObj.processor[key]);
          break;
        }
        case 'ram': {
          const keys = Object.keys(queryObj.ram);
          ram = keys.filter(key => queryObj.ram[key]);
          break;
        }
        case 'storage': {
          const keys = Object.keys(queryObj.storage);
          storage = keys.filter(key => queryObj.storage[key]);
          break;
        }
        default:
        /* do nothing */
      }
    });

    if (os.length > 0) serializedObj['os'] = os.join(',');
    if (brands.length > 0) serializedObj['brand'] = brands.join(',');
    if (processor.length > 0) serializedObj['processor'] = processor.join(',');
    if (storage.length > 0) serializedObj['storage'] = storage.join(',');
    if (ram.length > 0) serializedObj['ram'] = ram.join(',');
    if (min) serializedObj['min'] = `${min}`;
    if (max) serializedObj['max'] = `${max}`;
    return serializedObj;
  }

  parseQueryParams(queryObj) {
    const allFilters = {
      brand: {},
      os: {},
      processor: {},
      ram: {},
      storage: {},
      min: '',
      max: '',
      search: ''
    };
    const title = [];
    queryObj.keys.forEach(element => {
      switch (element) {
        case 'brand': {
          let arr = queryObj.params.brand;
          if (typeof arr === 'string') {
            title.push(arr.replace(/,/g, ', '));
            arr = arr.split(',');
            arr.forEach(
              value => (allFilters.brand[value.toLowerCase()] = true)
            );
          }
          break;
        }
        case 'os': {
          let arr = queryObj.params.os;
          if (typeof arr === 'string') {
            title.push(arr.replace(/,/g, ', '));
            arr = arr.split(',');
            arr.forEach(value => (allFilters.os[value.toLowerCase()] = true));
          }
          break;
        }
        case 'min': {
          const str = queryObj.params.min;
          if (Array.isArray(str)) break;
          if (str) {
            allFilters.min = str;
            title.push(`min: ${str}`);
          }
          break;
        }
        case 'max': {
          const str = queryObj.params.max;
          if (Array.isArray(str)) break;
          if (str) {
            allFilters.max = str;
            title.push(`max: ${str}`);
          }
          break;
        }
        case 'processor': {
          let arr = queryObj.params.processor;
          if (typeof arr === 'string') {
            title.push(arr.replace(/,/g, ', '));
            arr = arr.split(',');
            arr.forEach(
              value => (allFilters.processor[value.toLowerCase()] = true)
            );
          }
          break;
        }
        case 'ram': {
          let arr = queryObj.params.ram;
          if (typeof arr === 'string') {
            title.push(`RAM: ${arr.replace(/,/g, ', ')}GB`);
            arr = arr.split(',');
            arr.forEach(value => (allFilters.ram[value] = true));
          }
          break;
        }
        case 'storage': {
          let arr = queryObj.params.storage;
          if (typeof arr === 'string') {
            title.push(arr.replace(/,/g, ', '));
            arr = arr.split(',');
            arr.forEach(
              value => (allFilters.storage[value.toLowerCase()] = true)
            );
          }
          break;
        }
        case 'search': {
          const str = queryObj.params.search;
          if (typeof str === 'string') {
            title.push(str);
            allFilters.search = str;
          }
          break;
        }
        default:
        /* do nothing */
      }
    });
    return {queryObj: allFilters, pageTitle: title};
  }

  getAllProducts(obj: any): Observable<any> {
    let productUrl = `/api/shop/${obj.page}?obj=${JSON.stringify(obj)}`; // api url
    if (this.isNumber(obj.minCustom)) productUrl += `&min=${obj.minCustom}`;
    if (this.isNumber(obj.maxCustom)) productUrl += `&max=${obj.maxCustom}`;
    if (!obj.minCustom && !obj.maxCustom && obj.price) {
      const value = obj.price.split(',');
      productUrl += `&min=${value[0]}&max=${value[1]}`;
    }
    return this.http.get(this.baseUrl + productUrl);
  }
}
