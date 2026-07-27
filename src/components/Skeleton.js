export const Skeleton = ({ count = 8 }) => {
  return (
    <div className="flex justify-start flex-wrap">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="w-[280px] m-3">
          <div className="rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden animate-pulse">
            <div className="aspect-[2/3] bg-gray-300 dark:bg-gray-600" />
          </div>
          <div className="mt-3 px-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};
