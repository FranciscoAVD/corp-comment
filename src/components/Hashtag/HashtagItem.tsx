import { Id } from "../../../convex/_generated/dataModel";

type HashtagItemProps = {
  id: Id<"company">
  company: string;
  selectCompany: (company: Id<"company">) => void;
};
export default function HashtagItem({ company, selectCompany, id }: HashtagItemProps) {
  return (
    <li onClick={()=>selectCompany(id)}>
      <button>#{company}</button>
    </li>
  );
}
