import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LlmService } from '../services/llm.service';

@Component({
  selector: 'app-verify-aff',
  templateUrl: './verify-aff.component.html',
  styleUrls: ['./verify-aff.component.css']
})
export class VerifyAffComponent implements OnInit {
  message:any = null
  click_btn: boolean = false;
  divorce_form!: FormGroup;
  constructor(private formbuilder: FormBuilder, private llmservice: LlmService){

  }
  ngOnInit(): void {
    this.divorce_form = this.formbuilder.group ({
      demandeur: ["",Validators.required,],
      epoux: ["",Validators.required,],
      dateMariage:["",Validators.required,],
      dateDemandeDivorce:["",Validators.required,],
      status_enfant:["",Validators.required,],
      nombre_enfants: ["",],
      typede_divorce: ["",Validators.required,],
      causeDivorce: ["",Validators.required,],
      salaire_mensuel : ["Dhs",Validators.required,],
    })

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
  

}
