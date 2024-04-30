import Spinner from "./Spinner";
import FeedbackItem from "./FeedbackItem";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCompanyStore } from "../../../stores/company-store";

export default function FeedbackList() {
  
  const active = useCompanyStore(state => state.activeCompany)
  const comments = useQuery(api.comment.getComments, {company: active});
  return (
    <ol className="feedback-list">
      {comments ? (
        comments.map((comment) => (
          <FeedbackItem key={comment._id} feedbackItem={comment} />
        ))
      ) : (
        <Spinner />
      )}
    </ol>
  );
}
