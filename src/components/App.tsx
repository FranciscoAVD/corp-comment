
import Container from "./Container/Container";
import Footer from "./Footer";
import HashtagList from "./Hashtag/HashtagList";


function App() {
  // const fetchFeedbackItems = useFeedbackItemsStore(state => state.fetchFeedbackItems);

  // useEffect(() => {
  //   fetchFeedbackItems();
  // }, []);

  return (
    <div className="app">
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}

export default App;
