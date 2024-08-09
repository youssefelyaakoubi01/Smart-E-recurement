import { Component, OnInit } from '@angular/core';
import { OffresService } from '../services/offres.service';
import { Offre } from '../models/offre';
import * as pdfjsLib from 'pdfjs-dist';
@Component({
  selector: 'app-search-offers',
  templateUrl: './search-offers.component.html',
  styleUrls: ['./search-offers.component.css']
})
export class SearchOffersComponent implements OnInit {
  offres!:Offre[];
  lireplus!:boolean;
  btn_click!:boolean;


  public file: File | null = null;
  constructor(private offresServices:OffresService, ){
   
  }
  ngOnInit() {
     this.offres= this.offresServices.offres;
     this.lireplus= false;
     this.btn_click= false;
     

  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
 
  }
  onUpload() {
 
    if (this.file) {
      this.btn_click= true;
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      this.offresServices.searchOffers(formData).subscribe(
        (resultat)=>{
          this.offres = resultat
        },
        (err)=>{
          console.error(err)
        }
      )
 
 
  }
}
  
  
}
