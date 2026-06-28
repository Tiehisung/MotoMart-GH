import { useGetPendingListingsQuery } from "@/services/adminApi";
import { HiOutlineCheck } from "react-icons/hi2";
import AdminPendingListingCard from "./PendingListingCard";

const AdminListingsPage = () => {
  const { data, isLoading } = useGetPendingListingsQuery({
    limit: 50,
  });

  const listings = data?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Pending Listings
          </h1>
          <div className="text-sm text-muted-foreground mt-0.5">
            {isLoading ? (
              <div className="h-5 w-1/2 _shimmer rounded" />
            ) : (
              `${listings.length} listings awaiting approval`
            )}
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-5 space-y-3 border border-border"
            >
              <div className="h-5 w-1/2 _shimmer rounded-lg" />
              <div className="h-4 w-3/4 _shimmer rounded-lg" />
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-3xl">
          <HiOutlineCheck className="w-16 h-16 text-success/30 mx-auto mb-4" />
          <h3 className="font-semibold text-foreground">All caught up!</h3>
          <p className="text-sm text-muted-foreground mt-1">
            No pending listings to review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing: any) => (
            <AdminPendingListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminListingsPage;
