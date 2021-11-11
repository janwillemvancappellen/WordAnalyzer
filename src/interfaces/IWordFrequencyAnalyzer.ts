import { WordFrequency } from "../models/WordFrequency";

export interface IWordFrequencyAnalyzer {
  CalculateHighestFrequency(text: string): number;
  CalculateFrequencyForWord(text: string, word: string): number;
  CalculateMostFrequentNWords(text: string, n: number): WordFrequency[];
}
