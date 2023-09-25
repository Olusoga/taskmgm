/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable,ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Connection, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { CustomException } from './error/custom.exception';

// Services, or so called Data Access Object (Data Access Object)

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
    private readonly httpService: HttpService,
    private jwtService: JwtService,
  ) {}

  async findOne(username: string) {
    const user = await this.userRepository.findOne({ where: { username: username } });
    return user;

  }

  async validateUser(username:string, pass) {
    const user = await this.findOne(username)
    if (!user)
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'invalid username',
      },
      HttpStatus.BAD_REQUEST,
    );
  if (!(await bcrypt.compare(pass, user.password)))
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: ' invalid password',
      },
      HttpStatus.BAD_REQUEST,
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...result } = user;
  return result;
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {

    const user = await this.findOne(authCredentialsDto.username)
    if(user) throw new ConflictException(' user already exist')
    const saltOrRounds = 10;
    const password = authCredentialsDto.password;
    const hashed = await bcrypt.hash(password, saltOrRounds);

     const result= await this.userRepository.create({...authCredentialsDto, password:hashed});

     try{

      return await this.userRepository.save(result)

     }catch(error){

      throw new CustomException('An error occurred during processing', HttpStatus.INTERNAL_SERVER_ERROR);
     }
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }
}
