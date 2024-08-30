import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VerifyAffComponent } from './verify-aff/verify-aff.component';
import { ChatLlmComponent } from './chat-llm/chat-llm.component';
import { SearchOffersComponent } from './search-offers/search-offers.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { OffresService } from './services/offres.service';
import { CreateCVComponent } from './create-cv/create-cv.component';
import { CommonModule } from '@angular/common';
import { RecordingVoiceMessageComponent } from './recording-voice-message/recording-voice-message.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    HomeComponent,
    VerifyAffComponent,
    ChatLlmComponent,
    SearchOffersComponent,
    NotfoundComponent,
    CreateCVComponent,
    RecordingVoiceMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterOutlet,
    CommonModule

  ],
  providers: [
    AuthService,
    HttpClientModule,
    OffresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
