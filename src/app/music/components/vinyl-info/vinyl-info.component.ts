import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Vinyl } from '../../interfaces/vinyl.interface';
import { BandService } from '../../services/band.service';
import { Genre } from '../../interfaces/genre.interface';
import { Song } from '../../interfaces/song.interface';
import { Band } from '../../interfaces/band.interface';
import { environments } from '../../../../environments/environments';
import { SongCardsComponent } from '../song-card/song-cards.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { BandCardComponent } from '../band-card/band-card.component';
import { Format } from '../../interfaces/format.interface';
import { FormatCardComponent } from '../format-card/format-card.component';
import { RecordCompany } from '../../interfaces/record-companies.interface';
import { RecordCompanyCardComponent } from '../record-company-card/record-company-card.component';
import { UserService } from '../../../auth/service/user.service';
import { User } from '../../../auth/interfaces/user.interface';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector:     'vinyl-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SongCardsComponent,
    GenreCardComponent,
    BandCardComponent,
    FormatCardComponent,
    RecordCompanyCardComponent,
    ConfirmDialogComponent
  ],
  templateUrl:  './vinyl-info.component.html',
  styleUrl:     './vinyl-info.component.css',
})
export class VinylInfoComponent implements OnInit{
  ngOnInit(): void {
    this.tempRout = environments.tempRoutVinyl;

    for(let band of this.vinyl.bands){
      this.bandService.searchBandsByName(band.name).
        subscribe(
          (bands: Band[]) => {
            this.bands.push(...bands);
          });
    }

    for (const song of this.vinyl.songs) {
      this.songs.push(song);
      const existingGenre = this.genres.find(genre => genre.id === song.genre.id);
      if (!existingGenre) {
        this.genres.push(song.genre);
      };
    }

    this.formats.push(this.vinyl.format);
    this.recordCompanies.push(this.vinyl.record_company);


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

  }

  public tempRout:string='';

  private bandService = inject( BandService );
  private router        = inject( Router );
  private userService   = inject( UserService );

  @Input()
  public vinyl!: Vinyl;

  @Input()
  public myCollection!: boolean;

  public genres: Genre[] = [];
  public songs: Song[] = [];
  public bands: Band[] = [];
  public formats: Format[] = [];
  public recordCompanies: RecordCompany[] = [];

  public user: User | null = null;
  public existsUser: boolean = false;
  public existsCollection: boolean = false;
  public vinylsCollection: Vinyl [] | null = null;

  public isConfirmDialogOpen = false;
  public confirmDialogMessage = '';
  private currentVinylId!: number;

  public existsInCollection (id : number): boolean{
    if (this.vinylsCollection && this.vinylsCollection.length === 0) return false;
    return this.vinylsCollection!.some(vinyl => vinyl.id === id);
  }

  public addVinylToCollection(userId: number, vinylId: number): void{
    this.userService.addVinylToUserCollection(userId, vinylId)
     .subscribe(() => {
        this.vinylsCollection!.push(this.vinyl);
      });
  }
  public openConfirmDialog(vinylId: number): void {
    this.confirmDialogMessage = '¿Estás seguro de que quieres eliminar este vinilo de tu colección?';
    this.isConfirmDialogOpen = true;
    this.currentVinylId = vinylId;
  }

  public handleConfirm(confirmed: boolean): void {
    if (confirmed && this.currentVinylId !== null) {
      this.userService.removeVinylFromUserCollection(this.user!.collection!.id, this.currentVinylId).subscribe(() => {
        this.vinylsCollection = this.vinylsCollection!.filter(vinyl => vinyl.id !== this.currentVinylId);
        this.router.navigate(['/user/my-collection']);
      });
    }
    this.isConfirmDialogOpen = false;
  }

}
