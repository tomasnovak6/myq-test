import {Injectable} from '@angular/core';
import {CSV_DATA} from "../data-export";
import {CsvConverterService} from "./csv-converter.service";
import {IContacts} from "../model/i-contacts";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private csvConterterService: CsvConverterService,
    private localStorageService: LocalStorageService
  ) { }

  private localStorageKey: string = 'contacts_local';

  public getContacts(): IContacts[] {
    let contacts: IContacts[];
    const localStorageData: IContacts[] = this.getLocalStorageData();

    if (!localStorageData?.length) {
      contacts = this.csvConterterService.convertCsvToJson(CSV_DATA);
      this.setLocalStorageData(contacts);
    } else {
      contacts = localStorageData;
    }

    return contacts;
  }

  public getContact(email: string): IContacts {
    let contacts: IContacts[] = this.getLocalStorageData();
    let contact: IContacts[] = [];
    if (contacts) {
      contact = contacts.filter(item => item.email === email);
    }

    return contact[0];
  }

  public deleteContact(email: string): IContacts[] {
    let contacts: IContacts[] = this.getLocalStorageData();
    if (contacts) {
      contacts = contacts.filter(item => item.email !== email);
      this.setLocalStorageData(contacts);
    }

    return contacts;
  }

  public createContact(item: IContacts): IContacts[] {
    let contacts: IContacts[] = this.getLocalStorageData();
    contacts.push(item);
    this.setLocalStorageData(contacts)

    return contacts;
  }

  public editContact(email: string, itemNew: IContacts): IContacts[] {
    let contacts: IContacts[] = this.getLocalStorageData();

    contacts = contacts.map(item => {
      if (item.email === email) {
        return { ...item, ...itemNew };
      }
      return item;
    });

    this.setLocalStorageData(contacts);

    return contacts;
  }

  private getLocalStorageData(): IContacts[] {
    return this.localStorageService.getItemObject(this.localStorageKey);
  }

  private setLocalStorageData(contacts: IContacts[]): void {
    if (contacts) {
      this.localStorageService.setItemObject(this.localStorageKey, contacts);
    }
  }


}
