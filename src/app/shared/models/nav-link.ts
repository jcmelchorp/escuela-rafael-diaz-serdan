import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface NavLink {
  route: string;
  name: string;
  icon?: IconDefinition;
  index?: number;
}
