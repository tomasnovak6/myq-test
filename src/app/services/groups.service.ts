import {Injectable} from '@angular/core';
import {CsvConverterService} from "./csv-converter.service";
import {IGroups} from "../model/i-groups";
import {IContacts} from "../model/i-contacts";
import {CSV_DATA} from "../data-export";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private localStorageKey: string = 'groups_local';

  constructor(
    private csvConterterService: CsvConverterService,
    private localStorageService: LocalStorageService
  ) { }

  public getGroups(): IGroups[] {
    let groups: IGroups[];
    const localStorageData: IGroups[] = this.getLocalStorageData();

    if (!localStorageData?.length) {
      const jsonContactsData: IContacts[] = this.csvConterterService.convertCsvToJson(CSV_DATA);
      const uniqueGroups: string[] = [...new Set(jsonContactsData.map(contact => contact.group))];
      groups = uniqueGroups.map(group => ({"name": group}));

      this.setLocalStorageData(groups);
    } else {
      groups = localStorageData;
    }

    return groups;
  }

  public deleteGroup(name: string): IGroups[] {
    let groups: IGroups[] = this.getLocalStorageData();
    if (groups) {
      groups = groups.filter(item => item.name !== name);
      this.setLocalStorageData(groups);
    }

    return groups;
  }

  public createGroup(name: string): IGroups[] {
    let newItem: IGroups = {
      name
    };
    let groups: IGroups[] = this.getLocalStorageData();
    groups.push(newItem);
    this.setLocalStorageData(groups)

    return groups;
  }

  public editGroup(nameOrig: string, nameNew: string): IGroups[] {
    let groups: IGroups[] = this.getLocalStorageData();
    groups = groups.map(item => {
      if (item.name === nameOrig) {
        return { ...item, name: nameNew };
      }
      return item;
    });

    this.setLocalStorageData(groups);

    return groups;
  }

  private getLocalStorageData(): IGroups[] {
    return this.localStorageService.getItemObject(this.localStorageKey);
  }

  private setLocalStorageData(groups: IGroups[]): void {
    if (groups) {
      this.localStorageService.setItemObject(this.localStorageKey, groups);
    }
  }

}
