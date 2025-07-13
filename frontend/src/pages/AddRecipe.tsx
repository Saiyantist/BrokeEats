import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Add new recipe page with form handling and API integration.
 * Refreshes recipe lists after successful submission.
 */
export default function AddRecipe() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form state for recipe data
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });

  const [loading, setLoading] = useState(false);

  /**
   * Update form state when input values change
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Submit recipe to API with validation and error handling
   * Converts comma-separated ingredients to array and refreshes cache
   */
  const handleSubmit = async () => {
    // Validate all fields are filled
    if (!form.title || !form.ingredients || !form.instructions) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    
    // Show immediate feedback for better UX
    toast.loading("Adding your recipe...");
    
    try {
      await api.post(
        "/recipes",
        {
          title: form.title,
          ingredients: form.ingredients.split(",").map((i) => i.trim()), // Convert to array and trim whitespace
          instructions: form.instructions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Refresh all recipe-related data to show new recipe
      await queryClient.invalidateQueries({ queryKey: ["recipes"] });
      await queryClient.invalidateQueries({ queryKey: ["my-recipes"] });
      
      toast.dismiss(); // Clear loading toast
      toast.success("Recipe added successfully!");
      navigate("/"); // Return to home page
    } catch (err: any) {
      toast.dismiss(); // Clear loading toast
      console.error(err);
      toast.error("Something went wrong while saving the recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:max-w-xl max-w-md mx-auto mt-10 space-y-8 bg-white py-10 px-8 rounded-md shadow">
      <h1 className="text-2xl font-bold">Add Recipe</h1>

      {/* Recipe title  */}
      <Input
        name="title"
        placeholder="Recipe Title"
        value={form.title}
        onChange={handleChange}
      />

      {/* Ingredients - comma-separated */}
      <Input
        name="ingredients"
        placeholder="Ingredients (comma-separated)"
        value={form.ingredients}
        onChange={handleChange}
      />

      {/* Recipe instructions */}
      <Textarea
        name="instructions"
        placeholder="Instructions"
        value={form.instructions}
        onChange={handleChange}
      />

      {/* Submit button with loading state */}
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Submit Recipe"} {/* Loading state for UX */}
      </Button>
    </div>
  );
}
