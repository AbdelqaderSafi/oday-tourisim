import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import type { CreateCommentDto, UpdateCommentDto } from './types/comment.dto';
import { ZodValidationPipe } from 'src/pipes/zod.validation.pipe';
import {
  createCommentSchema,
  updateCommentSchema,
  commentPaginationSchema,
} from './util/comment.validation';
import {
  CreateCommentSwagger,
  FindAllCommentsSwagger,
  FindOneCommentSwagger,
  UpdateCommentSwagger,
  DeleteCommentSwagger,
} from './swagger/comment.swagger';
import type { PaginationQueryType } from 'src/types/util.types';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @CreateCommentSwagger()
  create(
    @Body(new ZodValidationPipe(createCommentSchema)) dto: CreateCommentDto,
  ) {
    return this.commentService.create(dto);
  }

  @Get()
  @FindAllCommentsSwagger()
  findAll(
    @Query(new ZodValidationPipe(commentPaginationSchema))
    query: PaginationQueryType,
  ) {
    return this.commentService.findAll(query);
  }

  @Get(':id')
  @FindOneCommentSwagger()
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  @UpdateCommentSwagger()
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateCommentSchema)) dto: UpdateCommentDto,
  ) {
    return this.commentService.update(id, dto);
  }

  @Delete(':id')
  @DeleteCommentSwagger()
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
