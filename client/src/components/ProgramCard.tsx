type ProgramCardProps = {
  title: string;
  description: string;
  actors: string;
};

function ProgramCard({ title, description, actors }: ProgramCardProps) {
  return (
    <div className="program-card">
      <div className="program-image">🔳</div>
      <div className="program-title">{title}</div>
      <div className="program-description">{description}</div>
      <div className="program-actors">{actors}</div>
    </div>
  );
}

export default ProgramCard;
