import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LlmService } from '../services/llm.service';

import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-affaire',
  templateUrl: './affaire.component.html',
  styleUrls: ['./affaire.component.css']
})
export class AffaireComponent {


  message:any = null
  click_btn: boolean = false;
  divorce_form!: FormGroup;
  classPre!: string;
  classSuiv: string = "hidden";

  constructor(private formbuilder: FormBuilder, private llmservice: LlmService){

  }
  ngOnInit(): void {
    this.divorce_form = this.formbuilder.group({
      date: ['', Validators.required],
      cour: ['', Validators.required],
      section: ['', Validators.required],
      sujet: ['', Validators.required],
      nomMari: ['', Validators.required],
      dateNaissanceMari: ['', Validators.required],
      numCarteMari: ['', Validators.required],
      nomFemme: ['', Validators.required],
      dateNaissanceFemme: ['', Validators.required],
      numCarteFemme: ['', Validators.required],
      numContratMariage: ['', Validators.required],
      dateMariage: ['', Validators.required],
      numEnregistrementMariage: ['', Validators.required],
      nomPresidentCour: ['', Validators.required],
      signatureMari: ['', Validators.required],
      signatureFemme: ['', Validators.required]
    });
    

  }

  toSubmit(){
    console.log(JSON.stringify(this.divorce_form.value) );
    let situation = `Je suis ${this.divorce_form.value.demandeur}, j'ai marié ${this.divorce_form.value.epoux} le ${this.divorce_form.value.dateMariage}. 
      Je demande le divorce le ${this.divorce_form.value.dateDemandeDivorce}. Le type de divorce que je demande est ${this.divorce_form.value.typede_divorce}. 
      La cause de divorce est ${this.divorce_form.value.causeDivorce}].et mon salire mansuel est ${this.divorce_form.value.salaire_mensuel}
        Nous avons ${this.divorce_form.value.nombre_enfants} enfants.`
    this.llmservice.Askllm(situation).subscribe(decision=>{
     if(decision){
      this.click_btn= false;
      this.message = decision
     }
      
    })   
  }
  changeStatus(){
    this.click_btn = true;
    this.message = null

  }
  suivant(){
    this.classPre = "hidden"
    this.classSuiv = ""
  }
  precedent(){
    this.classPre = ""
    this.classSuiv = "hidden"
  }

  imprimer(){
    var element = document.getElementById('printSection');
    const opt = {
      filename: 'affaire.pdf',
      margin: 10,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 10 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  }

   


 
}
  


