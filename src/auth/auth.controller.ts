import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SignupPipe } from './pipes/signup.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(SignupPipe)
  signup(@Body() newUser: SignupDto) {
    return this.authService.signup(newUser);
  }
}
