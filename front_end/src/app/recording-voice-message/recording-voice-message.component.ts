import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LlmService } from '../services/llm.service';
import { VoiceObject } from '../models/voice-object';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-recording-voice-message',
  templateUrl: './recording-voice-message.component.html',
  styleUrls: ['./recording-voice-message.component.css'],
  
})
export class RecordingVoiceMessageComponent implements OnDestroy,OnInit{
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  audioBlob!: Blob;
  isRecording = false;
  recordingStatus = '';
  audioUrl: SafeUrl | null = null;
  voiceObject!: VoiceObject;

  constructor(private sanitizer: DomSanitizer,private llmservice: LlmService) {}
  ngOnInit(): void {

    initFlowbite();
  
  
  }
  
  async startRecording() {
    this.audioChunks = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
        this.audioChunks.push(event.data);
      });

      this.mediaRecorder.addEventListener('stop', () => {
        this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.audioBlob));
      });

      this.mediaRecorder.start();
      this.isRecording = true;
      this.recordingStatus = 'Enregistrement en cours...';
    } catch (err) {
      console.error('Erreur lors de l\'accès au microphone:', err);
      this.recordingStatus = 'Erreur: Impossible d\'accéder au microphone';
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
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  }
//   uploadAudio(){
//     if (this.audioBlob) {
//       const formData = new FormData();
//     formData.append('audio', this.audioBlob, 'recording.wav');
//     this.llmservice.EnvoyerAudio(formData).subscribe(
//       (reponse)=>{
//         console.log(reponse)
//       },
//       (err)=>{
//         console.error(err);
        
//       }
//     )
      
//   }
// }
}
