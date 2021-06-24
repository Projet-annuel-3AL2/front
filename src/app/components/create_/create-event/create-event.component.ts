import { Component, OnInit } from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../services/user/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../shared/models/category.model";
import {Media} from "../../../shared/models/media.model";
import {CategoryService} from "../../../services/category/category.service";
import {Organisation} from "../../../shared/models/organisation.model";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {Event} from "../../../shared/models/event.model";
import {EventService} from "../../../services/event/event.service";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  showPopup: boolean = false;
  user$: User;
  listOrganisation$: Organisation[];
  listCategory$: Category[];

  formData: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  limitParticipant =  new FormControl(2, Validators.min(2));



  constructor(private _userService: UserService,
              private _authService: AuthService,
              private _categoryService: CategoryService,
              private _organisationService: OrganisationService,
              private _eventService: EventService
              ) {
  }

  ngOnInit(): void {

    this.initialiseFormGroup();
    this._userService.getById(this._authService.getCurrentUserId()).subscribe(user=>{
      this.user$=user;
    });
    // TODO: Récupération via base pas activé
    // this.getAllCategories();
    // this.getListOrganisation();
  }


  openPopup() {
    this.showPopup = true;
    document.querySelector("body").classList.add("no-scroll");
  }

  closePopup() {
    this.showPopup = false;
    document.querySelector("body").classList.remove("no-scroll");
  }

  private getAllCategories() {
    this._categoryService.getAllCategory().subscribe(categories => {
      this.listCategory$ = categories
    })
  }

  private getListOrganisation() {
    this._organisationService.getAllOrgaWhereUserCanCreateEvent(this.user$.id).subscribe(organisations => {
      this.listOrganisation$ = organisations
    })
  }

  // TODO: add SelectFile on formGroup
  private initialiseFormGroup() {
    this.formData = new FormGroup({
      nameEvent: new FormControl(),
      descriptionEvent: new FormControl(),
      startDateEvent: new FormControl(),
      endDateEvent: new FormControl(),
      latitudeEvent: new FormControl(),
      longitudeEvent: new FormControl(),
      participantsLimitEvent: new FormControl(),
      categoryEvent: new FormControl(),
      pictureEvent: new FormControl(),
      organisationEvent: new FormControl(),
    });
  }

  onClickSubmit(data) {
    let newEvent: Event = new Event();
    newEvent.name = data.nameEvent;
    newEvent.description = data.descriptionEvent;
    newEvent.startDate = data.startDateEvent;
    newEvent.endDate = data.endDateEvent;
    newEvent.latitude = data.latitudeEvent;
    newEvent.longitude = data.longitudeEvent;
    newEvent.participantsLimit = data.participantsLimitEvent;
    newEvent.category = data.categoryEvent;
    newEvent.creator = this.user$;
    newEvent.picture = data.pictureFile;
    newEvent.organisation = data.organisationEvent != null?data.organisationEvent:null;
    console.log(newEvent);
    // TODO : Create-Event on submit pas activé
    // this.eventService.postEvent(newEvent);
  }
}
