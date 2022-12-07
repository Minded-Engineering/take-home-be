import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  private JWT_SECRET = process.env.JWT_SECRET ?? '';

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    try {
      const request = context.switchToHttp().getRequest();
      request.user = await this.verifyToken(request);
      return next.handle();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private verifyToken(request: FastifyRequest) {
    const token = this.getToken(request);
    return verify(token, this.JWT_SECRET, {});
  }

  private getToken(request: FastifyRequest): string {
    if (request?.headers?.authorization) {
      const parts = request?.headers?.authorization.split(/\s+/);
      if (parts[0].toLowerCase() !== 'bearer' || parts.length !== 2) {
        throw new Error('Invalid token');
      }
      return parts[1];
    } else {
      throw new Error('Missing token');
    }
  }
}
