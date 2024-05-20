import { Component, OnInit, inject } from '@angular/core';
import { Collection } from '../../../interfaces/collection-interface';
import { CollectionService } from '../../../services/collection.service';

@Component({
  selector: 'app-collection-by-vinyl-page',
  templateUrl: './collection-by-vinyl-page.component.html',
  styleUrl: './collection-by-vinyl-page.component.css',

})
export class CollectionByVinylPageComponent implements OnInit {
  ngOnInit(): void {
    this.isLoading = true;
    this.initialValue = this.collectionService.cacheStoreCollection.byVinyl.term;

    if(this.initialValue ===''){
      this.collectionService.getRandomCollections(20)
      .subscribe(collections => {
        this.collections = collections;
        this.isLoading = false;
      });
    }else{
    this.collectionService.searchCollectionByVinyl(this.initialValue )
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
    this.collectionService.resetFromLocalStorageByVinyl();
  }

  public searchByVinyl(term:string):void{
    this.isLoading = true;
    this.initialValue = term;

    this.collectionService.searchCollectionByVinyl(term)
      .subscribe(collections => {
        this.collections = collections;
        this.isLoading = false;
      });
  }
 }
