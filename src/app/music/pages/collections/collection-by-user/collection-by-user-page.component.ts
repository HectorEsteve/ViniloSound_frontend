import {  Component, OnInit, inject } from '@angular/core';

import { Collection }         from '../../../interfaces/collection-interface';
import { CollectionService }  from '../../../services/collection.service';

@Component({
  selector:     'app-collection-by-user-page',
  templateUrl:  './collection-by-user-page.component.html',
  styleUrl:     './collection-by-user-page.component.css',
})

export class CollectionByUserPageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.initialValue = this.collectionService.cacheStoreCollection.byUser.term;

    if(this.initialValue ===''){
      this.collectionService.getRandomCollections(20)
      .subscribe(collections => {
        this.collections = collections;
        this.isLoading = false;
      });
    }else{
    this.collectionService.searchCollectionByUser(this.initialValue)
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
    this.collectionService.resetFromLocalStorageByUser();
  }

  public searchByUser(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.collectionService.searchCollectionByUser(term)
      .subscribe(collections => {
        this.collections = collections;
        this.isLoading = false;
      });
  }
 }
