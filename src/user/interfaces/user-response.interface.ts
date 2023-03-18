import { User } from '../entities/user.entity';

export interface UserResponseInterface {
  message: string;
  statusCode: number;
  status: string;
  data: {
    users: User[];
  };
}
