import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgramCard from "../components/ProgramCard";

interface Program {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
}

function ProgramIndex() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((response) => response.json())
      .then((data) => setPrograms(data))
      .catch((error) => console.error("Error fetching programs:", error));
  }, []);

  return (
    <div className="program-index">
      <div className="programs-grid">
        {programs.map((program) => (
          <Link
            to={`/programs/${program.id}`}
            key={program.id}
            className="program-link"
          >
            <ProgramCard
              title={program.title}
              description={program.synopsis}
              actors="Casting information"
            />
          </Link>
        ))}
      </div>

      <Link to="/programs/new" className="black-button">
        Ajouter une série
      </Link>
    </div>
  );
}

export default ProgramIndex;
