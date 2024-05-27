import { Component, OnInit, inject } from '@angular/core';

import { RolService } from '../../../service/role.service';
import { Name, Role } from '../../../interfaces/role.interface';

@Component({
  selector: 'app-root-roles-page',
  templateUrl: './root-roles-page.component.html',
  styleUrl: './root-roles-page.component.css',
})

export class RootRolesPageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.loadRoles();
  }

  private roleService = inject( RolService );

  public isLoading: boolean = false;
  public roles: Role[] = [];
  public newRoleName: string = '';
  public showAddRoleForm: boolean = false;
  public showConfirmDialog: boolean = false;
  public confirmMessage: string = '';
  private roleIdToDelete: number | null = null;

  public loadRoles(): void {
    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles;
      this.roles.forEach(role => role.editing = false);
      this.isLoading = false;
    });
  }

  public confirmDelete(id: number): void {
    this.confirmMessage = '¿Estás seguro de que deseas eliminar este rol?';
    this.showConfirmDialog = true;
    this.roleIdToDelete = id;
  }

  public handleConfirm(confirmed: boolean): void {
    if (confirmed && this.roleIdToDelete !== null) {
      this.deleteRole(this.roleIdToDelete);
    }
    this.showConfirmDialog = false;
  }

  public deleteRole(id: number): void {
    this.roleService.deleteRole(id).subscribe(() => {
      this.roles = this.roles.filter((role) => role.id !== id);
    });
  }

  public addRole(): void {
    if (this.newRoleName.trim()) {
      this.roleService.createRole({ name: this.newRoleName } as Role).subscribe((createdRole) => {
        this.roles.push(createdRole);
        this.newRoleName = '' as Name;
        this.showAddRoleForm = false;
      });
    }
  }

  public editRole(role: Role): void {
    role.editing = true;
  }

  public cancelEdit(role: Role): void {
    role.editing = false;
    this.loadRoles();
  }

  public updateRole(role: Role): void {
    if (role.name.trim()) {
      this.roleService.updateRole(role.id, role).subscribe((updatedRole) => {
        Object.assign(role, updatedRole);
        role.editing = false;
      });
    }
  }

  public toggleAddRoleForm(): void {
    this.showAddRoleForm = !this.showAddRoleForm;
  }

}
