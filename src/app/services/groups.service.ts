import { Injectable } from '@angular/core';
import {CsvConverterService} from "./csv-converter.service";
import {Observable, of} from "rxjs";
import {IGroups} from "../model/i-groups";
import {IContacts} from "../model/i-contacts";
import {CSV_DATA} from "../data-export";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(
    private csvConterterService: CsvConverterService,
  ) { }

  public getGroups(): Observable<IGroups[]> {
    const jsonContactsData: IContacts[] = this.csvConterterService.convertCsvToJson(CSV_DATA);

    const uniqueGroups: string[] = [...new Set(jsonContactsData.map(contact => contact.group))];
    const groups: IGroups[] = uniqueGroups.map(group => ({ "name": group }));

    // console.log('jsonData', jsonContactsData);
    // console.log('groups', groups);

    return of(groups);
  }
}
