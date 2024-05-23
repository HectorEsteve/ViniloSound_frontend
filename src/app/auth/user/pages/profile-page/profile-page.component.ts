import { Component, OnInit, inject} from '@angular/core';

import { User }         from '../../../interfaces/user.interface';
import { UserService }  from '../../../service/user.service';

@Component({
  selector:     'app-profile-page',
  templateUrl:  './profile-page.component.html',
  styleUrl:      './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  ngOnInit(): void {
    this.user = this.userService.cacheStoreUser.user;
  }

  private userService = inject(UserService);

  public user! : User | null;
  public showForm: boolean = false;
  public showEditForm: boolean = false;
  public showDeleteForm: boolean = false;

  public changeView(): void {
    this.showForm =!this.showForm;
    this.showEditForm =!this.showEditForm;
  }

  public deleteView(): void {
    this.showForm =!this.showForm;
    this.showDeleteForm =!this.showDeleteForm;
  }

  public onCancelUpdateForm() {
    this.showForm = false;
    this.showEditForm = false;
  }

  public onCancelDeleteForm() {
    this.showForm = false;
    this.showDeleteForm = false;
  }

  public onUserUpdated(user: User): void {
    this.user = user;
  }
}

