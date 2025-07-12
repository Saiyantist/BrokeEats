import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface Props {
  onFilter: (search: string) => void;
}

export default function SearchFilter({ onFilter }: Props) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilter(search);
    }, 200); // debounce for a smoother experience

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">BrokeEats Recipes 🍽️</h1>
      <Input
        placeholder="Search by ingredient or recipe name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
