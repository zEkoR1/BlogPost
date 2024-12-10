import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
  } from '@nestjs/common';
  import { validate as isUUID } from 'uuid';


  @Injectable()
  export class UuidValidationPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
      if (!isUUID(value)) {
        throw new BadRequestException(`${value} is not a valid UUID`);
      }
      
      return value;
    }
  }