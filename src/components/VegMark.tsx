export function VegMark({ className = '' }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Vegetarian"
      className={`inline-grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border-[1.5px] border-veg bg-white ${className}`}
    >
      <span className="h-[7px] w-[7px] rounded-full bg-veg" />
    </span>
  );
}
