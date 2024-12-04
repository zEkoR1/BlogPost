import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
@Injectable()
export class ValidationStatusPipe implements PipeTransform {
    private isValid(value: any): boolean {
      if (value ==='in_Progress' || value ==='completed')
        return true;
      // return false;
    } 
    
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValid(value))
      throw new BadRequestException(`Status is not valid`);
    return value;
  }

}
