import Pattern from "./Pattern"
import Logo from "./Logo"
import PageHeading from "./PageHeading"
import FeedbackForm from "./FeedbackForm"

import { useFeedbackItemsStore } from "../../../stores/feedbackItemsStore"

export default function Header(){
    const addToList = useFeedbackItemsStore((state) => state.addItemToList);
    return (
    <header>
        <Pattern />
        <Logo />
        <PageHeading />
        <FeedbackForm onAddToList={addToList}/>
    </header>
    )
}