import { Link } from "react-router-dom";
import { useGetMyRequestsQuery } from "@/services/listingsApi";
import {
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineCheck,
  HiOutlineUser,
  HiOutlineEye,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

const MyRequestsPage = () => {
  const { data, isLoading } = useGetMyRequestsQuery({});

  const requests = data?.data || [];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GH", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">My Call Requests</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Bikes you've requested calls about
        </p>
      </div>

      {/* Requests List */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-card rounded-2xl _shimmer" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-3xl">
          <HiOutlinePhone className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <h3 className="font-semibold text-foreground">No requests yet</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
            When you request a call about a bike, it will appear here so you can
            track your inquiries.
          </p>
          <Link
            to="/browse"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium"
          >
            Browse Bikes
            <HiOutlineArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-card border border-border rounded-2xl p-5 space-y-4 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Bike thumbnail */}
                <Link
                  to={`/listing/${request.listing?._id}`}
                  className="w-20 h-20 bg-muted rounded-xl overflow-hidden shrink-0"
                >
                  {request.listing?.images?.[0] ? (
                    <img
                      src={request.listing.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaMotorcycle className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                  )}
                </Link>

                {/* Request info */}
                <div className="flex-1 min-w-0">
                  {/* Bike title */}
                  <Link
                    to={`/listing/${request.listing?._id}`}
                    className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                  >
                    {request.listing?.brand} {request.listing?.model}{" "}
                    {request.listing?.year && `(${request.listing?.year})`}
                  </Link>
                  <p className="text-primary font-bold mt-0.5">
                    GHS {request.listing?.price?.toLocaleString()}
                  </p>

                  {/* Seller + Status */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <HiOutlineUser className="w-3 h-3" />
                      {request.seller?.fullName || "Seller"}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlinePhone className="w-3 h-3" />
                      {request.buyerPhone}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineClock className="w-3 h-3" />
                      {formatDate(request.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Status badge */}
                <div className="shrink-0">
                  <Badge
                    variant={
                      request.status == "contacted" ? "success" : "warning"
                    }
                    className="capitalize"
                  >
                    {request.status == "contacted" ? (
                      <HiOutlinePhone className="w-3 h-3" />
                    ) : (
                      <HiOutlineClock className="w-3 h-3" />
                    )}
                    {request.status}
                  </Badge>
                </div>
              </div>

              {/* Notification status */}
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground bg-muted rounded-xl px-3 py-2">
                <span className="flex items-center gap-1">
                  <HiOutlineCheck className="w-3 h-3 text-success" />
                  Seller notified
                </span>
                <span>•</span>
                <span>They will call you at {request.buyerPhone}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <Link
                  to={`/listing/${request.listing?._id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <HiOutlineEye className="w-3.5 h-3.5" />
                  View Bike
                </Link>
                <Link
                  to={`/browse?brand=${request?.listing?.brand}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  Browse Similar
                  <HiOutlineArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequestsPage;
