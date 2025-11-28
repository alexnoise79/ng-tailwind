export interface IPrefix {
  id: number;
  name: string;
  dialCode: string;
  code?: string;
}

export class IMobilePrefix {
  phone: string;
  country: IPrefix;

  constructor(phone: string, country: IPrefix) {
    this.phone = phone;
    this.country = country;
  }
}

