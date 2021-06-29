import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EventDialogData} from "../../event_/event-filter/event-filter.component";

@Component({
  selector: 'app-event-dialog-maps',
  templateUrl: './event-dialog-maps.component.html',
  styleUrls: ['./event-dialog-maps.component.css']
})
export class EventDialogMapsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EventDialogMapsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EventDialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
