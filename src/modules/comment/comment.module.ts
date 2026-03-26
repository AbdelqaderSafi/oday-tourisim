import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, DatabaseService],
})
export class CommentModule {}
