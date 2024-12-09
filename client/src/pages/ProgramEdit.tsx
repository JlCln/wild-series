import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProgramForm from "../components/ProgramForm";

function ProgramEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
        .then((res) => res.json())
        .then((data) => setProgram(data))
        .catch((error) => {
          console.error("Error fetching program:", error);
          if (error instanceof Error) {
            if (error instanceof Error) {
              setError(error.message);
            } else {
              setError("An unknown error occurred");
            }
          } else {
            setError("An unknown error occurred");
          }
        });
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!program) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Modifier la série</h2>
      <ProgramForm
        defaultValue={program}
        onSubmit={async (programData) => {
          try {
            const formattedData = {
              title: programData.title,
              synopsis: programData.synopsis || "",
              poster: programData.poster || "",
              country: programData.country || "",
              year: Number(programData.year),
              category_id: Number(programData.category_id),
            };

            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/programs/${id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
              },
            );

            if (!response.ok) {
              const errorData = await response.json();
              console.error("Server validation errors:", errorData);
              throw new Error(errorData.error || "Update failed");
            }

            navigate("/programs");
          } catch (error) {
            if (error instanceof Error) {
              setError(error.message);
            } else {
              setError("An unknown error occurred");
            }
          }
        }}
      >
        <button type="button" className="edit-button">
          Modifier
        </button>
      </ProgramForm>

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default ProgramEdit;
