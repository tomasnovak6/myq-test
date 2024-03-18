import { Injectable } from '@angular/core';
import {IContactsData} from "../model/i-contacts-data";

@Injectable({
  providedIn: 'root'
})
export class CsvConverterService {

  constructor() { }

  convertCsvToJson(csvData: string): IContactsData[] {
    const lines: string[] = csvData.split('\n');
    const jsonData: IContactsData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const data: string[] = lines[i].split(';');
      const entry: IContactsData = {
        fullname: data[0],
        email: data[1],
        phone: data[2],
        group: data[3],
        tags: data[4].split('#').filter(tag => tag !== '')
      };

      jsonData.push(entry);
    }

    return jsonData;
  }

}
