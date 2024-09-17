// src/types/nlpjs__nlu.d.ts
declare module '@nlpjs/nlu' {
  export class NlpManager {
    constructor(options?: any);
    addLanguage(language: string): void;
    addDocument(language: string, utterance: string, intent: string): void;
    addAnswer(language: string, intent: string, answer: string): void;
    train(): Promise<void>;
    process(language: string, utterance: string): Promise<any>;
  }
}
