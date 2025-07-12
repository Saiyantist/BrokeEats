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
    <Input
      placeholder="Search by ingredient or recipe name"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full sm:w-80"
    />
  );
}
