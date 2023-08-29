import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  
  transform(value: any, searchValue?: string): any[] {
    debugger;

   
    if(value.length == 0){
      return value;
    }
    // var upperData = value.toUppercase();
    // var upperText = value.toUppercase();
    // if (upperData.indexOf(upperText) == -1) {
       
    // }
    // else {
    //   //Found
    // }

    
    return value.filter((val:any) => (val.title.toLowerCase().indexOf(searchValue) )  > -1 );
    
  }

}
