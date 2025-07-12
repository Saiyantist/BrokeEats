import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function AddRecipe() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    if (!form.title || !form.ingredients || !form.instructions) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/recipes",
        {
          title: form.title,
          ingredients: form.ingredients.split(",").map((i) => i.trim()),
          instructions: form.instructions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Recipe added!");
      navigate("/");
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong while saving the recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Add Recipe</h1>

      <Input
        name="title"
        placeholder="Recipe Title"
        value={form.title}
        onChange={handleChange}
      />

      <Input
        name="ingredients"
        placeholder="Ingredients (comma-separated)"
        value={form.ingredients}
        onChange={handleChange}
      />

      <Textarea
        name="instructions"
        placeholder="Instructions"
        value={form.instructions}
        onChange={handleChange}
      />

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Submit Recipe"}
      </Button>
    </div>
  );
}
