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
import { AffaireComponent } from './affaire/affaire.component';
import { VerifyAffComponent } from './verify-aff/verify-aff.component';
import { ChatLlmComponent } from './chat-llm/chat-llm.component';
import { SearchOffersComponent } from './search-offers/search-offers.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { OffresService } from './services/offres.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    HomeComponent,
    AffaireComponent,
    VerifyAffComponent,
    ChatLlmComponent,
    SearchOffersComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterOutlet

  ],
  providers: [
    AuthService,
    HttpClientModule,
    OffresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
