import { create } from "zustand";
import { Id } from "../../convex/_generated/dataModel";

type TCompanyStore = {
    activeCompany: null | Id<"company">;
    setActiveCompany: (c: Id<"company">) => void;
}
export const useCompanyStore = create<TCompanyStore>(set => ({
    activeCompany: null,
    setActiveCompany: (c) => {
        set(()=>({activeCompany: c}))
    }
}))