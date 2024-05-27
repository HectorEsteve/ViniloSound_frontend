import { Component, OnInit, inject } from '@angular/core';
import { FormatService } from '../../../../music/services/format.service';
import { Format } from '../../../../music/interfaces/format.interface';

@Component({
  selector: 'app-admin-format-page',
  templateUrl: './admin-format-page.component.html',
  styleUrl: './admin-format-page.component.css',
})
export class AdminFormatPageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.searchFormats();
  }

  private formatService = inject( FormatService );

  public isLoading: boolean = false;
  public formats: Format[] = [];

  public searchFormats():void{
    this.isLoading = true;

    this.formatService.getFormats()
      .subscribe(formats => {
        this.formats = formats;
        this.isLoading = false;
      });
  }
}
