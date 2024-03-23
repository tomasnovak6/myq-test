import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private localStorage: Storage;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = this.document.defaultView?.localStorage as Storage;
  }

  public getItemString(key: string): any {
    let result;
    if (this.localStorage) {
      result = this.localStorage.getItem(key) as string;
    }
    return result;
  }

  public setItemString(key: string, data: string): void {
    if (this.localStorage) {
      this.localStorage.setItem(key, data);
    }
  }

  public getItemObject(key: string): any {
      let data, resultObj;
      if (this.localStorage) {
        data = this.localStorage.getItem(key) as string;
        resultObj = JSON.parse(data);
      }
      return resultObj;
  }

  public setItemObject(key: string, data: object): void {
    if (this.localStorage) {
      this.localStorage.setItem(key, JSON.stringify(data));
    }
  }

}
