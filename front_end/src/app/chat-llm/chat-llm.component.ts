import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LlmService } from '../services/llm.service';
import { Conversation, Message } from '../models/message';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { OffresService } from '../services/offres.service';
import { VoiceObject } from '../models/voice-object';

@Component({
  selector: 'app-chat-llm',
  templateUrl: './chat-llm.component.html',
  styleUrls: ['./chat-llm.component.css'],
})
export class ChatLlmComponent implements OnInit {
  file!: File;
  chat_form!: FormGroup;
  response!: any;
  questionStatus: boolean = false;
  conversation: Conversation = {
    messages: [
      {
        question: 'Bonjour',
        answer: `Bonjour! vous pouvez choisir le service plus adapté à votre besoin:\n \n
        \t \t 1) Saisie la question, choisir le modèle et clicker sur le button consulter!
        \t \t 2) Joindre un cv pour l'anaylser et prendre des consielles pour améliorer le cv et augmenter vos chances pour trouver une poste de rève :) \n\n\n
        Bonne Chance  &#128079;
        
        `,
      },
    ],
  };

  messages: Message[] = [
    {
      question: 'Bonjour',
      answer: `Bonjour! vous pouvez choisir le service plus adapté à votre besoin:\n \n
      \t \t 1) Saisie la question, choisir le modèle et clicker sur le button consulter!
      \t \t 2) Joindre un cv pour l'anaylser et prendre des consielles pour améliorer le cv et augmenter vos chances pour trouver une poste de rève :) \n\n\n
      Bonne Chance  &#128079;
      
      `,
    },
  ];
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  audioBlob!: Blob;
  isRecording = false;
  recordingStatus = '';
  audioUrl: SafeUrl | null = null;
  voiceObject!: VoiceObject;

  constructor(
    private formBuilder: FormBuilder,
    private chatservice: LlmService,
    private sanitizer: DomSanitizer,
    private offresServices: OffresService,
    private llmservice: LlmService
  ) {}

  ngOnInit(): void {
    this.chat_form = this.formBuilder.group({
      question: ['', [Validators.required, Validators.minLength(15)]],
      llm_type: ['', [Validators.required]],
    });
  }

  ask_chatbot() {
    let question = this.chat_form.value.question;
    this.response = null;
    this.questionStatus = true;

    const nouveauMessage1: Message = {
      question: question,
      answer: '',
    };
    let messages2: Message[] = [];
    /** Ajouter les elements de list  messages à nouveau list  */
    for (let message of this.messages) {
      messages2.push(message);
    }
    for (let message of this.messages) {
      this.conversation.messages.push(message);
    }
    messages2.push(nouveauMessage1);
    this.conversation.messages.push(nouveauMessage1)
    // this.conversation = {
    //   messages: messages2,
    // };


    if (this.chat_form.value.llm_type == '1') {
      this.chatservice.Consultation(this.chat_form.value.question).subscribe(
        (response) => {
          this.questionStatus = false;
          this.response = response;
          const nouveauMessage2: Message = {
            question: question,
            answer: this.response,
          };
          this.messages.push(nouveauMessage2);
          this.conversation.messages.push(nouveauMessage2)
          this.chat_form.reset({ question: '', llm_type: '1' });
        },
        (err) => {
          console.error(err);
        }
      );
    }
    if (this.chat_form.value.llm_type == '2') {
      this.chatservice.chatllm(this.conversation).subscribe((response) => {
        if (response) {
          this.questionStatus = false;
          this.response = response;
          const nouveauMessage2: Message = {
            question: question,
            answer: this.response,
          };
          this.messages.push(nouveauMessage2);
          this.conversation.messages.push(nouveauMessage2)
          // this.conversation = {
          //   messages: [],
          // };

          this.chat_form.reset({ question: '', llm_type: '2' });
        }
      });
    }
  }

  clearConversation() {
    this.messages.splice(0, this.messages.length);
  }

