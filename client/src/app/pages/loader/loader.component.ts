// loader.component.ts

import { Component } from '@angular/core';

import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: [ './loader.component.scss' ],
})
export class LoaderComponent {
  isLoading: boolean = false
 
  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((res)=>{
      this.isLoading = res
    })
    console.log("isloading",  this.isLoading )
  }
}
