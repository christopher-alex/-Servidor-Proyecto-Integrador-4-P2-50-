import { Prop } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, MaxLength, MinLength, } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(4)
  @MaxLength(12)
  password: string;

  @IsNotEmpty()
  role: string;

}