  formatResponse(response: string): SafeHtml {
    // Diviser la réponse en lignes
    const lines = response.split('\n');

    // Formater chaque ligne
    const formattedLines = lines.map((line) => {
      // Rechercher les mots entre ** et les mettre en gras
      const formattedLine = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      );

      // Ajouter un retour à la ligne HTML à la fin de chaque ligne
      return `<p class="mb-2 text-gray-800">${formattedLine}</p>`;
    });

    // Joindre toutes les lignes formatées
    const formattedHtml = formattedLines.join('');

    // Encapsuler le tout dans un div avec du style
    const finalHtml = `
      <div class="p-4 bg-gray-100 rounded-lg shadow-md">
        ${formattedHtml}
      </div>
    `;

    return this.sanitizer.bypassSecurityTrustHtml(finalHtml);
  }
  uploadFile() {
    document.getElementById('importFichier')?.click();
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  onUpload(event: any) {
    this.onFileSelected(event);
    this.chat_form.value.question =
      "Importation réussite,\n Demande: L'anaylse de CV!";
    this.questionStatus = true;
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      this.offresServices.analyseCVForme(formData).subscribe(
        (resultat) => {
          if (resultat) {
            this.questionStatus = false;
            this.response = resultat;
            const nouveauMessage2: Message = {
              question: 'Anaylse la Forme  de CV!',
              answer: resultat,
            };
            this.messages.push(nouveauMessage2);
            this.conversation = {
              messages: [],
            };

            this.chat_form.reset({ question: '' });
            this.questionStatus = true;
            this.chat_form.value.question =
              ' Deuxième Analyse: Consultation de carrière ......';
            // lancement de la deuxième Analyse(Carière)
            setTimeout(() => {
              this.offresServices.analyseCVcareer(formData).subscribe(
                (resultat) => {
                  if (resultat) {
                    this.questionStatus = false;
                    this.response = resultat;
                    const nouveauMessage2: Message = {
                      question: 'Consultation de carrière',
                      answer: resultat,
                    };
                    this.messages.push(nouveauMessage2);
                    this.conversation = {
                      messages: [],
                    };

                    this.chat_form.reset({ question: '' });
                  }
                },
                (err) => {
                  console.error(err);
                }
              );
            }, 1000);
          }
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  // Les traitements pour l'enregistrement
  async startRecording() {
    this.audioChunks = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.addEventListener(
        'dataavailable',
        (event: BlobEvent) => {
          this.audioChunks.push(event.data);
        }
      );

      this.mediaRecorder.addEventListener('stop', () => {
        this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(this.audioBlob)
        );
      });

      this.mediaRecorder.start();
      this.isRecording = true;
      this.recordingStatus = 'Enregistrement en cours...';
    } catch (err) {
      console.error("Erreur lors de l'accès au microphone:", err);
      this.recordingStatus = "Erreur: Impossible d'accéder au microphone";
    }
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.recordingStatus = 'Enregistrement terminé';
    }
  }

  ngOnDestroy() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    }
  }
  uploadAudio() {
    if (this.audioBlob) {
      this.questionStatus = true;
      const formData = new FormData();
      formData.append('voiceFile', this.audioBlob);
      formData.append('conversation', JSON.stringify(this.conversation))
      this.deleteAudio()
      let menuTop= document.getElementById('dropdownTop')
      menuTop?.setAttribute('class','z-10 hidden h-40 p-2  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700')

      // this.voiceObject = {
      //   conversation: this.conversation,
      //   voiceFile: formData,
      // };
      // console.log(this.voiceObject);

      this.llmservice.EnvoyerAudio(formData).subscribe({
        next: (MessageRecuObject) => {
          if (MessageRecuObject) {
            this.questionStatus = false;
            
            this.response = MessageRecuObject.answer;
            const nouveauMessage2: Message = {
              question: MessageRecuObject.question,
              answer: this.response,
            };
            this.messages.push(nouveauMessage2);
            this.conversation.messages.push(nouveauMessage2)
            console.log(MessageRecuObject);
            
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  deleteAudio(){
    this.audioUrl = null;
    this.ngOnDestroy()
  }
}
