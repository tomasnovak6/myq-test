import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {CSV_DATA} from "../data-export";
import {CsvConverterService} from "./csv-converter.service";
import {IContacts} from "../model/i-contacts";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private csvConterterService: CsvConverterService,
  ) { }

  getContacts(): IContacts[] {
    const jsonContactsData: IContacts[] = this.csvConterterService.convertCsvToJson(CSV_DATA);
    return jsonContactsData;
  }
}
