import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiSystemService {
  getHealt() {
    return { status: 'ok' };
  }
}
