import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  chatllm(divorce_situation: string ): Observable<string> {
    return this.http.get<string>(
      `http://localhost:8000/ask_llm/${divorce_situation}`
    );
  }

  chatllm_ar(divorce_situation: string ): Observable<string> {
    return this.http.get<string>(
      `http://127.0.0.1:8000/ask-smart-judge/chatbot_ar/${divorce_situation}`
    );
  }


}
