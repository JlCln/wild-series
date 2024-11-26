import { useEffect, useState } from "react";

interface Program {
  id: number;
  title: string;
}

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((response) => response.json())
      .then((data) => setPrograms(data))
      .catch((error) => console.error("Error fetching programs:", error));
  }, []);

  return (
    <div>
      <h1>Wild Series</h1>
      <p>La liste de nos séries!</p>
      <ul>
        {programs.map((program) => (
          <li key={program.id}>{program.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Programs;
