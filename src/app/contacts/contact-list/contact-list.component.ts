import {Component, OnInit} from '@angular/core';
import {TreeTableModule} from "primeng/treetable";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    TreeTableModule,
    TranslateModule,
    ButtonModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {

  public ngOnInit(): void {

  }

  public onCreateContact(): void {
    console.log('onCreateContact');
  }

}
