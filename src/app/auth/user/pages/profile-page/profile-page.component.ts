import { Component, OnChanges, OnInit, SimpleChanges, inject} from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../interfaces/user.interface';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {

  ngOnInit(): void {
    this.user = this.userService.cacheStoreUser.user;
  }

  private userService       = inject(UserService);

  //showSuccessMessage: boolean = false;
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

  onCancelUpdateForm() {
    this.showForm = false;
    this.showEditForm = false;
  }

  onCancelDeleteForm() {
    this.showForm = false;
    this.showDeleteForm = false;
  }


  onUserUpdated(user: User): void {
    this.user = user;
  }




}

