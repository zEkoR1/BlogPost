import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidationTaskCreationPipe implements PipeTransform {
  transform(value: any): any {
    if (
      !value.title ||
      typeof value.title !== 'string' ||
      value.title.trim() == ''
    )
      throw new BadRequestException(`Wrong title format`);

    if (
      !value.description ||
      typeof value.description !== 'string' ||
      value.description.trim() === ''
    )
    throw new BadRequestException(`Wrong description format`);

    return value;
  }
}
