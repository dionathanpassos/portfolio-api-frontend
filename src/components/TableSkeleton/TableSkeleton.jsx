export default function TableSkeleton() {
  return (
    <div className="animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div key={index} className=" gap-4 px-4 py-2 items-center">
          <div className="h-4 w-full rounded bg-surface-elevated p-4"></div>
        </div>
      ))}
    </div>
  );
}
