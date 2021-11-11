import { IWordFrequencyAnalyzer } from "../interfaces/IWordFrequencyAnalyzer";
import { WordFrequency } from "./WordFrequency";

export class WordFrequencyAnalyzer implements IWordFrequencyAnalyzer {
  private regExp: RegExp = /[^a-zA-Z]+/g;

  GetWordsFromText(text: string): Array<string> {
    return text
      .toLocaleLowerCase()
      .replace(this.regExp, " ")
      .trim()
      .split(" ")
      .filter((word) => word !== "");
  }

  GetWordFrequencyArray(words: Array<string>): Array<WordFrequency> {
    return words.reduce(
      (wordFrequencyArray: Array<WordFrequency>, word: string) => {
        const item: WordFrequency | undefined = wordFrequencyArray.find(
          (item: WordFrequency) => {
            return item.GetWord() === word;
          }
        );

        if (item) {
          item.frequency++;
        } else {
          wordFrequencyArray.push(new WordFrequency(word, 1));
        }

        return wordFrequencyArray;
      },
      new Array<WordFrequency>()
    );
  }

  CalculateHighestFrequency(text: string): number {
    const words: Array<WordFrequency> = this.GetWordFrequencyArray(
      this.GetWordsFromText(text)
    );

    return !words.length
      ? 0
      : words
          .sort((a, b) => b.GetFrequency() - a.GetFrequency())[0]
          .GetFrequency();
  }

  CalculateFrequencyForWord(text: string, word: string): number {
    const words: Array<WordFrequency> = this.GetWordFrequencyArray(
      this.GetWordsFromText(text)
    );

    if (!words.length) {
      return 0;
    } else {
      const wordFrequency = words.find(
        (item) => item.GetWord() === word.toLowerCase()
      );

      return wordFrequency ? wordFrequency.GetFrequency() : 0;
    }
  }

  CalculateMostFrequentNWords(
    text: string,
    numberOfWords: number
  ): WordFrequency[] {
    const words: Array<WordFrequency> = this.GetWordFrequencyArray(
      this.GetWordsFromText(text)
    );

    return !words.length && words.length <= numberOfWords
      ? []
      : words
          .sort((a, b) => {
            if (a.GetFrequency() > b.GetFrequency()) {
              return -1;
            }

            if (
              a.GetFrequency() === b.GetFrequency() &&
              a.GetWord() < b.GetWord()
            ) {
              return -1;
            } else {
              return 1;
            }
          })
          .slice(0, numberOfWords);
  }
}
