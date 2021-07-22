import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {GroupService} from "../../../services/group/group.service";
import {User} from "../../../shared/models/user.model";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.css']
})
export class CreateGroupDialogComponent implements OnInit {
  groupForm: FormGroup;
  private addedUsers: User[] = [];

  constructor(private formBuilder: FormBuilder,
              public _authService: AuthService,
              private _groupService: GroupService,
              public dialogRef: MatDialogRef<CreateGroupDialogComponent>,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
  }

  addUser(user:User) {
    this.addedUsers.push(user);
  }

  removeUser(user:User) {
    this.addedUsers=this.addedUsers.filter(usr=>usr.id !== user.id);
  }

  inList(user:User): boolean {
    return this.addedUsers.some(usr=>usr.id === user.id);
  }

  private initForm() {
    this.groupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    });
  }

  onSubmit() {
    if(this.addedUsers.length < 2 ){
      this.snackBar.open("Vous devez ajouter au moins deux utilisateurs au groupe","Fermer");
      return;
    }
    const formValue = this.groupForm.value;
    console.log(formValue.name)
    console.log(this.addedUsers)
    this._groupService.create(formValue.name, this.addedUsers)
      .subscribe(() => this.dialogRef.close());
  }
}
