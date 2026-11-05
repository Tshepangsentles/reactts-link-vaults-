interface TagProps {
  label: string;
  onClick?: () => void;
}

export default function Tag({ label, onClick }: TagProps) {
  return (
    <button
      type="button"
      className="tag"
      onClick={onClick}
      title={onClick ? `Filter by ${label}` : label}
    >
      #{label}
    </button>
  );
}
