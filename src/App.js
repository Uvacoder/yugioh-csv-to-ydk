import React, { useState } from "react";
import { CSVReader } from "react-papaparse";
import "./App.css";
import { ExportYdk } from "./components/ExportYdk/ExportYdk";

function App() {
  const [cards, setCards] = useState();
  const [error, setError] = useState();

  const handleOnDrop = async (data) => {
    setCards(null);

    let flattenCardIds = await flattenCards(data);
    let duplicateCardsObj = await countDuplicates(flattenCardIds);
    let maxDupeCards = await removeMaxDuplicates(duplicateCardsObj);
    let joinedCards = await joinWithNewLine(maxDupeCards);
    console.log(joinedCards);
    if (maxDupeCards.length > 1) {
      setCards(joinedCards);
    } else {
      setError("Invalid CSV");
    }
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
    setCards(null);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    setCards(null);
    console.log("---------------------------");
  };

  const flattenCards = async (card) => {
    return card

      .map((card) => {
        let quantity = parseInt(card.data.cardq, 10);

        let printQ = quantity <= 3 ? quantity : 3;

        return [...new Array(printQ)].map(() => card.data.cardid);
      })
      .flat(2);
  };

  const countDuplicates = async (arr) => {
    return arr.reduce(
      (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
      {}
    );
  };

  const removeMaxDuplicates = async (obj) => {
    return Object.keys(obj)
      .map((card) => {
        let printQ = obj[card] <= 3 ? obj[card] : 3;

        return [...new Array(printQ)].map(() => card);
      })
      .flat(2);
  };

  const joinWithNewLine = async (arr) => {
    return arr.join("\n");
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h5 style={{ textAlign: "center" }}>Yugioh CSV to YDK</h5>
        <CSVReader
          onDrop={handleOnDrop}
          onError={handleOnError}
          addRemoveButton
          config={{ header: true }}
          onRemoveFile={handleOnRemoveFile}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
        {cards ? <ExportYdk cards={cards} /> : null}
      </div>
    </>
  );
}

export default App;
