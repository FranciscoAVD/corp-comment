import Pattern from "./Pattern"
import Logo from "./Logo"
import PageHeading from "./PageHeading"
import FeedbackForm from "./FeedbackForm"

export default function Header(){
    // const addToList = useFeedbackItemsStore((state) => state.addItemToList);
    return (
    <header>
        <Pattern />
        <Logo />
        <PageHeading />
        <FeedbackForm />
    </header>
    )
}