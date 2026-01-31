import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Prisma, User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private UserService: UserService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET')!
    });
  }

  async validate(payload: { userId: Prisma.UserWhereUniqueInput }): Promise<User> {
    const user = await this.UserService.user(payload.userId)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
