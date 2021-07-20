import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../services/navigation/navigation.service";

@Component({
  selector: 'app-return-button',
  templateUrl: './return-button.component.html',
  styleUrls: ['./return-button.component.css']
})
export class ReturnButtonComponent implements OnInit {

  constructor(private _navigationService: NavigationService) {
  }

  ngOnInit(): void {
  }

  back(): void {
    this._navigationService.back()
  }

}
