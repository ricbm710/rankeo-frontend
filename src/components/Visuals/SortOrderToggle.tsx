type SortOrder = "Asc" | "Desc";

type SortOrderToggleProps = {
  selected: SortOrder;
  onChange: (value: SortOrder) => void;
};

export function SortOrderToggle({ selected, onChange }: SortOrderToggleProps) {
  const isDesc = selected === "Desc";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`text-sm font-medium ${
          isDesc ? "text-black" : "text-gray-600"
        }`}
      >
        Desc
      </span>

      <div
        onClick={() => onChange(isDesc ? "Asc" : "Desc")}
        className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer"
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-col2 rounded-full transition-transform duration-300 ${
            isDesc ? "" : "translate-x-6"
          }`}
        />
      </div>

      <span
        className={`text-sm font-medium ${
          !isDesc ? "text-black" : "text-gray-600"
        }`}
      >
        Asc
      </span>
    </div>
  );
}
