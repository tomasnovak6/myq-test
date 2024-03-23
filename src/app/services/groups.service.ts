import { Injectable } from '@angular/core';
import {CsvConverterService} from "./csv-converter.service";
import {IGroups} from "../model/i-groups";
import {IContacts} from "../model/i-contacts";
import {CSV_DATA} from "../data-export";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private groups: IGroups[] = [];

  constructor(
    private csvConterterService: CsvConverterService,
  ) { }

  public getGroups(): IGroups[] {
    const jsonContactsData: IContacts[] = this.csvConterterService.convertCsvToJson(CSV_DATA);
    const uniqueGroups: string[] = [...new Set(jsonContactsData.map(contact => contact.group))];
    const groups: IGroups[] = uniqueGroups.map(group => ({ "name": group }));
    this.groups = groups;

    return groups;
  }

  public deleteGroup(name: string): IGroups[] {
    const groups: IGroups[] = this.groups.filter(item => item.name !== name);
    this.groups = groups;

    return groups;
  }

  public editGroup(nameToEdit: string, newName: string): IGroups[] {
    const groups: IGroups[] = this.groups.map(item => {
      if (item.name === nameToEdit) {
        return { ...item, name: newName };
      }
      return item;
    });
    this.groups = groups;

    return groups;
  }

}
