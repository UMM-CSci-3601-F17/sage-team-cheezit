import {Pipe, PipeTransform} from '@angular/core';
import {isObject} from "rxjs/util/isObject";

@Pipe({name: 'keyvalue'})
export class KeyValuePipe implements PipeTransform {

    transform(obj: any): { key: any, value: any }[] {
        if (Array.isArray(obj) || !isObject(obj)) {
            return obj;
        }

        return Object.keys(obj).map(k => ({key: k, value: obj[k]}));
    }
}
