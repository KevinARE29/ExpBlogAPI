import { IsOptional, IsString, IsMongoId } from 'class-validator';

type CommentType = {
  message: string;
  authorId: string;
};

class CreateCommentDTO {
  @IsString()
  message: string;
  @IsMongoId()
  authorId: string;

  constructor({ message, authorId }: CommentType) {
    this.message = message;
    this.authorId = authorId;
  }
}

export { CreateCommentDTO };
