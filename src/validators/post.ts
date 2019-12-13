import { IsOptional, IsString, IsMongoId, IsArray } from 'class-validator';

type PostType = {
  title: string;
  content: string;
  authorId: string;
  tags: string[];
};

class CreatePostDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsMongoId()
  authorId: string;

  @IsOptional()
  @IsString({ each: true })
  tags: string[];

  constructor({ title, content, authorId, tags }: PostType) {
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.tags = tags;
  }
}

class UpdatePostDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  constructor({ title, content, tags }: PostType) {
    this.title = title;
    this.content = content;
    this.tags = tags;
  }
}

export { CreatePostDTO, UpdatePostDTO, PostType };
