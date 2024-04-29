type HashtagItemProps = {
  company: string;
  selectCompany: (company: string) => void;
};
export default function HashtagItem({ company, selectCompany }: HashtagItemProps) {
  return (
    <li onClick={()=>selectCompany(company)}>
      <button>#{company}</button>
    </li>
  );
}
