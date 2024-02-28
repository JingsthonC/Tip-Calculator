import { useState } from "react";
import "./App.css";
import PropTypes from "prop-types";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

export default App;

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          key={i}
          num={i}
          title={el.title}
        >
          {el.text}
        </AccordionItem>
      ))}
      <AccordionItem
        curOpen={curOpen}
        onOpen={setCurOpen}
        key={3}
        num={3}
        title="I am Good!"
      >
        <p>How to create a software</p>
        <ul>
          <li>Idea</li>
          <li>Implement</li>
          <li>Deploy</li>
        </ul>
      </AccordionItem>
    </div>
  );
}

Accordion.propTypes = {
  data: PropTypes.array,
};

function AccordionItem({ num, title, children, curOpen, onOpen }) {
  const isOpen = num === curOpen;

  function handleToggle() {
    // curOpen === i ? onOpen(null) : onOpen(i);
    onOpen(isOpen ? null : num);
  }
  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => handleToggle()}
    >
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="text">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

AccordionItem.propTypes = {
  num: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
  curOpen: PropTypes.number,
  onOpen: PropTypes.func,
};
