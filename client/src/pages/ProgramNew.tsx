import { useNavigate } from "react-router-dom";
import ProgramForm from "../components/ProgramForm";

function ProgramNew() {
  const navigate = useNavigate();

  const newProgram = {
    title: "",
    synopsis: "",
    poster: "",
    country: "France",
    year: 2000,
    category_id: 1,
  };

  interface ProgramData {
    title: string;
    synopsis: string;
    poster: string;
    country: string;
    year: number;
    category_id: number;
  }

  const handleSubmit = async (programData: ProgramData): Promise<void> => {
    try {
      if (!programData.title || !programData.category_id) {
        throw new Error("Title and category_id are required");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/programs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create program");
      }

      const result = await response.json();
      console.info("Série ajoutée avec succès:", result);
      navigate("/programs");
    } catch (error) {
      console.error("Error adding new series:", error);
      throw error;
    }
  };

  return (
    <div>
      <h2>Ajouter une nouvelle série</h2>
      <ProgramForm defaultValue={newProgram} onSubmit={handleSubmit}>
        <button type="button" className="add-button">
          Ajouter
        </button>
      </ProgramForm>
    </div>
  );
}

export default ProgramNew;
