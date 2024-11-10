import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity'; // Import your User entity
import { Role } from 'src/utils/constant'; // Import the Role enum

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // Get the required roles from the route handler metadata (if any)
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());

    // If no roles are required, allow access
    if (!requiredRoles) {
      return true;
    }

    // Check if user exists and has the required role
    const user: User = request.user;
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    // Check if user's role matches any of the required roles
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied: insufficient permissions');
    }

    return true;
  }
}
