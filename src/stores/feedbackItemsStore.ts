import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type Store = {
  feedbackItems: TFeedbackItem[],
  isLoading: boolean,
  errorMessage: string,
  selectedCompany: string,
  getCompanyList: () => string[],
  getFilteredFeedbackItems: ()=> TFeedbackItem[],
  addItemToList: (text: string) => Promise<void>,
  selectCompany: (company: string) => void,
  fetchFeedbackItems: () => Promise<void>,
}

export const useFeedbackItemsStore = create<Store>((set, get) =>({
   feedbackItems: [],
   isLoading: false,
   errorMessage: "",
   selectedCompany: "",
   getCompanyList: () =>{
   return get().feedbackItems
    .map((item) => item.company)
    .filter((company, index, array) => {
      return array.indexOf(company) === index;
    })
   },
   getFilteredFeedbackItems: () => {
      return get().selectedCompany
   ? get().feedbackItems.filter(
       (feedbackItem) => feedbackItem.company === get().selectedCompany
     )
   : get().feedbackItems
   },
   addItemToList: async (text: string) => {
      const companyName = text
        .split(" ")
        .find((word) => word.includes("#"))
        ?.substring(1);
      if (companyName) {
        
        const newItem: TFeedbackItem = {
          id: new Date().getTime(),
          upvoteCount: 0,
          badgeLetter: companyName.substring(0, 1).toUpperCase(),
          company: companyName,
          daysAgo: 0,
          text: text,
        };
        set(state => ({
         feedbackItems: [...state.feedbackItems, newItem]
        }));
  
        await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
          {
            method: "POST",
            body: JSON.stringify(newItem),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
      }
   },
    selectCompany: (company: string)=>{
      set(()=>({selectedCompany: company}));
   },
   fetchFeedbackItems: async()=>{
      try {
         set(()=>({isLoading: true}));
         const response = await fetch(
           "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
         );
 
         if (!response.ok) {
           throw new Error();
         }
         const data = await response.json();
         set(()=>({feedbackItems: data.feedbacks}));
       } catch (e) {
         set(()=>({errorMessage: "Something went wrong. Please try again later."}));
       }
       set(()=>({isLoading: false}));
   },
}));