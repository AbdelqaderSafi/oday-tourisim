import { Module } from '@nestjs/common';
import { SecurityApprovalService } from './security-approval.service';
import { SecurityApprovalController } from './security-approval.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [SecurityApprovalController],
  providers: [SecurityApprovalService, DatabaseService],
})
export class SecurityApprovalModule {}
