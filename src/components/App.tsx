import { useEffect } from "react";


import Container from "./Container/Container";
import Footer from "./Footer";
import HashtagList from "./Hashtag/HashtagList";
import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";

function App() {
  const fetchFeedbackItems = useFeedbackItemsStore(state => state.fetchFeedbackItems);

  useEffect(() => {
    fetchFeedbackItems();
  }, []);

  return (
    <div className="app">
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}

export default App;
