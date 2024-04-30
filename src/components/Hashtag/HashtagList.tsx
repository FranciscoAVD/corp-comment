
import { useQuery } from "convex/react";
import HashtagItem from "./HashtagItem";
import { api } from "../../../convex/_generated/api";
import { useCompanyStore } from "../../stores/company-store";

export default function HashtagList() {
  const companies = useQuery(api.company.getCompanies);
  const setCompany = useCompanyStore(state => state.setActiveCompany)
  
  return (
    <ul className="hashtags">
      {companies?.map((company) => (
        <HashtagItem key={company.company} company={company.company} id={company._id} selectCompany={setCompany}/>
      ))}
    </ul>
  );
}
