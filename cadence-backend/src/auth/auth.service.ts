import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private UserService: UserService) { }

  // Gets user by email, checks hashed password against input. Returns true if valid and false if not.
  // TODO: come back when dealing with sessions.
  async login(email: Prisma.UserWhereUniqueInput, password: string): Promise<boolean> {
    const user: Promise<User | null> = this.UserService.user(email);
    const hashed: string | undefined = await user.then(res => res?.password);
    if (hashed == undefined) { return false }
    const isValid: boolean = await bcrypt.compare(password, hashed).then(res => res.valueOf())
    return isValid
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
