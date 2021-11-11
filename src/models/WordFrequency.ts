import { IWordFrequency } from "../interfaces/IWordFrequency";

export class WordFrequency implements IWordFrequency {
  word: string;
  frequency: number;

  constructor(word: string, frequency: number) {
    this.word = word;
    this.frequency = frequency;
  }

  GetWord(): string {
    return this.word;
  }

  GetFrequency(): number {
    return this.frequency;
  }
}
