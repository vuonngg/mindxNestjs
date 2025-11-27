import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryTokens } from '../../domain/ports/user.repository.port';
import type { IUserRepositoryPort } from '../../domain/ports/user.repository.port';
import { User } from '../../domain/entities/User';
import type { CreateUserDTO, UpdateUserDTO, UserResponseDTO, IUsersService } from '../dtos/user.dto';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(UserRepositoryTokens.Repository)
    private readonly userRepository: IUserRepositoryPort,
  ) {}

  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();
    return users.map(this.toDTO);
  }

  async getUserById(id: number): Promise<UserResponseDTO | null> {
    const user = await this.userRepository.findById(id);
    return user ? this.toDTO(user) : null;
  }

  async createUser(dto: CreateUserDTO): Promise<UserResponseDTO> {
    // Sử dụng Domain Entity với business logic
    const user = User.create(dto.name, dto.age, dto.gender);
    const created = await this.userRepository.create(user);
    return this.toDTO(created);
  }

  async updateUser(id: number, dto: UpdateUserDTO): Promise<UserResponseDTO | null> {
    const updated = await this.userRepository.update(id, dto);
    return updated ? this.toDTO(updated) : null;
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.userRepository.delete(id);
  }

  private toDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      age: user.age,
      gender: user.gender,
    };
  }
}

