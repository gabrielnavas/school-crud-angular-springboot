import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeCategory'
})
export class CapitalizeCategoryPipe implements PipeTransform {

  transform(value: string): string {
    const firstLetter = value[0]
    const firstLetterUpperCase = firstLetter.toUpperCase();
    const restWord = value.substring(1).toLocaleLowerCase();
    const valueCapitalized = `${firstLetterUpperCase}${restWord}`;
    return this.changeUndelineToHifen(valueCapitalized);
  }

  private changeUndelineToHifen(value: string) {
    return value.replace("_", "-")
  }

}
