import { Injectable } from '@angular/core';
import {IContacts} from "../model/i-contacts";
import {IGroups} from "../model/i-groups";

@Injectable({
  providedIn: 'root'
})
export class CsvConverterService {

  constructor() { }

  public convertCsvToJson(csvData: string): IContacts[]{
    const lines: string[] = csvData.split('\n');
    const contacts: IContacts[] = [];

    for (let i = 1; i < lines.length; i++) {
      const data: string[] = lines[i].split(';');
      const entry: IContacts = {
        fullname: data[0],
        email: data[1],
        phone: data[2],
        group: data[3],
        tags: data[4].split('#').filter(tag => tag !== '')
      };

      contacts.push(entry);
    }

    return contacts;
  }

}
