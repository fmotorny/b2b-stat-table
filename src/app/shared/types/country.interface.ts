export interface CountryInterface {
  alpha2Code: string;
  alpha3Code: string;
  altSpellings: Array<string>;
  area: number;
  borders: Array<string>;
  callingCodes: Array<string>;
  capital: string;
  cioc: string;
  currencies: Array<object>;
  demonym: string;
  flag: string;
  gini: number;
  languages: Array<object>;
  latlng: Array<number>;
  name: string;
  nativeName: string;
  numericCode: string;
  population: number;
  region: string;
  regionalBlocs: Array<object>;
  subregion: string;
  timezones: Array<string>;
  topLevelDomain: Array<string>;
  translations: Translations;
}

export interface Translations {
  br: string;
  de: string;
  es: string;
  fa: string;
  fr: string;
  hr: string;
  it: string;
  ja: string;
  nl: string;
  pt: string;
}
