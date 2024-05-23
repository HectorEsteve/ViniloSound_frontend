import { ActivatedRoute, Router }     from '@angular/router';
import { Component, OnInit, inject }  from '@angular/core';
import { switchMap }                  from 'rxjs';

import { Collection }         from '../../../interfaces/collection-interface';
import { CollectionService }  from '../../../services/collection.service';

@Component({
  selector:     'app-collection-page',
  templateUrl:  './collection-page.component.html',
  styleUrl:     './collection-page.component.css',

})
export class CollectionPageComponent implements OnInit {

  public collection?:Collection;
  public isLoadin:boolean = false;

  private activatedRoute      = inject( ActivatedRoute );
  private collectionService   = inject( CollectionService );
  private router              = inject( Router );

  ngOnInit(): void {
    this.isLoadin = true;
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.collectionService.getCollectionById(id))
    )
    .subscribe((collection) =>{
      if(!collection){
        return this.router.navigateByUrl('')
      }
      this.isLoadin = false;
      return this.collection = collection;
    });
  }
}
