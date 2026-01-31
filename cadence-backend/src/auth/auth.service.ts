import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from "./entity/auth.entity";

@Injectable()
export class AuthService {
  constructor(private UserService: UserService, private jwtService: JwtService) { }

  // Gets user by email, checks hashed password against input. Returns true if valid and false if not.
  async login(email: Prisma.UserWhereUniqueInput, password: string): Promise<AuthEntity> {
    const user: Promise<User | null> = this.UserService.user(email);
    const userId: Promise<string | undefined> = user.then(res => res?.id)
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}.`)
    }

    const hashed: string | undefined = await user.then(res => res?.password);
    if (hashed == undefined) {
      throw new UnauthorizedException("Password can not be hashed.")
    }

    const isValid: boolean = await bcrypt.compare(password, hashed).then(res => res.valueOf())
    if (!isValid) {
      throw new UnauthorizedException("Invalid password.")
    }

    // Generate JWT token containing user ID.
    return {
      accessToken: this.jwtService.sign({ userId: await userId })
    }
  }

  // TODO: come back when dealing with sessions
  async logout() {

  }

  async register(data: Prisma.UserCreateInput) {
    return this.UserService.createUser(data)
  }

  // hashes new password and updates user with that new password. Returns true if success, and false if not.
  async resetPassword(email: Prisma.UserWhereUniqueInput, newPassword: string): Promise<boolean> {
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    const user = this.UserService.user(email)
    if (user == null) {
      return false
    }
    const res: Promise<User> = this.UserService.updateUser({
      where: email,
      data: {
        ...user,
        password: newHashedPassword
      }
    })
    return true
  }
}
