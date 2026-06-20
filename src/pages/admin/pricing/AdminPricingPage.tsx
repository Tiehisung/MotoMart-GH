import { useState } from "react";
import { toast } from "sonner";
import {
  useGetAdminPricingQuery,
  useTogglePricingActiveMutation,
  useDeletePricingMutation,
} from "@/services/pricingApi";
import {
  HiOutlineBanknotes,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineStar,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import { MODAL } from "@/components/modals/Modal";
import { Plus } from "lucide-react";
import { PricingForm } from "./PricingForm";
import { ConfirmDialog } from "@/components/ConfirmDialog";

// MAIN PAGE
const AdminPricingPage = () => {
  const { data, isLoading } = useGetAdminPricingQuery();

  const [toggleActive] = useTogglePricingActiveMutation();
  const [deletePricing] = useDeletePricingMutation();

  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    listing_fee: true,
  });

  const categories = data?.data || [];
  const totalItems = categories.reduce(
    (sum, cat) => sum + cat.options.length,
    0,
  );
  const activeItems = categories.reduce(
    (sum, cat) => sum + cat.options.filter((o) => o.isActive).length,
    0,
  );

  const handleToggle = async (id: string) => {
    try {
      await toggleActive(id).unwrap();
    } catch {
      toast.error("Failed to toggle");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePricing(id).unwrap();
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pricing</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {totalItems} options • {activeItems} active
          </p>
        </div>

        <MODAL
          title={"Add Pricing"}
          modalSize="md"
          showCloseButton
          closeOnOutsideClick={!isLoading}
          closeOnEscape={!isLoading}
          trigger={
            <>
              <Plus className="w-4 h-4" />
              Add Pricing
            </>
          }
          triggerStyles="rounded-xl"
        >
          <PricingForm />
        </MODAL>
      </div>

      {/* Categories */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 bg-card rounded-2xl _shimmer" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {categories?.map((cat) => (
            <div
              key={cat.category}
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(cat.category)}
                className="w-full p-5 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HiOutlineBanknotes className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">
                      {cat.categoryName}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {cat.options.length} option
                      {cat.options.length !== 1 ? "s" : ""} •{" "}
                      {cat.options.filter((o) => o.isActive).length} active
                    </p>
                  </div>
                </div>
                {expandedCategories[cat.category] ? (
                  <HiOutlineChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <HiOutlineChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {/* Options Table */}
              {expandedCategories[cat.category] && (
                <div className="border-t border-border overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase">
                          Option
                        </th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase">
                          Key
                        </th>
                        <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase">
                          Price
                        </th>
                        <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase">
                          Popular
                        </th>
                        <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase">
                          Status
                        </th>
                        <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...cat.options] // ← Create a shallow copy first
                        ?.sort((a, b) => a.displayOrder - b.displayOrder)
                        ?.map((option) => (
                          <tr
                            key={option._id}
                            className={`border-b border-border last:border-0 ${
                              !option.isActive ? "opacity-50 " : ""
                            }`}
                          >
                            <td className="px-4 py-3">
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {option.label}
                                </p>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {option.description}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                {option.key}
                              </code>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span className="text-sm font-bold text-primary">
                                {option.currency}{" "}
                                {option.amount.toFixed(
                                  option.amount % 1 === 0 ? 0 : 2,
                                )}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              {option.isPopular && (
                                <HiOutlineStar className="w-4 h-4 text-warning mx-auto" />
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => handleToggle(option._id)}
                                className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                                  option.isActive
                                    ? "bg-success/10 text-success"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {option.isActive ? (
                                  <HiOutlineEye className="w-3 h-3" />
                                ) : (
                                  <HiOutlineEyeSlash className="w-3 h-3" />
                                )}
                                {option.isActive ? "Active" : "Inactive"}
                              </button>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-1">
                                <MODAL
                                  title={"Edit Pricing"}
                                  modalSize="md"
                                  showCloseButton
                                  closeOnOutsideClick={!isLoading}
                                  closeOnEscape={!isLoading}
                                  trigger={
                                    <>
                                      <HiOutlinePencil className="w-4 h-4 text-muted-foreground" />
                                    </>
                                  }
                                  triggerStyles="rounded-xl"
                                  variant={"ghost"}
                                  triggerSize={"sm"}
                                >
                                  <PricingForm initialData={option} />
                                </MODAL>

                                <ConfirmDialog
                                  onConfirm={() => handleDelete(option._id)}
                                  confirmText="Confirm Delete"
                                  trigger={
                                    <HiOutlineTrash className="w-4 h-4 text-red-400" />
                                  }
                                  triggerStyles="rounded-full w-7 p-1"
                                  size={"sm"}
                                  title={`Do you want to delete "${option?.label}"`}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPricingPage;
