import { ActivatedRoute, Router }     from '@angular/router';
import {  Component, OnInit, inject } from '@angular/core';
import { switchMap }                  from 'rxjs';

import { Format }         from '../../../interfaces/format.interface';
import { FormatService }  from '../../../services/format.service';

@Component({
  selector:     'app-format-page',
  templateUrl:  './format-page.component.html',
  styleUrl:     './format-page.component.css',

})
export class FormatPageComponent implements OnInit {

  public format?:Format;
  public isLoadin:boolean = false;

  private activatedRoute  = inject( ActivatedRoute );
  private formatService   = inject( FormatService );
  private router          = inject( Router );

  ngOnInit(): void {
    this.isLoadin = true;
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.formatService.getFormatById(id))
    )
    .subscribe((format) =>{
      if(!format){
        return this.router.navigateByUrl('')
      }
      this.isLoadin = false;
      return this.format = format;
    });
  }
 }
