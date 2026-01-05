//Service is used to handle the business logic of the application
import { Injectable } from '@nestjs/common';
@Injectable()
//This is decodorator that add's metadata to the class here we are telling nestJs that inject this service where it is required
export class AppService {
  printHello(): string { //this could be any name
    return 'print Hello World changedddddd!'; // will see in a browser
  }
}
