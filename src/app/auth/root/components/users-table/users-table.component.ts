import { CommonModule }                                               from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';

import { Name, User }             from '../../../interfaces/user.interface';
import { UserService }            from '../../../service/user.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialogComponent
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})

export class UsersTableComponent implements OnChanges, OnInit {
  @Input() users: User[] = [];
  public filteredUsers: User[] = [];

  public showConfirmDialog = false;
  public confirmMessage = '';
  private userIdToDelete: number | null = null;
  public connectedUsersCount = 0;

  private userService = inject( UserService );

  ngOnInit(): void {
    this.filterUsers();
    this.updateConnectedUsersCount();
  }

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

  public isUser(user: User): boolean {
    return user.roles && user.roles.some(role => role.id === 1);
  }

  public ascendToAdmin(userId: number): void {
    this.userService.ascendToAdmin(userId).subscribe(response => {
      this.updateUserRoles(userId, Name.Admin);
    });
  }

  public degradeToUser(userId: number): void {
    this.userService.degradeToUser(userId).subscribe(response => {
      this.updateUserRoles(userId, Name.User);
    });
  }

  private updateUserRoles(userId: number, roleName: Name): void {
    const user = this.filteredUsers.find(u => u.id === userId);
    if (user) {
      if (roleName === Name.Admin) {
        if (!user.roles.some(role => role.name === Name.Admin)) {
          user.roles.push({
            id: 4,
            name: Name.Admin,
            created_at: new Date(),
            updated_at: new Date(),
            pivot: { user_id: user.id, rol_id: 4 }
          });
        }
      } else if (roleName === Name.User) {
        user.roles = user.roles.filter(role => role.name !== Name.Admin);
      }
    }
  }

  public confirmDelete(userId: number): void {
    this.userIdToDelete = userId;
    this.confirmMessage = '¿Está seguro de que desea eliminar este usuario?';
    this.showConfirmDialog = true;
  }

  public handleConfirm(confirm: boolean): void {
    if (confirm && this.userIdToDelete !== null) {
      this.deleteUser(this.userIdToDelete);
    }
    this.showConfirmDialog = false;
    this.userIdToDelete = null;
  }

  public deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      response => {
        console.log('Usuario eliminado:', response);
        this.filteredUsers = this.filteredUsers.filter(user => user.id !== userId);
      });
  }

}
