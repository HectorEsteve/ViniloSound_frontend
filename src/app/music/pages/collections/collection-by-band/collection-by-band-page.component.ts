import { Component, OnInit, inject } from '@angular/core';
import { CollectionService } from '../../../services/collection.service';
import { Collection } from '../../../interfaces/collection-interface';

@Component({
  selector: 'app-collection-by-band-page',
  templateUrl: './collection-by-band-page.component.html',
  styleUrl: './collection-by-band-page.component.css',

})
export class CollectionByBandPageComponent implements OnInit {
  ngOnInit(): void {
    this.collections = this.collectionService.cacheStoreCollection.byBand.collections;
    this.initialValue = this.collectionService.cacheStoreCollection.byBand.term;
  }

  private collectionService = inject( CollectionService );

  public collections: Collection[] = [];
  public initialValue='';
  public isLoading:boolean = false;

  public clearCache(): void {
    this.collections=[];
    this.initialValue='';
    this.collectionService.resetFromLocalStorageByBand();
  }

  public searchByBand(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.collectionService.searchCollectionsByBand(term)
      .subscribe(collections => {
        this.collections = collections;
        this.isLoading = false;
      });
  }
 }
