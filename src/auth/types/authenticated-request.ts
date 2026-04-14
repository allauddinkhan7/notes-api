import { Request } from 'express';
import { Role } from 'src/user/user.types';

export interface AuthenticatedUser {
  sub: string; // user ID
  role: Role;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
