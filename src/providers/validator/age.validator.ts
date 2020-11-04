import { AbstractControl } from '@angular/forms';

export function AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value < 18) {
     return { 'age': true };

  }else if(control.value >= 18){
    return  { 'age': false };
  }
  return null;
}
/*
if(control.value >= 18){
    return  { 'age': false };
  }
import { FormControl } from '@angular/forms';

export class AgeValidator {

    static isValid(control: FormControl): any {

        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }
        
        if((control.value =='')){
            return {
                "Age is required": true
            };
        }

        if(control.value % 1 !== 0){
            return {
                "not a whole number": true
            };
        }

        if(control.value < 18){
            return {
                "*Age should be more than 18 years": true
            };
        }

        if (control.value > 120){
            return {
                "not realistic Age": true
            };
        }

        return null;
    }

}
*/