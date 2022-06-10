import { Module } from '@nestjs/common';
import { ElevatorController } from './elevator.controller';
import { ElevatorService } from './elevator.service';

@Module({
  controllers: [ElevatorController],
  providers: [ElevatorService]
})
export class ElevatorModule {}
