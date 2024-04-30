import { useState, useEffect } from "react";
import { FEEDBACK_MAX_CHARACTERS } from "../../../lib/constants.js";
import { hasCompany } from "../../../lib/utils.js";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api.js";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const charCount = FEEDBACK_MAX_CHARACTERS - text.length;
  const addCompany = useMutation(api.company.addCompany);
  const updatePosts = useMutation(api.company.updatePosts);
  const addComment = useMutation(api.comment.addComment);
  const company = hasCompany(text);
  const isCompany = useQuery(api.company.getCompany, {
    name: company ? company.name : null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > FEEDBACK_MAX_CHARACTERS) return;
    setText(newText);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //if there is no hashtag with text then we'll set an error and return
    if (!company) return;
    if (isCompany) {
      //if a company ID exists, there is a company in the database and we add the comment with the corresponding company ID and update the number of posts in the company.
      addComment({
        text: text,
        company: company.name,
        badge: company.badge,
        companyId: isCompany,
        upvotes: 0,
      });
      updatePosts({
        id: isCompany,
        post: 1
      })
    } 
    else {
      //else there is no company and we have to:
      //1. add the new company
      //2. get the company Id
      //3. add the comment with the new company Id
      const newId = await addCompany({
        name: company.name
      })
      addComment({
        text: text,
        company: company.name,
        badge: company.badge,
        upvotes: 0,
        //@ts-ignore
        //newId type is assured to be of type Id<"company"> in convex function
        companyId: newId
      })
    }
  };
  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <textarea
        name=""
        id="feedback-textarea"
        placeholder=""
        spellCheck={false}
        value={text}
        onChange={(e) => handleChange(e)}
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
