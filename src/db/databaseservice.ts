import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private dataSource: DataSource) {}

  // Method to check if the database is connected
  async checkConnection(): Promise<boolean> {
    try {
      // Attempting a simple query to check the connection
      const result = await this.dataSource.query('SELECT 1');
      if (result) {
        console.log('Database is connected!');
        return true;
      }
      console.log('Database is not connected!');
      return false;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }
}
