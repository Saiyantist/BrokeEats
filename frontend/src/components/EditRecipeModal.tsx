import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { toast } from "sonner";
import type { Recipe } from "@/types/recipe";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  open: boolean;
  onClose: () => void;
  recipe: Recipe;
  onUpdated: () => void;
}

export default function EditRecipeModal({ open, onClose, recipe, onUpdated }: Props) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: recipe.title,
    ingredients: recipe.ingredients.join(", "),
    instructions: recipe.instructions,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({
        title: recipe.title,
        ingredients: recipe.ingredients.join(", "),
        instructions: recipe.instructions,
      });
    }
  }, [open, recipe]);

  const handleSubmit = async () => {
    if (!form.title || !form.ingredients || !form.instructions) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    
    // Show immediate feedback for UX
    toast.loading("Updating recipe...");
    
    try {
      await api.put(
        `/recipes/${recipe.id}`,
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
      
      // Invalidate all recipe-related queries to refresh the data
      await queryClient.invalidateQueries({ queryKey: ["recipes"] });
      await queryClient.invalidateQueries({ queryKey: ["my-recipes"] });
      await queryClient.invalidateQueries({ queryKey: ["favorite-recipes"] });
      
      toast.dismiss();
      toast.success("Recipe updated successfully!");
      onClose();
      onUpdated();
    } catch {
      toast.dismiss();
      toast.error("Failed to update recipe.");
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Recipe</DialogTitle>
        </DialogHeader>

        {/* Form Content */}
        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            placeholder="Ingredients (comma-separated)"
            value={form.ingredients}
            onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
          />
          <Textarea
            placeholder="Instructions"
            value={form.instructions}
            onChange={(e) => setForm({ ...form, instructions: e.target.value })}
          />
        </div>

        <DialogFooter className="flex justify-end">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
