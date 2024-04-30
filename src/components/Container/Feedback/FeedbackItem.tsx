import { useState } from "react";

import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedbackItem } from "../../../lib/types";
import { daysBetween } from "../../../lib/utils";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [toggle, setToggle] = useState(false);
  const updateVote = useMutation(api.comment.updateVote)
  const days = daysBetween(feedbackItem._creationTime);
  const handleUpvote = (e:React.MouseEvent<HTMLButtonElement>) =>{
    updateVote({
      id: feedbackItem._id
    })
    e.currentTarget.disabled = true;
    e.stopPropagation(); // prevents event bubbling
  }
  return (
    <li
      className={`feedback ${toggle && "feedback--expand"}`}
      onClick={() => setToggle((prev) => !prev)}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{feedbackItem.upvote_count}</span>
      </button>
      <div>
        <p>{feedbackItem.badge_letter}</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>
      <p>{ days === 0 ? "NEW" : `${days}d`}</p>
    </li>
  );
}
