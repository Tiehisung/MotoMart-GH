export const ListingCardSkeleton = () => {
  return (
    <div className="bg-surface-elevated rounded-2xl overflow-hidden border border-border">
      <div className="aspect-4/3 _shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 _shimmer rounded-lg" />
        <div className="h-5 w-1/3 _shimmer rounded-lg" />
        <div className="h-3 w-1/2 _shimmer rounded-lg" />
      </div>
    </div>
  );
};
