import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LlmService } from '../services/llm.service';
import { Message } from '../models/message';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-llm',
  templateUrl: './chat-llm.component.html',
  styleUrls: ['./chat-llm.component.css'],
})
export class ChatLlmComponent implements OnInit {
  chat_form!: FormGroup;
  response!: any;
  questionStatus: boolean = false;
  formattedResponse!: SafeHtml;
  messages: Message[] = [
    {
      question: 'Bonjour',
      answer: 'Bonjour! comment peux-je vous aider?',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private chatservice: LlmService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.chat_form = this.formBuilder.group({
      question:  ['',[Validators.required, Validators.minLength(15)]],
      llm_type: ['', Validators.required],
      language: ['', Validators.required],
    });
    this.formattedResponse = this.formatResponse();
  }

  ask_chatbot() {
    const question = this.chat_form.value.question;
    this.questionStatus = true;
    if (this.chat_form.value.llm_type == '1' && this.chat_form.value.language == 'fr' ) {
      this.chatservice
        .Askllm(question)
        .subscribe((response) => {
          if (response) {
            this.questionStatus = false;
            const nouveauMessage: Message = {
              question: question,
              answer: response,
            };
            this.chat_form.reset();
            this.messages.push(nouveauMessage);
          }
        });
    } else if (this.chat_form.value.llm_type == '2'  ) {
      const contexte =
        'Question:' +
        this.chat_form.value.question +
        '\n \n Conversation précedente:' +
       JSON.stringify(this.messages);
      console.log(contexte);
      
      this.chatservice.chatllm(contexte).subscribe((response) => {
        if (response) {
          this.questionStatus = false;
          this.response = response;
          const nouveauMessage: Message = {
            question: question,
            answer: response,
          };
          
          this.messages.push(nouveauMessage);
          this.chat_form.reset({ 'question':''});
          
        }
      });
    }
    else if (this.chat_form.value.language == 'ar' && this.chat_form.value.llm_type == 1){
      this.chatservice
        .chatllm_ar(question)
        .subscribe((response) => {
          if (response) {
            this.questionStatus = false;
            this.response = response;
            const nouveauMessage: Message = {
              question: question,
              answer: response,
            };
            this.chat_form.reset();
            this.messages.push(nouveauMessage);
          }
        });

    }
  }
  clearConversation(){
    this.messages.splice(0, this.messages.length)
  }

  formatResponse(): SafeHtml {
    const points = this.response.split(/\d+\.\s/).filter((point: String) => point.trim() !== '');
    
    const formattedHtml = `
      <div class="p-4 bg-gray-100 rounded-lg shadow-md">
        <p class="mb-4 text-lg font-semibold text-gray-800">L'utilité du Code de la Famille au Maroc est multiple :</p>
        <ol class="list-decimal list-inside space-y-2">
          ${points.map((point: String) => {
            const [title, description] = point.split(':');
            return `
              <li class="text-gray-700">
                <span class="font-medium">${title.replace('**', '').replace('**', '')} :</span>
                <span class="text-gray-600">${description || ''}</span>
              </li>
            `;
          }).join('')}
        </ol>
      </div>
    `;

    return this.sanitizer.bypassSecurityTrustHtml(formattedHtml);
  }
}
