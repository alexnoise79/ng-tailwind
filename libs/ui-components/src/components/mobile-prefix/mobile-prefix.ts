export interface IPrefix {
  id: number;
  name: string;
  prefix: string;
  code?: string;
}


export class IMobilePrefix {
  phone: string;
  prefix: IPrefix;

  constructor(phone: string, prefix: IPrefix) {
    this.phone = phone;
    this.prefix = prefix;
  }
}
