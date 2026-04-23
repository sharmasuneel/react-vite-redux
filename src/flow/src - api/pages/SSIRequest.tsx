import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormPageLayout } from "@/components/workflow/FormPageLayout";
import { FormSection } from "@/components/workflow/FormSection";
import { toast } from "@/hooks/use-toast";
import { useCreateSSIMutation } from "@/store/api/workflowApi";
import type { SSIPayload } from "@/store/api/types";

const SSIRequest = () => {
  const navigate = useNavigate();
  const [createSSI, { isLoading }] = useCreateSSIMutation();
  const [form, setForm] = useState<SSIPayload>({
    counterparty: "", settlementType: "", currency: "", effectiveDate: "",
    beneficiary: "", bic: "", accountNo: "", intermediary: "", notes: "",
  });

  const update = (field: keyof SSIPayload, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    try {
      await createSSI(form).unwrap();
      toast({ title: "SSI Request Created", description: "Your standing settlement instruction has been submitted." });
      navigate("/");
    } catch {
      toast({ title: "Error", description: "Failed to submit SSI request. Please try again.", variant: "destructive" });
    }
  };

  return (
    <FormPageLayout title="SSI Request" subtitle="Standing Settlement Instruction" icon={Send} iconColor="bg-quick-action-ssi" onSubmit={handleSubmit}>
      <FormSection title="Settlement Details" description="Enter the standing settlement instruction details">
        <div className="space-y-2">
          <Label htmlFor="counterparty">Counterparty</Label>
          <Input id="counterparty" placeholder="Enter counterparty name" required value={form.counterparty} onChange={(e) => update("counterparty", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="settlementType">Settlement Type</Label>
          <Select value={form.settlementType} onValueChange={(v) => update("settlementType", v)}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="fx">FX Settlement</SelectItem>
              <SelectItem value="securities">Securities</SelectItem>
              <SelectItem value="money-market">Money Market</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select value={form.currency} onValueChange={(v) => update("currency", v)}>
            <SelectTrigger><SelectValue placeholder="Select currency" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="eur">EUR</SelectItem>
              <SelectItem value="gbp">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="effectiveDate">Effective Date</Label>
          <Input id="effectiveDate" type="date" required value={form.effectiveDate} onChange={(e) => update("effectiveDate", e.target.value)} />
        </div>
      </FormSection>

      <FormSection title="Beneficiary Information">
        <div className="space-y-2">
          <Label htmlFor="beneficiary">Beneficiary Name</Label>
          <Input id="beneficiary" placeholder="Enter beneficiary" required value={form.beneficiary} onChange={(e) => update("beneficiary", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bic">BIC / SWIFT</Label>
          <Input id="bic" placeholder="Enter BIC or SWIFT code" value={form.bic} onChange={(e) => update("bic", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountNo">Account Number</Label>
          <Input id="accountNo" placeholder="Enter account number" value={form.accountNo} onChange={(e) => update("accountNo", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="intermediary">Intermediary Bank</Label>
          <Input id="intermediary" placeholder="Enter intermediary bank (optional)" value={form.intermediary} onChange={(e) => update("intermediary", e.target.value)} />
        </div>
      </FormSection>

      <FormSection title="Additional Information">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" placeholder="Any additional instructions..." rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
        </div>
      </FormSection>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit SSI Request"}
        </Button>
      </div>
    </FormPageLayout>
  );
};

export default SSIRequest;
