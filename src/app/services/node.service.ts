import { Injectable } from '@angular/core';
import {GroupsService} from "./groups.service";
import {ContactsService} from "./contacts.service";
import {IGroups} from "../model/i-groups";
import {IContacts} from "../model/i-contacts";

export interface ITreeView {
  data: ITreeViewData;
  children: ITreeViewChildData[];
}
export interface ITreeViewData {
  fullname: string;
  type: string;
}
export interface ITreeViewChildData {
  data?: ITreeViewChild
}
export interface ITreeViewChild {
  fullname: string;
  email: string;
  phone: string;
  group: string;
  tags: string[];
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(
    private groupsService: GroupsService,
    private contactsService: ContactsService
  ) {}

  public getContactNodesData(): Promise<ITreeView[]> {
    let groups: IGroups[] = this.groupsService.getGroups();
    let contacts: IContacts[] = this.contactsService.getContacts();

    let data: ITreeViewData;
    let result: ITreeView[] = [];

    for(const group of groups) {
      let childData: ITreeViewChildData = {};
      let children: ITreeViewChildData[] = [];
      data = {
        fullname: group.name,
        type: 'Group'
      }

      for (const contact of contacts) {
        if (contact.group === group.name) {
          childData = {
            data: {
              fullname: contact.fullname,
              email: contact.email,
              phone: contact.phone,
              group: contact.group,
              tags: contact.tags,
              type: 'Contact',
            }
          };
          children.push(childData);
        }
      }

      let item = {
        data: data,
        children: children
      }

      result.push(item);
    }

    return Promise.resolve(result);
  }

}
