import { useState } from "react";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";

function App() {
  const [page, setPage] = useState<"home" | "add">("home");

  return (
    <main className="min-h-screen p-6 bg-muted text-muted-foreground">
      <h1 className="text-2xl font-bold text-primary mb-4">🍛 BrokeEats</h1>

      <div className="space-x-2 mb-6">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("add")}>Add Recipe</button>
      </div>

      {page === "home" && <Home />}
      {page === "add" && <AddRecipe />}
    </main>
  );
}

export default App;