import { Injectable } from '@nestjs/common';
import bcrypt = require('bcrypt');

@Injectable()
export class PasswordService {
  /**
   * Method for get password hash
   * @param   {string} password not hashed password
   * @param   {number} rounds   rounds for create salts
   * @returns {Any}             password hash
   */
  getPasswordHash(password: string, rounds: number = 10) {
    try {
      const salt = bcrypt.genSaltSync(rounds);
      const hash = bcrypt.hashSync(password, salt);

      return hash;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Method for validate password and hash
   * @param   {string} password not hashed password for compare
   * @param   {string} hash     hashed password for compare
   * @returns {boolean}         compare result
   */
  comparePassword(password, hash) {
    try {
      return bcrypt.compareSync(password, hash);
    } catch (error) {
      throw error;
    }
  }
}
