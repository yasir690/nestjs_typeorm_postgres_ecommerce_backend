import { User } from "src/users/entities/user.entity";

declare global {
    namespace Express {
      interface Request {
        user?: User;  // Add the 'user' property to the Request object, which will be of type User
      }
    }
  }