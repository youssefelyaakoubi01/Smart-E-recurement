import { Component, OnInit } from '@angular/core';
import { OffresService } from '../services/offres.service';
import { Offre } from '../models/offre';
import { initFlowbite, Modal } from 'flowbite';

@Component({
  selector: 'app-search-offers',
  templateUrl: './search-offers.component.html',
  styleUrls: ['./search-offers.component.css'],
})
export class SearchOffersComponent implements OnInit {
  private modalInstance: Modal | null = null;
  style: any = 'hidden';
  offres: Offre[]=[];
  lireplus!: boolean;
  btn_click!: boolean;;
  offreChoisi: any = '';
  statusCommande: boolean = false;
  pourcentage: number = 0;
  numbers = [0,10, 25, 30, 45, 70, 85, 100];

  public file: File | null = null;
  constructor(private offresServices: OffresService) {}
  ngOnInit() {
    this.lireplus = false;
    
    initFlowbite();
    
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  onUpload() {
    if (this.file) {
      this.btn_click = true;
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      this.offresServices.searchOffers(formData).subscribe({
        next:resultat => {
          if (resultat) {
            
            
          this.offres = resultat;

            
            console.log(this.offres);
          }
        },
        error:err => {
          console.error(err);
        }
      
      });
    }
  }

  postuler(offre: any) {
 
    this.offreChoisi = offre;
    console.log(offre);
    const modal = document.getElementById('large-modal');
    if (modal) {
      this.modalInstance = new Modal(modal);
      this.modalInstance.show();
    }
    
  }
  hideModal(){
    const modal = document.getElementById('large-modal');
    if (modal) {
      this.modalInstance = new Modal(modal);
      this.modalInstance.hide();
    }
    

  }
  startCount() {
    this.statusCommande = true;
    this.numbers.forEach((i, index) => {
      setTimeout(() => {
        console.log(i);
        this.pourcentage = i;
      }, 1000 * index);
    });
  }
  changeStatus(){
    this.statusCommande = false;

  }
}
