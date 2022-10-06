import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowels'
})
export class VowelsPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/a/gi,'0').replace(/e/gi,'1')
    .replace(/i/gi,'2').replace(/o/gi,'3').replace(/u/gi,'4');
  }

}
