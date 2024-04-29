import Header from "./Header/Header";
import FeedbackList from "./Feedback/FeedbackList";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

export default function Container() {
  
  
  return (
    <main className="container">
      <Header />
      <FeedbackList />
    </main>
  );
}
