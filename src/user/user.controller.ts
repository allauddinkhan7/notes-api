import { Body, Controller, Delete, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateDto } from './dto/updateUser.dto';
import { DeleteDto } from './dto/deleteDto..dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post('update')// user/update
    updateUser(@Body() updateUserDto: UpdateDto){
        const updatedUser = this.userService.updateUser(updateUserDto)
        return updatedUser;
    }


    @Delete('delete')// user/delete
    deleteUser(@Body() deleteUserDto: DeleteDto){
        console.log("...............................................",deleteUserDto)
        const deletedUser = this.userService.deleteUser(deleteUserDto)
        return {user: deletedUser, msg: 'User deleted successfully'};
    }


}
