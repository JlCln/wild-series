import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProgramDeleteForm from "../components/ProgramDeleteForm";

type Program = {
  id: number;
  title: string;
};

interface FetchProgramResponse {
  id: number;
  title: string;
}

const fetchProgram = async (
  id: string | undefined,
): Promise<FetchProgramResponse | undefined> => {
  if (!id) {
    console.error("No program ID provided");
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/programs/${id}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: FetchProgramResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching program:", error);
    throw error;
  }
};

function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState(null as null | Program);

  useEffect(() => {
    const getProgram = async () => {
      try {
        const data = await fetchProgram(id);
        if (data) {
          setProgram(data);
        }
      } catch (error) {
        console.error("Error setting program:", error);
      }
    };

    getProgram();
  }, [id]);

  if (!program) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Titre : {program.title}</h2>
      <Link to={`/programs/${program.id}/edit`}>
        <button type="button" className="edit-button">
          Modifier
        </button>
      </Link>
      <ProgramDeleteForm id={program.id}>
        <button type="button" className="delete-button">
          Supprimer
        </button>
      </ProgramDeleteForm>
    </div>
  );
}

export default ProgramDetail;
