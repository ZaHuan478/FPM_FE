interface CategoryItemProps {
  name: string;
  value: number;
  color: string;
}

export function CategoryItem({ name, value, color }: CategoryItemProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
        <span>{name}</span>
      </div>
      <span className="font-medium">${value}</span>
    </div>
  );
}
