import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetMyLeadsQuery,
  useMarkLeadContactedMutation,
} from "@/services/listingsApi";
import { HiOutlinePhone, HiOutlineClock } from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa";
import { IListing } from "@/types/listing";
import { Button } from "@/components/buttons/Button";
import { PrimaryDropdown } from "@/components/Dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MdConnectWithoutContact } from "react-icons/md";
import { Badge } from "@/components/ui/badge";

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "pending", label: "New" },
  { value: "contacted", label: "Contacted" },
];

const MyLeadsPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useGetMyLeadsQuery({
    status: statusFilter !== "all" ? statusFilter : undefined,
    page,
    limit: 20,
  });
  const [markContacted, { isLoading: isMarkingAsContacted }] =
    useMarkLeadContactedMutation();

  const leads = data?.data || [];
  const stats = data?.stats;
  const pagination = data?.pagination;

  // console.log(data)

  const handleMarkContacted = async (id: string) => {
    try {
      await markContacted(id).unwrap();
      toast.success("Marked as contacted");
      refetch();
    } catch {
      toast.error("Failed to update");
    }
  };

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
        <h1 className="text-xl font-bold text-foreground">Buyer Leads</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          People who want to buy your bikes
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Total Leads",
              value: stats.total || 0,
              color: "bg-primary/10 text-primary",
            },
            {
              label: "New",
              value: stats.new || 0,
              color: "bg-warning/10 text-warning",
            },
            {
              label: "Contacted",
              value: stats.contacted || 0,
              color: "bg-success/10 text-success",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl p-4 text-center ${stat.color}`}
            >
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Status Tabs */}
      <div className="flex gap-1.5 overflow-x-auto">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setStatusFilter(tab.value);
              setPage(1);
            }}
            className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              statusFilter === tab.value
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground border border-border hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leads List */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-card rounded-2xl _shimmer" />
          ))}
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-3xl">
          <HiOutlinePhone className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
          <h3 className="font-semibold text-foreground">No leads yet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            When someone requests a call, it will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => {
            const listing = lead?.listing as IListing;
            return (
              <div
                key={lead._id}
                className={`bg-card border rounded-2xl p-5 space-y-4 ${
                  lead.status === "pending"
                    ? "border-warning/30"
                    : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Listing thumbnail */}
                    <Link
                      to={`/listing/${listing?._id}`}
                      className="w-16 h-16 bg-muted rounded-xl overflow-hidden shrink-0"
                    >
                      {listing?.images?.[0] ? (
                        <img
                          src={listing.images[0]}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaMotorcycle className="w-6 h-6 text-muted-foreground/30" />
                        </div>
                      )}
                    </Link>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground truncate">
                          {lead.buyer?.fullName || "Buyer"}
                        </h3>
                        {lead.status === "pending" && (
                          <span className="w-2 h-2 bg-success rounded-full animate-pulse shrink-0" />
                        )}
                      </div>
                      <Link
                        to={`/listing/${listing?._id}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {listing?.brand} {listing?.model} — GHS{" "}
                        {listing?.price?.toLocaleString()}
                      </Link>
                      <div className="flex items-center flex-wrap gap-3 mt-1.5 text-xs text-muted-foreground">
                        <a
                          href={`tel:${lead.buyerPhone}`}
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <HiOutlinePhone className="w-3 h-3" />
                          {lead.buyerPhone}
                        </a>
                        <span className="flex items-center gap-1 whitespace-nowrap">
                          <HiOutlineClock className="w-3 h-3 shrink-0" />
                          {formatDate(lead?.createdAt?.toString())}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status + Action */}

                  <PrimaryDropdown>
                    <DropdownMenuItem
                      className="text-sm font-light"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMarkContacted(lead._id);
                      }}
                    >
                      <MdConnectWithoutContact /> Mark Contacted
                    </DropdownMenuItem>
                  </PrimaryDropdown>
                </div>

                {/* Notification info */}
                <div className="flex items-center flex-wrap gap-3 text-[11px] text-muted-foreground bg-muted rounded-xl px-3 py-2">
                  <span>Channels:</span>

                  <div className="divide-x flex flex-wrap font-light">
                    {lead?.notifications
                      ?.filter((notf) => notf.success)
                      ?.map((n) => (
                        <span key={n.channel} className="px-2 capitalize">
                          {n.channel}
                        </span>
                      ))}
                  </div>

                  <Badge
                    variant={
                      lead.status == "pending" ? "destructive" : "secondary"
                    }
                    className="capitalize text-xs font-light"
                  >
                    {lead?.status}
                  </Badge>

                  {lead.status !== "contacted" && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleMarkContacted(lead._id)}
                      loading={isMarkingAsContacted}
                      className="text-[10px] text-primary whitespace-nowrap"
                      loadingText="Updating status..."
                    >
                      Mark Contacted
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-2 bg-card border border-border rounded-xl text-sm disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
            disabled={page === pagination.pages}
            className="px-3 py-2 bg-card border border-border rounded-xl text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyLeadsPage;

// const Notifications=({notifications}:{notifications:ILead['notifications']})=>{
//   const sms = notifications?.find(n=>n.channel=='sms'&&n.success)

// }
