import { useState } from "react";
import { FEEDBACK_MAX_CHARACTERS } from "../../../lib/constants.js";

type FeedbackFormProps = {
  onAddToList: (text: string) => void,
}

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState("");
  const charCount = FEEDBACK_MAX_CHARACTERS - text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if(newText.length > FEEDBACK_MAX_CHARACTERS) return;
    setText(newText);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{ 
    e.preventDefault();
    onAddToList(text); 
    setText("");
  } 
  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <textarea
        name=""
        id="feedback-textarea"
        placeholder=""
        spellCheck={false}
        value={text}
        onChange={(e) => handleChange(e) }
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company.
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
