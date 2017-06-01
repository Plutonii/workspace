import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'filterTasks',
  pure: false
})
export class FilterTasks implements PipeTransform {
  transform(items: any[], fieldName: string, fieldValue:boolean): any {
    if (!items || !fieldName) {
      return items;
    }
    return items.filter(item => {
      return item[fieldName] !== fieldValue;
    });
  }
}
