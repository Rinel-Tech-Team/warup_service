import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RedisService } from 'src/infrastructure/cache/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly redis: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET') as string,
    });
  }

  async validate(payload: any) {
    const exist = await this.redis.getJSON<{ userId: string }>(
      `token:${payload.sub}`,
    );
    if (!exist)
      throw new UnauthorizedException('Token tidak valid / sudah logout');
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
