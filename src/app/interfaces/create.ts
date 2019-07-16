import { Member } from './member';

export interface Create extends Member {
  readonly email: string;
  readonly password: string;
}
