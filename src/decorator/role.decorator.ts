import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/utils/constant'; // Import your Role enum

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
