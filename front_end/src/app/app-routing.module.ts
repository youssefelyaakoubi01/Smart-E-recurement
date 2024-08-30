import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { VerifyAffComponent } from './verify-aff/verify-aff.component';
import { ChatLlmComponent } from './chat-llm/chat-llm.component';
import { SearchOffersComponent } from './search-offers/search-offers.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CreateCVComponent } from './create-cv/create-cv.component';
import { authGuard } from './auth.guard';
import { RecordingVoiceMessageComponent } from './recording-voice-message/recording-voice-message.component';


const routes: Routes = [
  { path: '', redirectTo:'home',pathMatch:'full'},
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent,canActivate:[authGuard]},
  { path: 'verifyAff', component: VerifyAffComponent },
  { path: 'chatllm', component: ChatLlmComponent ,canActivate:[authGuard]},
  { path: 'search_offers', component: SearchOffersComponent,canActivate:[authGuard]},
  { path: 'createCV', component: CreateCVComponent,canActivate:[authGuard]},
  { path: 'recordingVoice', component: RecordingVoiceMessageComponent,canActivate:[authGuard]},
  { path: '**', component: NotfoundComponent},
  
 
 

  // Ajoutez d'autres routes ici si nécessaire
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
