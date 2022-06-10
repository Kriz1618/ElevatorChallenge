import { Injectable } from '@nestjs/common';
import { Elevator } from './entities/elevator';

@Injectable()
export class ElevatorService {
    private elevator = new Elevator(14, 5);

    async goUp() {
        return await this.elevator.goUp();
    }

    async goDown() {
        return await this.elevator.goDown();
    }

    async goToFloor(floor: number) {
        return await this.elevator.goToSpecifiFloor(floor);
    }

    async getStatus() {
        return await this.elevator.getElevatorStatus();
    }
}
