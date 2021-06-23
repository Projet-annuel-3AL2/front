import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {CategoryService} from "../../../services/category/category.service";
import {OrganisationService} from "../../../services/organisation/organisation.service";
import {User} from "../../../shared/models/user.model";
import {Organisation} from "../../../shared/models/organisation.model";
import {Category} from "../../../shared/models/category.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Event} from "../../../shared/models/event.model";
import {EventService} from "../../../services/event/event.service";

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  @Input('event') event: Event;
  user$: User;
  listCategory$: Category[];
  listOrganisation$: Organisation[];
  formData: FormGroup;
  showPopup: boolean;
  limitParticipant =  new FormControl(2, Validators.min(2));

  constructor(private userService: UserService,
              private categoryService: CategoryService,
              private organisationService: OrganisationService,
              private eventService: EventService,
              // private authService: AuthService
              ) { }

  ngOnInit(): void {
    this.user$ = this.userService.fakeGetUser('fakeData');
    this.listCategory$ = this.categoryService.fakeGetAllCategories();
    this.initialiseFormGroup();
    this.listOrganisation$ = [this.organisationService.fakeGetOrganisation(), this.organisationService.fakeGetOrganisation()];
    // this.userService.getById(this.authService.getCurrentUserId()).subscribe(user=>{
    //   this.user=user;
    // });
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
      pictureFile: new FormControl(),
      organisationEvent: new FormControl(),
    });

  }

  private getAllCategories() {
    this.categoryService.getAllCategory().subscribe(categories => {
      this.listCategory$ = categories
    })
  }

  private getListOrganisation() {
    this.organisationService.getAllOrgaWhereUserCanCreateEvent(this.user$.id).subscribe(organisations => {
      this.listOrganisation$ = organisations
    })
  }

  // TODO : J'ai peur qu'il y ait un problème sur le principe que this.event à des relation genre members et que ça cause des problèmes avec l'update
  onClickSubmit(data) {
    this.event.name = data.nameEvent;
    this.event.description = data.descriptionEvent;
    this.event.startDate = data.startDateEvent;
    this.event.endDate = data.endDateEvent;
    this.event.latitude = data.latitudeEvent;
    this.event.longitude = data.longitudeEvent;
    this.event.participantsLimit = data.participantsLimitEvent;
    this.event.category = data.categoryEvent;
    this.event.creator = this.user$;
    this.event.picture = data.pictureFile;
    this.event.organisation = data.organisationEvent != null?data.organisationEvent:null;
    console.log(this.event);
    // this.eventService.putEvent(this.event);
  }
}
