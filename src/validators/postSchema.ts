import {
  ValidateNested,
  IsOptional,
  IsString,
  IsMongoId
} from 'class-validator';

class Comment {
  @IsString()
  message: string;
  @IsString()
  userId: string;

  constructor(message: string, userId: string) {
    console.log('Comment Constructor');
    this.message = message;
    this.userId = userId;
  }
}

type PostType = {
  title: string;
  content: string;
  authorId: string;
  comments: Comment[];
  tags: string[];
};

class Post {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsMongoId()
  authorId: string;

  @ValidateNested({ each: true })
  @IsOptional()
  comments: Comment[];

  @IsOptional()
  @IsString({ each: true })
  tags: string[];

  constructor({ title, content, authorId, comments, tags }: PostType) {
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.comments = comments;
    this.tags = tags;
  }
}

export { Post };
