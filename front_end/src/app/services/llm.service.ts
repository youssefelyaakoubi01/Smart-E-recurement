import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation, Message } from '../models/message';
import { VoiceObject } from '../models/voice-object';

@Injectable({
  providedIn: 'root'
})
export class LlmService {

  constructor(private http: HttpClient) { }

  Askllm(divorce_situation: string ): Observable<string> {
    return this.http.get<string>(
      `http://localhost:8000/search_offers_rag/${divorce_situation}`
    );
  }

  // 
  chatllm(converstation: Conversation ): Observable<string> {
    return this.http.post<string>(
      'http://localhost:8000/ask_llm/',converstation
    );
  }


  Consultation(consultation_request: string ): Observable<string> {
    return this.http.get<string>(
      `http://127.0.0.1:8000/consultation_rag/${consultation_request}`
    );
  }
  EnvoyerAudio(voiceObject: FormData): Observable<Message> {
    return this.http.post<Message>('http://localhost:8000/voiceMessageConsultation', voiceObject);
  }
 


}
