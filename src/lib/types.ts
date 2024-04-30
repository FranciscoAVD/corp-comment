import { Id } from "../../convex/_generated/dataModel"

export type TFeedbackItem = {
    _id: Id<"comment">,
    upvote_count: number,
    badge_letter: string,
    company: string,
    text: string,
    _creationTime: number;
    companyId: Id<"company">
  }