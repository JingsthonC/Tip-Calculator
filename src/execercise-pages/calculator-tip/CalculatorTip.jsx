import PropTypes from "prop-types";
import "./calculatorTip.module.css";
import { useState } from "react";

const tipSelections = [
  { id: 0, level: "Next Time", rate: 0.0 },
  { id: 1, level: "Fine", rate: 0.1 },
  { id: 2, level: "Good", rate: 0.2 },
  { id: 3, level: "Amazing", rate: 0.3 },
];

export default function CalculatorTip() {
  const [bill, setBill] = useState(0);
  const [tipData, setTipData] = useState({ ownService: 0, friendService: 0 });

  function handleOnChange(e) {
    if (e.target.name === "bill") {
      setBill(Number(e.target.value));
    } else if (e.target.name === "ownService") {
      setTipData({
        ...tipData, // Keep existing data
        ownService: Number(e.target.value), // Add new data
      });
    } else if (e.target.name === "friendService") {
      setTipData({
        ...tipData, // Keep existing data
        friendService: Number(e.target.value), // Add new data
      });
    }
  }

  function handleReset() {
    setTipData({ ownService: 0, friendService: 0 });
    setBill(0);
  }

  const totalBill = bill + (tipData.ownService + tipData.friendService) * bill;
  const tipAmount = (tipData.ownService + tipData.friendService) * bill;

  return (
    <div className="App">
      <div>
        <Input text="How much was the bill?">
          <span>
            <input
              type="text"
              name="bill"
              id=""
              onChange={handleOnChange}
              value={bill}
            />
          </span>
        </Input>
        <Input text="How did you like the service?">
          <span>
            <select
              name="ownService"
              onChange={handleOnChange}
              value={tipData.ownService}
            >
              {tipSelections.map((el) => (
                <option key={el.id} value={el.rate}>
                  {el.level} ({(el.rate * 100).toFixed(2)}
                  {"%"})
                </option>
              ))}
            </select>
          </span>
        </Input>
        <Input text="How did your friend like the service?">
          <span>
            <select
              name="friendService"
              onChange={handleOnChange}
              value={tipData.friendService}
            >
              {tipSelections.map((el) => (
                <option key={el.id} value={el.rate}>
                  {el.level} ({(el.rate * 100).toFixed(2)}
                  {"%"})
                </option>
              ))}
            </select>
          </span>
        </Input>
      </div>
      {bill !== 0 ? (
        <h1>
          You will pay ${totalBill.toFixed(0)} ($
          {bill.toFixed(0)} + ${tipAmount.toFixed(0)} tip)
        </h1>
      ) : null}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

function Input({ text, children }) {
  return (
    <p>
      {text}
      <span>{children}</span>
    </p>
  );
}

Input.propTypes = {
  text: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
};
