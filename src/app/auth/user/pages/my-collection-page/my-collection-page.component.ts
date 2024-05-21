import { Component, OnInit,  inject } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-my-collection-page',
  templateUrl: './my-collection-page.component.html',
  styleUrl: './my-collection-page.component.css',

})
export class MyCollectionPageComponent implements OnInit{
  ngOnInit(): void {
    this.user = this.userService.currentUser;
    if (this.user) {
      this.checkCollectionExists();
    }
  }

  private checkCollectionExists(): void {
    console.log(this.user!.collection);
    this.existsCollection = !!(this.user && this.user.collection);
  }

  public existsCollection: boolean = false;
  public user! : User |null;

  private userService       = inject(UserService);

  onCancelUpdateForm() {
    this.existsCollection = true;
  }

}
