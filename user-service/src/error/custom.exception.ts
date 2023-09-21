/* eslint-disable prettier/prettier */
// custom.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super({ message }, statusCode);
  }
}
