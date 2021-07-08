import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {SearchResult} from "../../shared/models/search.model";
import {FormControl} from "@angular/forms";
import {SearchService} from "../../services/search/search.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  faSearch = faSearch;
  searchControl = new FormControl();
  searchResult: SearchResult;

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
  }

  searchData($event: any): void {
    if($event.target.value === undefined || $event.target.value === ''){
      this.searchResult = undefined;
      return;
    }
    this.searchService.searchData($event.target.value)
      .subscribe(searchResult => {
        this.searchResult = searchResult;
        console.log(searchResult)
      });
  }

}
