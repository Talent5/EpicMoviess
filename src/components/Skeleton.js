export const Skeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 px-8 lg:px-16">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="w-full">
          <div className="aspect-[2/3] bg-charcoal rounded-cards animate-pulse" />
          <div className="mt-2 px-1 space-y-1.5">
            <div className="h-3 bg-charcoal rounded animate-pulse w-3/4" />
            <div className="h-2.5 bg-charcoal rounded animate-pulse w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};
