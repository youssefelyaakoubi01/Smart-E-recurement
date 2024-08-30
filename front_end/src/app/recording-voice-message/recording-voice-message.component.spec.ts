import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingVoiceMessageComponent } from './recording-voice-message.component';

describe('RecordingVoiceMessageComponent', () => {
  let component: RecordingVoiceMessageComponent;
  let fixture: ComponentFixture<RecordingVoiceMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordingVoiceMessageComponent]
    });
    fixture = TestBed.createComponent(RecordingVoiceMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
