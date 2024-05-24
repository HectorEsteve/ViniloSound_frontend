import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-root-users-page',
  templateUrl: './root-users-page.component.html',
  styleUrl: './root-users-page.component.css',
})
export class RootUsersPageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.userService.searchUsersByName('')
      .subscribe(users => {
        this.users = users;
        this.isLoading = false;
      });
  }

  private userService = inject( UserService );

  public isLoading: boolean = false;
  public users: User[]      = [];
  public initialValue='';

  public clear(): void {
    this.users=[];
    this.initialValue='';
  }

  public searchByName(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.userService.searchUsersByName(term)
      .subscribe(users => {
        this.users = users;
        this.isLoading = false;
      });
  }
}
