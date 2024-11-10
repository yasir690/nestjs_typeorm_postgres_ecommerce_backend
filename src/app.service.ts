import { Injectable } from '@nestjs/common';
import { DatabaseService } from './db/databaseservice';

@Injectable()
export class AppService {

  constructor(private databaseService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

   // Called when the module has been initialized
   async onModuleInit() {
    const isConnected = await this.databaseService.checkConnection();
    if (!isConnected) {
      console.log('Unable to connect to the database!');
      // Handle the error as needed, e.g., throw an exception, or stop the app
    } else {
      console.log('Database connection is successful!');
    }
  }
}
