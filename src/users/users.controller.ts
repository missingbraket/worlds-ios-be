import { Body, Controller, Patch, RawBody, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('changepassword')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
     //dto만 넘기면 누가 비밀번호 바꾸는지 몰라서 userId를 넘겨야 함
    @Req() req: Request & { user?: any },
  ) {
    const userId = req.user?.id; // JWT에서 유저 ID 추출
    // return this.usersService.changePassword(changePasswordDto); 
    // 위에는 userId 안 넘김
    return this.usersService.changePassword(userId, changePasswordDto);
  }
  }









