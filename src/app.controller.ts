import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //handles req res cycle
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()  
   
  getHello(): string {
    return this.appService.printHello(); //no business logic in controller we only handle req res cycle 
  }



}
 