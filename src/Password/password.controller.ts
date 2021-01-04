import { Controller } from '@nestjs/common';
import { PasswordService } from './password.service';

@Controller()
export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  encrypt(password: string) {
    return this.passwordService.getPasswordHash(password);
  }

  check(password, hash) {
    return this.passwordService.comparePassword(password, hash);
  }
}
