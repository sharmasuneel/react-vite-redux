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

const SSIRequest = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "SSI Request Created", description: "Your standing settlement instruction has been submitted." });
      setIsSubmitting(false);
      navigate("/");
    }, 1000);
  };

  return (
    <FormPageLayout
      title="SSI Request"
      subtitle="Standing Settlement Instruction"
      icon={Send}
      iconColor="bg-quick-action-ssi"
      onSubmit={handleSubmit}
    >
      <FormSection title="Settlement Details" description="Enter the standing settlement instruction details">
        <div className="space-y-2">
          <Label htmlFor="counterparty">Counterparty</Label>
          <Input id="counterparty" placeholder="Enter counterparty name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="settlementType">Settlement Type</Label>
          <Select>
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
          <Select>
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
          <Input id="effectiveDate" type="date" required />
        </div>
      </FormSection>

      <FormSection title="Beneficiary Information">
        <div className="space-y-2">
          <Label htmlFor="beneficiary">Beneficiary Name</Label>
          <Input id="beneficiary" placeholder="Enter beneficiary" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bic">BIC / SWIFT</Label>
          <Input id="bic" placeholder="Enter BIC or SWIFT code" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountNo">Account Number</Label>
          <Input id="accountNo" placeholder="Enter account number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="intermediary">Intermediary Bank</Label>
          <Input id="intermediary" placeholder="Enter intermediary bank (optional)" />
        </div>
      </FormSection>

      <FormSection title="Additional Information">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" placeholder="Any additional instructions..." rows={4} />
        </div>
      </FormSection>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit SSI Request"}
        </Button>
      </div>
    </FormPageLayout>
  );
};

export default SSIRequest;
