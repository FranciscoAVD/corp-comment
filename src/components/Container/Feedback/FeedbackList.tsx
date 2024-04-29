import Spinner from "./Spinner";
import FeedbackItem from "./FeedbackItem";

import { useFeedbackItemsStore } from "../../../stores/feedbackItemsStore";


export default function FeedbackList() {
  const filteredFeedbackItems = useFeedbackItemsStore((state) => state.getFilteredFeedbackItems());
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {errorMessage.length > 0 && errorMessage}

      {filteredFeedbackItems.map((item) => (
        <FeedbackItem key={item.id} feedbackItem={item} />
      ))}
    </ol>
  );
}
