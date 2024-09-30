import { Conversation } from "./message";



export interface VoiceObject {
    conversation: Conversation,
    voiceFile: FormData
}
