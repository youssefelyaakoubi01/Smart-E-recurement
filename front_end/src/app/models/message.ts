export interface Message {
    question: string,
    answer: any
}

export interface Conversation {
    messages: Message[]
}
