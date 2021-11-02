export interface UserParent {
  id: string;
  name: {
    fullName?: string,
    familyName?: string,
    givenName?: string
  }
  curp?: string;
  gender?: 'Hombre' | 'Mujer'
  relation?: {
    type?: 'Madre' | 'Padre' | 'Otro',
    custom?: string,
  };
  phones?: [{
    value?: string;
    type?: PhoneType;
    primary?: boolean;
    customType?: string
  }];
  email?: string;
  streetAddress?: string,
  city?: string;
  postalCode?: string;
  municipio?: string;
  state?: string;
}
export enum PhoneType {
  Fijo, Movil, Trabajo
}
