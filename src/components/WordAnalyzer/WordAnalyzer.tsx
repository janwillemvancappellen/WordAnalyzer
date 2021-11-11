import "../WordAnalyzer/word-analyzer.css";
import { Utils } from "../../utilities/Utils";
import { WordFrequencyAnalyzer } from "../../models/WordFrequencyAnalyzer";
import { ReactElement, useEffect, useState } from "react";
import { WordFrequency } from "../../models/WordFrequency";

function Input(props: any): ReactElement {
  const wordFrequencyAnalyzer: WordFrequencyAnalyzer = new WordFrequencyAnalyzer();
  const buttonText: string = "Analyze";
  const textInputLabel: string = "Text to analyze:";
  const wordInputLabel: string = "Word frequency for:";
  const numberOfWordsInputLabel: string = "Frequency for number of words:";
  const [textarea, setTextarea] = useState(
    "Ik wist dat ik de tweede manche moest winnen. Ik wist Jorge en Romain gelijk na de start te passeren en wist een klein gaatje te slaan. Ik heb alles gedaan wat ik kon en nu is het gat weer drie punten."
  );
  const [word, setWord] = useState("");
  const [numberOfWords, setNumberOfWords] = useState(10);
  const [highestFrequency, setHighestFrequency] = useState(0);
  const [frequencyForWord, setFrequencyForWord] = useState(0);
  const [frequencyForNWord, setFrequencyForNWord] = useState(
    new Array<WordFrequency>()
  );
  const [data, setData] = useState({});

  function GetHighestFrequency(): number {
    return wordFrequencyAnalyzer.CalculateHighestFrequency(textarea);
  }

  function GetFrequencyForWord(): number {
    return wordFrequencyAnalyzer.CalculateFrequencyForWord(
      textarea,
      Utils.getFirstWordFromText(word)
    );
  }

  function GetFrequencyForNWord() {
    return wordFrequencyAnalyzer.CalculateMostFrequentNWords(
      textarea,
      numberOfWords
    );
  }

  function submitDataHandler(event: any): any {
    event.preventDefault();

    if (Utils.isEmpty(textarea)) {
      return;
    } else {
      setHighestFrequency(GetHighestFrequency());
      setFrequencyForWord(GetFrequencyForWord());
      setFrequencyForNWord(GetFrequencyForNWord());

      setData({
        highestFrequency,
        frequencyForWord,
        frequencyForNWord
      });

      props.submitData({
        highestFrequency,
        frequencyForWord,
        frequencyForNWord
      });
    }
  }

  function submitDisabled(): boolean {
    return Utils.isEmpty(textarea) ||
      Utils.isEmpty(numberOfWords) ||
      Utils.isEmpty(word)
      ? true
      : false;
  }

  useEffect(() => {
    setData({ highestFrequency, frequencyForWord, frequencyForNWord });
  }, [highestFrequency, frequencyForWord, frequencyForNWord]);

  useEffect(() => {
    props.submitData(data);
  }, [data, props]);

  return (
    <div className="input-container">
      <form onSubmit={submitDataHandler}>
        <div className="container">
          <div className="input-group">
            <label htmlFor="text-input">{textInputLabel}</label>
            <textarea
              id="text-input"
              className="text-input-area"
              name="textInput"
              value={textarea}
              onChange={(event) => setTextarea(event.target.value)}
              rows={8}
            />
          </div>
          <div className="input-group">
            <label htmlFor="word-input">{wordInputLabel}</label>
            <input
              id="word-input"
              type="text"
              value={word}
              onChange={(event) => setWord(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="number-of-words-input">
              {numberOfWordsInputLabel}
            </label>
            <input
              id="number-of-words-input"
              type="number"
              value={numberOfWords}
              onChange={(event) => setNumberOfWords(Number(event.target.value))}
            />
          </div>
          <button type="submit" disabled={submitDisabled()}>
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}

function Results({ data }: any): ReactElement {
  if (!data.frequencyForNWord) {
    return <div></div>;
  }

  const tableItems = [];

  for (let index = 0; index < data.frequencyForNWord.length; index++) {
    tableItems.push(
      <tr key={index}>
        <td>{data.frequencyForNWord[index].GetWord()}</td>
        <td>{data.frequencyForNWord[index].GetFrequency()}</td>
      </tr>
    );
  }

  return (
    <div className="results-container">
      <div className="results-frequency-totals">
        <div>
          <div className="title">highest freq.</div>
          <div className="value">{data.highestFrequency}</div>
        </div>
        <div>
          <div className="title">freq. for word</div>
          <div className="value">{data.frequencyForWord}</div>
        </div>
      </div>
      <div>
        <table className="results-table">
          <tbody>
            <tr>
              <th>Word</th>
              <th>Frequency</th>
            </tr>
            {tableItems}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function WordAnalyzer() {
  const title: string = "Word Analyzer";
  const [data, setData] = useState({});

  return (
    <div className="wrapper">
      <h1>{title}</h1>
      <div id="word-analyzer">
        <Input submitData={(data: any) => setData(data)} />
        <Results data={data} />
      </div>
    </div>
  );
}
