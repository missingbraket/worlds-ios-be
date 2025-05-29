import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //회원가입
  async create(createUserDto: CreateUserDto) {
    const hashedPassword: string = await (bcrypt as any).hash(
      createUserDto.password,
      10,
    );
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,
        role: createUserDto.role,
      },
    });
  }
  //로그인시 유저 찾기
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  //토큰에서 유저 ID 추출 -> 유저 정보 조회
  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
