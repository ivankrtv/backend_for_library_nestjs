import { Body, Controller, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { takeBookDto } from "./book-operations.dto";

@Controller('/')
export class AppController{
    
    constructor (private readonly appService: AppService) {}

    @Post('/takeBook')
    takeBook(@Body() ids: takeBookDto){
        return this.appService.takeBook(ids);
    }

    @Post('/returnBook')
    returnBook(@Body() ids: takeBookDto){
        return this.appService.returnBook(ids);
    }

}