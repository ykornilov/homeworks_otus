import { Controller, Get, UseGuards, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User as UserDecorator } from './user/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@UserDecorator() user: User, @Res() res: Response): Promise<any> {
    const accessToken = await this.authService.login(user);
    res.cookie('token', accessToken);

    return res.send({result: 'Success'});
  }

  @Post('auth/logout')
  async logout(@Res() res: Response): Promise<any> {
    res.clearCookie('token');

    return res.send({result: 'Success'});
  }  

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
