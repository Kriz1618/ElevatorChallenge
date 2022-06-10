import { Body, Controller, Get, Post } from '@nestjs/common';
import { EleVatorDto } from './dto';
import { ElevatorService } from './elevator.service';

@Controller('elevator')
export class ElevatorController {
    constructor(private readonly elevatorService: ElevatorService) {}

    @Get()
    async getStatus(): Promise<string> {
        return await this.elevatorService.getStatus();
    }

    @Post('up')
    async goUp(): Promise<string> {
        return await this.elevatorService.goUp();
    }

    @Post('down')
    async goDown(): Promise<string> {
        return await this.elevatorService.goDown();
    }

    @Post('floor')
    async goTo(@Body() { floor }: EleVatorDto): Promise<string> {
        return await this.elevatorService.goToFloor(floor);
    }
}
