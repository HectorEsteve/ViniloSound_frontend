import { Component, OnInit,  inject } from '@angular/core';

import { CollectionService }  from '../../../../music/services/collection.service';
import { User }               from '../../../interfaces/user.interface';
import { UserService }        from '../../../service/user.service';
import { Vinyl }              from '../../../../music/interfaces/vinyl.interface';

@Component({
  selector:     'app-my-collection-page',
  templateUrl:  './my-collection-page.component.html',
  styleUrl:     './my-collection-page.component.css',
})

export class MyCollectionPageComponent implements OnInit{
  ngOnInit(): void {
    this.user = this.userService.currentUser;
    if (this.user) {
      this.checkCollectionExists();
      if(this.user!.collection) this.vinylsCollection();
    }
  }

  private checkCollectionExists(): void {
    this.existsCollection = !!(this.user && this.user.collection);
  }

  public existsCollection: boolean = false;
  public vinyls :Vinyl[] = [];
  public user! : User |null;

  private userService            = inject(UserService);
  private collectionService      = inject(CollectionService);

  onCancelUpdateForm() {
    this.existsCollection = true;
  }
  onUserUpdated(user: User): void {
    this.user = user;
    if(this.user!.collection) this.vinylsCollection();
  }

  public vinylsCollection(): Vinyl[] {
    let vinyls: Vinyl[] = [];
    this.collectionService.getCollectionById(this.user!.collection!.id)
        .subscribe(collection => {
            this.vinyls = collection.vinyls;
            vinyls = this.vinyls ? this.vinyls : [];
        });
    return vinyls;
  }

}
