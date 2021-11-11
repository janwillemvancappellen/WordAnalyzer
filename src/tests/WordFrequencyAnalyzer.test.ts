import { WordFrequencyAnalyzer } from "../models/WordFrequencyAnalyzer";

const testData = {
  wordFrequencyAnalyzer: new WordFrequencyAnalyzer(),
  text:
    "Ik wist dat ik de tweede manche moest winnen. Ik wist Jorge en Romain gelijk na de start te passeren en wist een klein gaatje te slaan. Ik heb alles gedaan wat ik kon en nu is het gat weer drie punten.",
  emptyText: "    ",
  keyword: "De",
  keywordNonExisting: "Giraffe",
  numberOfWords: 3,
  wordFrequencyArray: [
    {
      word: "ik",
      frequency: 5
    },
    {
      word: "en",
      frequency: 3
    },
    {
      word: "wist",
      frequency: 3
    }
  ]
};

describe("WordFrequencyAnalyzer Class", () => {
  test("Calculate highest frequency of word in text", () => {
    const output: number = 5;
    const outputEmpty: number = 0;

    expect(
      testData.wordFrequencyAnalyzer.CalculateHighestFrequency(testData.text)
    ).toEqual(output);

    expect(
      testData.wordFrequencyAnalyzer.CalculateHighestFrequency(
        testData.emptyText
      )
    ).toEqual(outputEmpty);
  });

  test("Calculate frequency for word in text", () => {
    const output: number = 2;
    const outputEmpty: number = 0;

    expect(
      testData.wordFrequencyAnalyzer.CalculateFrequencyForWord(
        testData.text,
        testData.keyword
      )
    ).toEqual(output);

    expect(
      testData.wordFrequencyAnalyzer.CalculateFrequencyForWord(
        testData.text,
        testData.keywordNonExisting
      )
    ).toEqual(outputEmpty);
  });

  test("Calculate most frequent number of words in text", () => {
    expect(
      testData.wordFrequencyAnalyzer.CalculateMostFrequentNWords(
        testData.text,
        testData.numberOfWords
      )
    ).toEqual(testData.wordFrequencyArray);
  });
});
