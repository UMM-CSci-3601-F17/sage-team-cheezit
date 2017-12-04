
import { Pipe, PipeTransform } from '@angular/core';
import {isObject} from "ngx-pipes/src/app/pipes/helpers/helpers";

@Pipe({name: 'keyvalue'})
export class KeyValuePipe implements PipeTransform {

    transform(obj: any): {key: any, value: any}[] {
        if (Array.isArray(obj) || !isObject(obj)) {
            return obj;
        }

        return Object.keys(obj).map(k => ({key: k, value: obj[k]}));
    }
}
