import { HttpException, HttpStatus, HttpVersionNotSupportedException } from "@nestjs/common";
import { Status, ElevatorDirection } from "../enums";

export class Elevator {
    private velocity: number;
    private floors: number;
    
    constructor(floors: number, velocity = 1) {
        this.floors = floors;
        this.velocity = velocity;
        this.currentFloor = 1;
        // this.targetFloor = 1;
        // this.status = Status.STOPED;
        // this.direction = ElevatorDirection.DOWN;    
    }
    
    protected currentFloor: number;
    protected targetFloor: number;
    protected direction: ElevatorDirection;
    protected status: Status;

    async goUp(floors = 1) {
        if (this.status === Status.MOVING) {
            throw new HttpException('The elevator is moving now', HttpStatus.BAD_REQUEST);
        }
        if (this.currentFloor === this.floors) {
            throw new HttpException('The elevator is in the higher floor', HttpStatus.BAD_REQUEST);
        }
        if (floors > this.floors) {
            throw new HttpException('Invalid floor', HttpStatus.BAD_REQUEST);
        }

        this.status = Status.MOVING;
        this.direction = ElevatorDirection.UP;
        this.targetFloor = this.currentFloor + floors;
        const time = floors * 1000 * this.velocity;

        setTimeout(() => {
            this.currentFloor += floors;
            this.status = Status.STOPED;
            this.targetFloor = 0;
        }, time);

        return 'Going up...';
    }

    async goDown(floors = 1) {
        if (this.status === Status.MOVING) {
            throw new HttpException('The elevator is moving now', HttpStatus.BAD_REQUEST);
        }
        if (this.currentFloor === 1) {
            throw new HttpException('The elevator is already in the first floor', HttpStatus.BAD_REQUEST);
        }

        this.status = Status.MOVING;
        this.direction = ElevatorDirection.UP;
        this.targetFloor = this.currentFloor - floors;
        const time = floors * 1000 * this.velocity;

        setTimeout(() => {
            this.currentFloor -= floors;
            this.status = Status.STOPED;
            this.targetFloor = 0;
        }, time);

        return 'Going down...';
    }

    async goToSpecifiFloor(targetFloor: number) {
        if (targetFloor < this.currentFloor) {
            return this.goDown(this.currentFloor - targetFloor);
        }
        if (targetFloor > this.currentFloor) {
            return this.goUp(targetFloor - this.currentFloor);
        }

        throw new HttpException(
            `The elevator is already in the floor ${targetFloor}`,
            HttpStatus.BAD_REQUEST,
        );
    }

    async getElevatorStatus() {
        if (this.status === Status.MOVING) {
            return `The elevator is going ${this.direction} to the floor ${this.targetFloor}`;
        }

        return `The elevator is stopped in the floor ${this.currentFloor}`;
    }    
}
