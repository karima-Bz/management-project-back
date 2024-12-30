import { Role, User } from '../../users/entities/user.entity';
import { CreateUserInput } from '../../users/dto/create-user.input';
import { UpdateUserInput } from '../../users/dto/update-user.input';

export const user: User = {
  _id: '6576d6d44441e8ea8a38b5a8',
  id: '6576d6d44441e8ea8a38b5a8',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'andrew@prisma.io',
  name: 'Andrew',
  password: 'whoami',
  role: Role.ADMIN,
};
export const users: User[] = [user];

export const createUserInput: CreateUserInput = {
  email: 'andrew@prisma.io',
  name: 'Andrew',
  password: 'whoami',
  role: 'ADMIN',
};

export const updateUserInput: UpdateUserInput = {
  role: 'USER',
};
