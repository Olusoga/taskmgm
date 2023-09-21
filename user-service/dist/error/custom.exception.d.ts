import { HttpException, HttpStatus } from '@nestjs/common';
export declare class CustomException extends HttpException {
    constructor(message: string, statusCode: HttpStatus);
}
