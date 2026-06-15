import { ConfirmDialog } from "@/components/ConfirmDialog";
import { IContactMessage } from "@/services/contactApi";
import { HiOutlineEnvelope, HiOutlineEnvelopeOpen, HiOutlineChatBubbleLeftRight, HiOutlineCheck, HiOutlineUser, HiOutlinePhone, HiOutlineTag, HiOutlineClock, HiOutlineEye, HiOutlineXMark, HiOutlineTrash } from "react-icons/hi2";

const STATUS_CONFIG: Record<
  string,
  { icon: any; color: string; bg: string; label: string }
> = {
  new: {
    icon: HiOutlineEnvelope,
    color: "text-warning",
    bg: "bg-warning/5",
    label: "New",
  },
  read: {
    icon: HiOutlineEnvelopeOpen,
    color: "text-info",
    bg: "bg-info/5",
    label: "Read",
  },
  replied: {
    icon: HiOutlineChatBubbleLeftRight,
    color: "text-success",
    bg: "bg-success/5",
    label: "Replied",
  },
  closed: {
    icon: HiOutlineCheck,
    color: "text-muted-foreground",
    bg: "bg-muted",
    label: "Closed",
  },
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-GH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

interface MessageCardProps {
  contact: IContactMessage;
  isExpanded: boolean;
  isUpdating: boolean;
  onToggleExpand: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export const MessageCard = ({
  contact,
  isExpanded,
  isUpdating,
  onToggleExpand,
  onStatusChange,
  onDelete,
}: MessageCardProps) => {
  const statusStyle = STATUS_CONFIG[contact.status] || STATUS_CONFIG.new;
  const StatusIcon = statusStyle.icon;

  return (
    <div
      className={`bg-card border rounded-2xl transition-all ${
        contact.status === "new"
          ? "border-warning/30 shadow-[0_0_15px_rgba(234,179,8,0.05)]"
          : "border-border"
      }`}
    >
      {/* ============ SUMMARY ROW ============ */}
      <button
        onClick={() => onToggleExpand(contact._id)}
        className="w-full p-5 text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${statusStyle.bg}`}
            >
              {contact.status === "new" ? (
                <StatusIcon className={`w-5 h-5 ${statusStyle.color}`} />
              ) : (
                <HiOutlineUser className={`w-5 h-5 ${statusStyle.color}`} />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">
                  {contact.fullName}
                </h3>
                {contact.status === "new" && (
                  <span className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <HiOutlinePhone className="w-3 h-3" />
                  {contact.phoneNumber}
                </span>
                {contact.email && (
                  <span className="flex items-center gap-1">
                    <HiOutlineEnvelope className="w-3 h-3" />
                    {contact.email}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <HiOutlineTag className="w-3 h-3" />
                  {contact.inquiryType}
                </span>
              </div>
            </div>
          </div>

          {/* Status + Date */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.color}`}
            >
              {statusStyle.label}
            </span>
            <span className="text-xs text-muted-foreground">
              <HiOutlineClock className="w-3 h-3 inline mr-1" />
              {formatDate(contact.createdAt)}
            </span>
          </div>
        </div>

        {/* Message Preview (collapsed) */}
        {contact.message && !isExpanded && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2 pl-13 ml-10">
            {contact.message}
          </p>
        )}
      </button>

      {/* ============ EXPANDED CONTENT ============ */}
      {isExpanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
          {/* Full message */}
          {contact.message ? (
            <div className="bg-muted rounded-xl p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Message
              </p>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {contact.message}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No message provided
            </p>
          )}

          {/* Contact details grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <DetailItem label="Name" value={contact.fullName} />
            <DetailItem
              label="Phone"
              value={contact.phoneNumber}
              href={`tel:${contact.phoneNumber}`}
            />
            {contact.email && (
              <DetailItem
                label="Email"
                value={contact.email}
                href={`mailto:${contact.email}`}
              />
            )}
            <DetailItem label="Type" value={contact.inquiryType} capitalize />
            <DetailItem label="Status">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.color}`}
              >
                {statusStyle.label}
              </span>
            </DetailItem>
            <DetailItem
              label="Received"
              value={formatDate(contact.createdAt)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center flex-wrap gap-2 pt-2">
            {contact.status !== "read" && (
              <ActionButton
                icon={HiOutlineEye}
                label="Mark Read"
                onClick={() => onStatusChange(contact._id, "read")}
                disabled={isUpdating}
              />
            )}
            {contact.status !== "replied" && (
              <ActionButton
                icon={HiOutlineCheck}
                label="Mark Replied"
                onClick={() => onStatusChange(contact._id, "replied")}
                disabled={isUpdating}
                className="text-success hover:bg-success/5"
              />
            )}
            {contact.status !== "closed" && (
              <ActionButton
                icon={HiOutlineXMark}
                label="Close"
                onClick={() => onStatusChange(contact._id, "closed")}
                disabled={isUpdating}
              />
            )}
            <div className="flex-1" />
            <ConfirmDialog
              onConfirm={() => onDelete(contact._id)}
              confirmText="Delete"
              trigger={<HiOutlineTrash className="w-4 h-4 text-red-400" />}
              triggerStyles="rounded-full w-7 p-1 hover:bg-destructive/5"
              size="sm"
              title="Delete this message permanently?"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// SUB-COMPONENTS
// ============================================

interface DetailItemProps {
  label: string;
  value?: string;
  href?: string;
  capitalize?: boolean;
  children?: React.ReactNode;
}

const DetailItem = ({
  label,
  value,
  href,
  capitalize,
  children,
}: DetailItemProps) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    {children ? (
      children
    ) : href ? (
      <a
        href={href}
        className="text-sm font-medium text-primary hover:underline"
      >
        {value}
      </a>
    ) : (
      <p
        className={`text-sm font-medium text-foreground ${capitalize ? "capitalize" : ""}`}
      >
        {value}
      </p>
    )}
  </div>
);

interface ActionButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ActionButton = ({
  icon: Icon,
  label,
  onClick,
  disabled,
  className = "",
}: ActionButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground
      hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-50 ${className}`}
  >
    <Icon className="w-3.5 h-3.5" />
    {label}
  </button>
);
