import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Get the request object
    const request: Request = context.switchToHttp().getRequest();

    // Check if user exists (middleware will set req.user)
    if (!request.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    // If the user is authenticated, return true (allow the request to proceed)
    return true;
  }
}
