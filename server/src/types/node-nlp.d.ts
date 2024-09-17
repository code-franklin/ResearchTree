declare module 'node-nlp' {
  export class NlpManager {
    constructor(options?: any);
    addDocument(language: string, text: string, intent: string): void;
    train(): Promise<void>;
    process(language: string, text: string): Promise<any>;
    save(fileName?: string, overwrite?: boolean): void;
  }
}
