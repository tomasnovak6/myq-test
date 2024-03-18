import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CSV_DATA} from "../data-export";
import {CsvConverterService} from "./csv-converter.service";
import {IContactsData} from "../model/i-contacts-data";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private csvConterterService: CsvConverterService,
  ) { }

  getCsvContactsData(): Observable<IContactsData[]> {
    const csvContactsData: string = CSV_DATA;
    const jsonContactsData: IContactsData[] = this.csvConterterService.convertCsvToJson(csvContactsData);
    const jsonObs: Observable<IContactsData[]> = of(jsonContactsData);

    return jsonObs;
  }
}
