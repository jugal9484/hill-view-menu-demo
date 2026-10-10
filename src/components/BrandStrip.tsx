const brands = [
  { name: 'Amul', what: 'butter & cheese' },
  { name: 'Dlecta', what: 'cheese & dairy cream' },
  { name: 'National Dairy', what: 'malai paneer' },
  { name: 'Davda', what: 'paneer & curd' },
  { name: 'Fortune', what: 'sunflower & mustard oil' },
];

export function BrandStrip({ className = '' }: { className?: string }) {
  return (
    <section aria-labelledby="brands-title" className={className}>
      <h2 id="brands-title" className="mb-2 px-4 text-[12.5px] font-medium text-muted md:px-6 lg:px-0">
        Cooked with trusted brands
      </h2>
      <ul className="no-scrollbar edge-fade flex gap-2 overflow-x-auto px-4 pb-1 md:px-6 lg:flex-wrap lg:overflow-visible lg:px-0 lg:[-webkit-mask-image:none] lg:[mask-image:none]">
        {brands.map((b) => (
          <li
            key={b.name}
            className="flex shrink-0 items-baseline gap-1.5 rounded-full border border-hairline bg-card px-3.5 py-2 text-[12.5px] leading-none"
          >
            <span className="font-semibold text-ink">{b.name}</span>
            <span className="text-muted">{b.what}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
