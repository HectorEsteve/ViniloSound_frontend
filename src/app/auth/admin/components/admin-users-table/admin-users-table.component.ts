import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-admin-users-table',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './admin-users-table.component.html',
  styleUrl: './admin-users-table.component.css',
})

export class AdminUsersTableComponent implements OnChanges {

  @Input() users: User[] = [];

  public filteredUsers: User[] = [];
  public connectedUsersCount = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && changes['users'].currentValue) {
      this.filterUsers();
      this.updateConnectedUsersCount();
    }
  }

  private updateConnectedUsersCount(): void {
    this.connectedUsersCount = this.filteredUsers.filter(user => user.connected).length;
  }

  private filterUsers(): void {
    this.filteredUsers = this.users.filter(user => user.id !== 1);
  }

  public isAdmin(user: User): boolean {
    return user.roles && user.roles.some(role => role.id === 4);
  }
}
