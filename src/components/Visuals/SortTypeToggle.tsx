// components/SortTypeToggle.tsx
type SortType = "relevance" | "date";

type SortTypeToggleProps = {
  selected: SortType;
  onChange: (value: SortType) => void;
};

export function SortTypeToggle({ selected, onChange }: SortTypeToggleProps) {
  const isRight = selected === "date";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`text-sm font-medium ${
          !isRight ? "text-black" : "text-gray-600"
        }`}
      >
        Relevancia
      </span>

      <div
        onClick={() => onChange(isRight ? "relevance" : "date")}
        className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer"
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-col2 rounded-full transition-transform duration-300 ${
            isRight ? "translate-x-6" : ""
          }`}
        />
      </div>

      <span
        className={`text-sm font-medium ${
          isRight ? "text-black" : "text-gray-600"
        }`}
      >
        Fecha
      </span>
    </div>
  );
}
