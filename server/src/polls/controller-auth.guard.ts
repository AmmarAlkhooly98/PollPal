import {
  Injectable,
  CanActivate,
  Logger,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ControllerAuthGuard implements CanActivate {
  private readonly logger = new Logger(ControllerAuthGuard.name);
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    this.logger.debug(`Checking for auth token on req body`, request.body);
    const { accessToken } = request.body;
    try {
      const payload = this.jwtService.verify(accessToken);
      request.pollID = payload.pollID;
      request.userID = payload.sub;
      request.name = payload.name;
      return true;
    } catch {
      throw new ForbiddenException('Invalid Authorization token');
    }
  }
}
