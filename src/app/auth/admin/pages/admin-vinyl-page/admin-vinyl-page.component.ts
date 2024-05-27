import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { VinylService } from '../../../../music/services/vinyl.service';
import { Vinyl } from '../../../../music/interfaces/vinyl.interface';

@Component({
  selector: 'app-admin-vinyl-page',
  templateUrl: './admin-vinyl-page.component.html',
  styleUrl: './admin-vinyl-page.component.css',
})
export class AdminVinylPageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.vinylService.searchVinylsByName('')
      .subscribe(vinyls => {
        this.vinyls = vinyls;
        this.isLoading = false;
      });
  }

  private vinylService = inject( VinylService );

  public isLoading: boolean = false;
  public vinyls: Vinyl[] = [];
  public initialValue='';

  public clear(): void {
    this.vinyls=[];
    this.initialValue='';
  }

  public searchByName(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.vinylService.searchVinylsByName(term)
      .subscribe(vinyls => {
        this.vinyls = vinyls;
        this.isLoading = false;
      });
  }
}
