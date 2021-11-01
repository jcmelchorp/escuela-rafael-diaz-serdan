import { Observable } from "rxjs";

export interface RouterCard {
  title: string;
  description?: string;
  route: string;
  imgUrl?: string;
  access: Observable<boolean>;
}
