import { Component, OnInit, inject } from '@angular/core';

import { Collection }         from '../../../interfaces/collection-interface';
import { CollectionService }  from '../../../services/collection.service';

@Component({
  selector:     'app-collection-by-band-page',
  templateUrl:  './collection-by-band-page.component.html',
  styleUrl:     './collection-by-band-page.component.css',
})

export class CollectionByBandPageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.initialValue = this.collectionService.cacheStoreCollection.byBand.term;

    if(this.initialValue ===''){
      this.collectionService.getRandomCollections(20)
      .subscribe(collections => {
        this.collections = collections;
        this.isLoading = false;
      });
    }else{
    this.collectionService.searchCollectionsByBand(this.initialValue)
      .subscribe(collections => {
        this.collections = collections;
        this.isLoading = false;
      });
    }
  }

  private collectionService = inject( CollectionService );

  public collections: Collection[]  = [];
  public isLoading:boolean          = false;
  public initialValue='';

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
