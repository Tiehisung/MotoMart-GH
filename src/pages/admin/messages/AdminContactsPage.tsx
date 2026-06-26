import { useState } from "react";
import { toast } from "sonner";
import {
  useGetAdminContactsQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
} from "@/services/contactApi";

import {
  HiOutlineEnvelope,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import { MessageCard } from "./MessageCard";
import Loader from "@/components/loaders/Loader";

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
  { value: "closed", label: "Closed" },
];

const INQUIRY_TYPES = [
  { value: "all", label: "All Types" },
  { value: "buying", label: "Buying" },
  { value: "selling", label: "Selling" },
  { value: "verification", label: "Verification" },
  { value: "payment", label: "Payment" },
  { value: "listing", label: "Listing Help" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

const AdminContactsPage = () => {
  const [statusFilter, setStatusFilter] = useState("new");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const queryParams: Record<string, any> = { page, limit: 15 };
  if (statusFilter !== "all") queryParams.status = statusFilter;
  if (typeFilter !== "all") queryParams.inquiryType = typeFilter;

  const { data, isLoading, refetch } = useGetAdminContactsQuery(queryParams);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateContactStatusMutation();
  const [deleteContact] = useDeleteContactMutation();

  const contacts = data?.data || [];
  const pagination = data?.pagination;

  // HANDLERS

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Marked as ${status}`);
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id).unwrap();
      toast.success("Message deleted");
      if (expandedId === id) setExpandedId(null);
      refetch();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // RENDER

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Contact Messages
          </h1>
          <div className="flex items-center text-sm text-muted-foreground mt-0.5">
            {isLoading ? <Loader size="xs" /> : pagination?.total || 0} total
            messages
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
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
        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setPage(1);
          }}
          className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs text-muted-foreground sm:ml-auto"
        >
          {INQUIRY_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Messages */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-5 space-y-3 border border-border"
            >
              <div className="h-5 w-1/3 _shimmer rounded-lg" />
              <div className="h-4 w-2/3 _shimmer rounded-lg" />
            </div>
          ))}
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-3xl">
          <HiOutlineEnvelope className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <h3 className="font-semibold text-foreground">No messages</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {statusFilter === "new"
              ? "All caught up! No new messages."
              : `No ${statusFilter} messages`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <MessageCard
              key={contact._id}
              contact={contact}
              isExpanded={expandedId === contact._id}
              isUpdating={isUpdating}
              onToggleExpand={handleToggleExpand}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-2 bg-card border border-border rounded-xl text-sm disabled:opacity-50 hover:bg-muted transition-colors"
          >
            <HiOutlineChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-muted-foreground px-4">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
            disabled={page === pagination.pages}
            className="px-3 py-2 bg-card border border-border rounded-xl text-sm disabled:opacity-50 hover:bg-muted transition-colors"
          >
            <HiOutlineChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminContactsPage;

// const MessageCard = ({
//   contact,
//   onClick,
//   isExpanded,
// }: {
//   contact: IContactMessage;
//   onClick?: () => void;
//   isExpanded?: boolean;
// }) => {
//   const [updateStatus, { isLoading: isUpdating }] =
//     useUpdateContactStatusMutation();
//   const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

//   const statusStyle = STATUS_CONFIG[contact.status] || STATUS_CONFIG.new;
//   const StatusIcon = statusStyle.icon;

//   const [expandedId, setExpandedId] = useState<string | null>(null);

//   const handleStatusChange = async (id: string, status: string) => {
//     try {
//       await updateStatus({ id, status }).unwrap();
//       toast.success(`Marked as ${status}`);
//       //   refetch();
//     } catch {
//       toast.error("Failed to update status");
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteContact(id).unwrap();
//       toast.success("Message deleted");
//       if (expandedId === id) setExpandedId(null);
//       //   refetch();
//     } catch {
//       toast.error("Failed to delete");
//     }
//   };

//   const toggleExpand = (id: string) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleDateString("en-GH", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };
//   return (
//     <div
//       key={contact._id}
//       className={`bg-card border rounded-2xl transition-all ${
//         contact.status === "new"
//           ? "border-warning/30 shadow-[0_0_15px_rgba(234,179,8,0.05)]"
//           : "border-border"
//       }`}
//     >
//       {/* Summary Row */}
//       <button
//         onClick={() => toggleExpand(contact._id)}
//         className="w-full p-5 text-left"
//       >
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex items-start gap-3 flex-1 min-w-0">
//             {/* Avatar */}
//             <div
//               className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${statusStyle.bg}`}
//             >
//               {contact.status === "new" ? (
//                 <StatusIcon className={`w-5 h-5 ${statusStyle.color}`} />
//               ) : (
//                 <HiOutlineUser className={`w-5 h-5 ${statusStyle.color}`} />
//               )}
//             </div>

//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2">
//                 <h3
//                   className={`font-semibold text-foreground ${contact.status === "new" ? "" : ""}`}
//                 >
//                   {contact.fullName}
//                 </h3>
//                 {contact.status === "new" && (
//                   <span className="w-2 h-2 bg-warning rounded-full animate-pulse" />
//                 )}
//               </div>
//               <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted-foreground">
//                 <span className="flex items-center gap-1">
//                   <HiOutlinePhone className="w-3 h-3" />
//                   {contact.phoneNumber}
//                 </span>
//                 {contact.email && (
//                   <span className="flex items-center gap-1">
//                     <HiOutlineEnvelope className="w-3 h-3" />
//                     {contact.email}
//                   </span>
//                 )}
//                 <span className="flex items-center gap-1">
//                   <HiOutlineTag className="w-3 h-3" />
//                   {contact.inquiryType}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 shrink-0">
//             <span
//               className={`text-xs px-2 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.color}`}
//             >
//               {statusStyle.label}
//             </span>
//             <span className="text-xs text-muted-foreground">
//               <HiOutlineClock className="w-3 h-3 inline mr-1" />
//               {formatDate(contact.createdAt)}
//             </span>
//           </div>
//         </div>

//         {/* Preview of message */}
//         {contact.message && !isExpanded && (
//           <p className="mt-3 text-sm text-muted-foreground line-clamp-2 pl-13 ml-10">
//             {contact.message}
//           </p>
//         )}
//       </button>

//       {/* Expanded Content */}
//       {isExpanded && (
//         <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
//           {/* Full message */}
//           {contact.message ? (
//             <div className="bg-muted rounded-xl p-4">
//               <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
//                 Message
//               </p>
//               <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
//                 {contact.message}
//               </p>
//             </div>
//           ) : (
//             <p className="text-sm text-muted-foreground italic">
//               No message provided
//             </p>
//           )}

//           {/* Contact details grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//             <div>
//               <p className="text-xs text-muted-foreground">Name</p>
//               <p className="text-sm font-medium text-foreground">
//                 {contact.fullName}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-muted-foreground">Phone</p>
//               <a
//                 href={`tel:${contact.phoneNumber}`}
//                 className="text-sm font-medium text-primary hover:underline"
//               >
//                 {contact.phoneNumber}
//               </a>
//             </div>
//             {contact.email && (
//               <div>
//                 <p className="text-xs text-muted-foreground">Email</p>
//                 <a
//                   href={`mailto:${contact.email}`}
//                   className="text-sm font-medium text-primary hover:underline"
//                 >
//                   {contact.email}
//                 </a>
//               </div>
//             )}
//             <div>
//               <p className="text-xs text-muted-foreground">Type</p>
//               <p className="text-sm font-medium text-foreground capitalize">
//                 {contact.inquiryType}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-muted-foreground">Status</p>
//               <span
//                 className={`text-xs px-2 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.color}`}
//               >
//                 {statusStyle.label}
//               </span>
//             </div>
//             <div>
//               <p className="text-xs text-muted-foreground">Received</p>
//               <p className="text-sm font-medium text-foreground">
//                 {formatDate(contact.createdAt)}
//               </p>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center flex-wrap gap-2 pt-2">
//             {contact.status !== "read" && (
//               <button
//                 onClick={() => handleStatusChange(contact._id, "read")}
//                 disabled={isUpdating}
//                 className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground
//                             hover:text-foreground hover:bg-muted rounded-lg transition-colors"
//               >
//                 <HiOutlineEye className="w-3.5 h-3.5" />
//                 Mark Read
//               </button>
//             )}
//             {contact.status !== "replied" && (
//               <button
//                 onClick={() => handleStatusChange(contact._id, "replied")}
//                 disabled={isUpdating}
//                 className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-success
//                             hover:bg-success/5 rounded-lg transition-colors"
//               >
//                 <HiOutlineCheck className="w-3.5 h-3.5" />
//                 Mark Replied
//               </button>
//             )}
//             {contact.status !== "closed" && (
//               <button
//                 onClick={() => handleStatusChange(contact._id, "closed")}
//                 disabled={isUpdating}
//                 className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground
//                             hover:text-foreground hover:bg-muted rounded-lg transition-colors"
//               >
//                 <HiOutlineXMark className="w-3.5 h-3.5" />
//                 Close
//               </button>
//             )}
//             <div className="flex-1" />
//             <ConfirmDialog
//               onConfirm={() => handleDelete(contact._id)}
//               confirmText="Confirm Delete"
//               trigger={<HiOutlineTrash className="w-4 h-4 text-red-400" />}
//               triggerStyles="rounded-full w-7 p-1"
//               size={"sm"}
//               title={`Delete this message permanently?`}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
