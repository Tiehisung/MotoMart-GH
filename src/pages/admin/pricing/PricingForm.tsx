import { useState } from "react";
import {
  useCreatePricingMutation,
  useUpdatePricingMutation,
  type IPricingItem,
} from "@/services/pricingApi";
import { HiOutlineStar } from "react-icons/hi2";
import { Input } from "@/components/form";
import { toast } from "sonner";
import { Button } from "@/components/buttons/Button";
import { fireEscape } from "@/hooks/Esc";

// PRICING FORM MODAL
interface PricingFormData {
  category: string;
  categoryName: string;
  key: string;
  label: string;
  description: string;
  amount: number;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  displayOrder: number;
}

const CATEGORIES = [
  { value: "listing_fee", label: "Listing Fees" },
  { value: "featured_boost", label: "Featured Boosts" },
  { value: "verification", label: "Verification Services" },
  { value: "subscription", label: "Seller Subscriptions" },
];

export const PricingForm = ({
  initialData,
}: {
  initialData?: IPricingItem | null;
}) => {
  const [form, setForm] = useState<PricingFormData>({
    category: initialData?.category || "listing_fee",
    categoryName: initialData?.categoryName || "",
    key: initialData?.key || "",
    label: initialData?.label || "",
    description: initialData?.description || "",
    amount: initialData?.amount || 0,
    features: initialData?.features || [],
    isPopular: initialData?.isPopular || false,
    isActive: initialData?.isActive ?? true,
    displayOrder: initialData?.displayOrder || 0,
  });

  const isEditing = !!initialData;
  const [createPricing, { isLoading: isCreating }] = useCreatePricingMutation();
  const [updatePricing, { isLoading: isUpdating }] = useUpdatePricingMutation();

  const handleSubmit = async () => {
    try {
      if (initialData) {
        await updatePricing({ id: initialData._id, data: form }).unwrap();
        toast.success("Pricing updated!");
        fireEscape();
      } else {
        await createPricing({
          ...form,
          features: form.features,
        }).unwrap();
        toast.success("Pricing created!");
        fireEscape();
      }
    } catch (err: any) {
      toast.error("Failed", { description: err?.data?.message });
    }
  };

  return (
    <div className=" w-full space-y-4">
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {/* Category */}
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => {
              const cat = CATEGORIES.find((c) => c.value === e.target.value);
              setForm({
                ...form,
                category: e.target.value,
                categoryName: cat?.label || "",
              });
            }}
            className="w-full px-3 py-2 bg-muted border border-border rounded-xl text-sm"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Key + Label */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Key"
            faintLabel
            value={form.key}
            onChange={(e) =>
              setForm({
                ...form,
                key: e.target.value.toLowerCase().replace(/\s+/g, "_"),
              })
            }
            placeholder="standard"
            className="py-2"
          />

          <Input
            label="Label"
            faintLabel
            className="py-2"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            placeholder="Standard Listing"
          />
        </div>

        {/* Description */}
        <Input
          label="Description"
          faintLabel
          className="py-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Amount + Display Order */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Amount (GHS)"
            faintLabel
            className="py-2"
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
            min={0}
            step={0.01}
          />

          <Input
            label="Display Order"
            faintLabel
            className="py-2"
            type="number"
            value={form.displayOrder}
            onChange={(e) =>
              setForm({ ...form, displayOrder: Number(e.target.value) })
            }
          />
        </div>

        {/* Features */}
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">
            Features (one per line)
          </label>
          <textarea
            value={form.features.join("\n")}
            onChange={(e) =>
              setForm({
                ...form,
                features: e.target.value.split("\n"),
              })
            }
            rows={4}
            className="w-full px-3 py-2 bg-muted border border-border rounded-xl text-sm resize-none"
          />
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isPopular}
              onChange={(e) =>
                setForm({ ...form, isPopular: e.target.checked })
              }
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
            />
            <span className="text-sm flex items-center gap-1.5">
              <HiOutlineStar className="w-4 h-4 text-warning" />
              Popular
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
            />
            <span className="text-sm">Active</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          onClick={() => fireEscape()}
          variant={'secondary'}
          className="flex-1 py-2.5 rounded-xl text-sm font-medium"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          loading={isCreating || isUpdating}
          loadingText="Saving..."
          text={isEditing ? "Update" : "Create"}
          disabled={!form.key || !form.label || form.amount < 0}
          className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium disabled:opacity-50"
        />
      </div>
    </div>
  );
};
