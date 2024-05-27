import { Component, OnInit, inject } from '@angular/core';

import { User }         from '../../../interfaces/user.interface';
import { UserService }  from '../../../service/user.service';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrl: './admin-users-page.component.css',
})

export class AdminUsersPageComponent implements OnInit {
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
