import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiSystemService {
  /**
   * Method for get server health
   */
  getHealt() {
    return { status: 'ok' };
  }
}
