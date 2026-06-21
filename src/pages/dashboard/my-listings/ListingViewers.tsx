import { useGetListingViewersQuery } from "@/services/listingsApi";
import {
  HiOutlineUser,
  HiOutlineEye,
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineUserCircle,
} from "react-icons/hi2";

interface ViewersModalProps {
  listingId: string;
  listingTitle: string;
}

const ListingViewers = ({ listingId, listingTitle }: ViewersModalProps) => {
  const { data, isLoading } = useGetListingViewersQuery(listingId, {
    skip: !listingId,
  });

  const viewers = data?.data?.viewers || [];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GH", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full flex flex-col ">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HiOutlineEye className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Listing Views</h2>
        </div>
      </header>

      {/* Listing info */}
      <div className="bg-muted rounded-xl p-3 mb-4">
        <p className="text-sm font-medium text-foreground">{listingTitle}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {data?.count || 0} unique viewer
          {(data?.count || 0) !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Viewers list */}
      <div className="flex-1 overflow-y-auto -mx-2 px-2">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-14 bg-muted rounded-xl _shimmer" />
            ))}
          </div>
        ) : viewers.length === 0 ? (
          <div className="text-center py-8">
            <HiOutlineUserCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No views yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {viewers.map((viewer, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    viewer.isAuthenticated
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <HiOutlineUser className="w-5 h-5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {viewer.fullName}
                    </p>
                    {!viewer.isAuthenticated && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded-full shrink-0">
                        Guest
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    {viewer.phoneNumber && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <HiOutlinePhone className="w-3 h-3" />
                        {viewer.phoneNumber}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <HiOutlineClock className="w-3 h-3" />
                      {formatDate(viewer.viewedAt)}
                    </span>
                  </div>
                </div>

                {/* Contact button (only for authenticated viewers) */}
                {viewer.isAuthenticated && viewer.phoneNumber && (
                  <a
                    href={`tel:${viewer.phoneNumber}`}
                    className="shrink-0 p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                    title="Call viewer"
                  >
                    <HiOutlinePhone className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer tip */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-[11px] text-muted-foreground text-center">
          💡 Authenticated viewers have registered accounts. You can call them
          directly.
        </p>
      </div>
    </div>
  );
};

export default ListingViewers;
