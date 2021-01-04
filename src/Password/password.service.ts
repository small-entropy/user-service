import { Injectable } from '@nestjs/common';
import bcrypt = require('bcrypt');

@Injectable()
export class PasswordService {
  getPasswordHash(password: string) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }
  comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}
