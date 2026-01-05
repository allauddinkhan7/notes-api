import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('update')// user/update
    updateUser(@Body() updateUserDto: UpdateDto){
        const updatedUser = this.userService.updateUser(updateUserDto)
        return updatedUser;
    }


}
