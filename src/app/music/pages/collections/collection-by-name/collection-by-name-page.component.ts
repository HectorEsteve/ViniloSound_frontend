import { Component, OnInit, inject } from '@angular/core';
import { CollectionService } from '../../../services/collection.service';
import { Collection } from '../../../interfaces/collection-interface';

@Component({
  selector:     'app-collection-by-name-page',
  templateUrl:  './collection-by-name-page.component.html',
  styleUrl:     './collection-by-name-page.component.css',

})
export class CollectionByNamePageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.initialValue = this.collectionService.cacheStoreCollection.byName.term;

    if(this.initialValue ===''){
      this.collectionService.getRandomCollections(20)
      .subscribe(collections => {
        this.collections = collections;
        this.isLoading = false;
      });
    }else{
    this.collectionService.searchCollectionsByName(this.initialValue)
      .subscribe(collections => {
        this.collections = collections;
        this.isLoading = false;
      });
    }
  }

  private collectionService = inject( CollectionService );

  public collections: Collection[] = [];
  public initialValue='';
  public isLoading:boolean = false;

  public clearCache(): void {
    this.collections=[];
    this.initialValue='';
    this.collectionService.resetFromLocalStorageByName();
  }

  public searchByName(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.collectionService.searchCollectionsByName(term)
      .subscribe(collections => {
        this.collections = collections;
        this.isLoading = false;
      });
  }
 }
