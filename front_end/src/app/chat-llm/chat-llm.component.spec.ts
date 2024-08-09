import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLlmComponent } from './chat-llm.component';

describe('ChatLlmComponent', () => {
  let component: ChatLlmComponent;
  let fixture: ComponentFixture<ChatLlmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatLlmComponent]
    });
    fixture = TestBed.createComponent(ChatLlmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
