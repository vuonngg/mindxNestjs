/**
 * DTOs cho Application Layer
 * Dùng để truyền dữ liệu giữa các layers
 */

// Input DTOs
export interface CreateUserDTO {
  name: string;
  age: number;
  gender: string;
}

export interface UpdateUserDTO {
  name?: string;
  age?: number;
  gender?: string;
}

// Output DTOs
export interface UserResponseDTO {
  id: number;
  name: string;
  age: number;
  gender: string;
}

// Service Interface Token
export enum UserServiceTokens {
  Service = 'USERS_SERVICE',
}

// Service Interface
export interface IUsersService {
  getAllUsers(): Promise<UserResponseDTO[]>;
  getUserById(id: number): Promise<UserResponseDTO | null>;
  createUser(user: CreateUserDTO): Promise<UserResponseDTO>;
  updateUser(id: number, updatedFields: UpdateUserDTO): Promise<UserResponseDTO | null>;
  deleteUser(id: number): Promise<boolean>;
}

