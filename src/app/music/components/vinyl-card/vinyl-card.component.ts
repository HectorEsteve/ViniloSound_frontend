import { CommonModule }                     from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterModule }             from '@angular/router';

import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { environments }           from '../../../../environments/environments';
import { User }                   from '../../../auth/interfaces/user.interface';
import { UserService }            from '../../../auth/service/user.service';
import { Vinyl }                  from '../../interfaces/vinyl.interface';

import { MaxLengthStringPipe } from '../../pipe/max-length-string.pipe';

@Component({
  selector:     'app-vinyl-card',
  standalone:   true,
  imports: [
    CommonModule,
    RouterModule,
    MaxLengthStringPipe,
    ConfirmDialogComponent

  ],
  templateUrl:  './vinyl-card.component.html',
  styleUrl:     './vinyl-card.component.css',
})

export class VinylCardComponent implements OnInit {
  ngOnInit(): void {
    environments.tempRoutVinyl=this.router.url;

    if(this.userService.currentUser){
      this.user = this.userService.currentUser;
      this.existsUser = true;
      if(this.userService.currentUser.collection){
        this.existsCollection = true;
        if(this.userService.currentUser.collection!.vinyls){
          this.vinylsCollection = this.userService.currentUser.collection!.vinyls
        }
      }
    }
    if(this.router.url ==='/user/my-collection'){
      this.myCollection=true
    }else{
      this.myCollection=false
    }
  }

  private router        = inject( Router );
  private userService   = inject( UserService );

  public user: User | null = null;
  public existsUser: boolean = false;
  public existsCollection: boolean = false;
  public vinylsCollection: Vinyl [] | null = null;
  public myCollection: boolean = false;

  public isConfirmDialogOpen = false;
  public confirmDialogMessage = '';
  private currentVinylId!: number;


  @Input()
  public vinyls: Vinyl[] = [];

  public existsInCollection (id : number): boolean{
    if (this.vinylsCollection && this.vinylsCollection.length === 0) return false;
    return this.vinylsCollection!.some(vinyl => vinyl.id === id);
  }

  public addVinylToCollection(userId: number, vinylId: number): void{
    this.userService.addVinylToUserCollection(userId, vinylId)
     .subscribe(() => {
        this.vinylsCollection!.push(this.vinyls.find(vinyl => vinyl.id === vinylId)!);
      });
  }
  public openConfirmDialog(userId: number, vinylId: number): void {
    this.confirmDialogMessage = '¿Estás seguro de que quieres eliminar este vinilo de tu colección?';
    this.isConfirmDialogOpen = true;
    this.currentVinylId = vinylId;
  }

  public handleConfirm(confirmed: boolean): void {
    if (confirmed) {
      this.userService.removeVinylFromUserCollection(this.user!.collection!.id, this.currentVinylId)
        .subscribe(() => {
          this.vinylsCollection = this.vinylsCollection!.filter(vinyl => vinyl.id !== this.currentVinylId);
          this.vinyls = this.vinyls.filter(vinyl => vinyl.id !== this.currentVinylId);
        });
    }
    this.isConfirmDialogOpen = false;
  }
}
