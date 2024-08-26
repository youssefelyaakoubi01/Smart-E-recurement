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

  style:any="hidden"
  offres:Offre[]=[{
    description:"test test test ",
    categorie:"test test test "
  },{
    description:"test test test ",
    categorie:"test test test "
  },
  {
    description:"test test test ",
    categorie:"test test test "
  },
  {
    description:"test test test ",
    categorie:"test test test "
  },
  {
    description:"test test test ",
    categorie:"test test test "
  },

];
  lireplus!:boolean;
  btn_click!:boolean;
  offreChoisi!:Offre;
  statusCommande:boolean = false;


  public file: File | null = null;
  constructor(private offresServices:OffresService, ){
   
  }
  ngOnInit() {
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
          if(resultat){
            this.offres = [];
            for( let offre of resultat){
              this.offres.push(offre)
            }
            console.log(this.offres)

          }

          
        },
        (err)=>{
          console.error(err)
        }
      )
 
 
  }
}
  
postuler(offre: any) {
  this.offreChoisi  = offre;
  this.style= "block"
  
  
}
startCount() {
  this.statusCommande = false;
  setTimeout(() => {
    this.statusCommande = true;
  }, 3000);
  }

}
