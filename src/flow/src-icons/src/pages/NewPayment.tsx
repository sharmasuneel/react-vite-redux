import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormPageLayout } from "@/components/workflow/FormPageLayout";
import { FormSection } from "@/components/workflow/FormSection";
import { toast } from "@/hooks/use-toast";
import { useCreatePaymentMutation } from "@/store/api/workflowApi";
import type { PaymentPayload } from "@/store/api/types";

const NewPayment = () => {
  const navigate = useNavigate();
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const [form, setForm] = useState<PaymentPayload>({
    payee: "", amount: 0, currency: "", paymentType: "",
    account: "", routing: "", department: "", reference: "", notes: "",
  });

  const update = (field: keyof PaymentPayload, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    try {
      await createPayment(form).unwrap();
      toast({ title: "Payment Created", description: "Your payment request has been submitted successfully." });
      navigate("/");
    } catch {
      toast({ title: "Error", description: "Failed to submit payment. Please try again.", variant: "destructive" });
    }
  };

  return (
    <FormPageLayout title="New Payment" subtitle="Create a new payment request" icon="payment" iconColor="bg-quick-action-payment" onSubmit={handleSubmit}>
      <FormSection title="Payment Details" description="Enter the payment information">
        <div className="space-y-2">
          <Label htmlFor="payee">Payee Name</Label>
          <Input id="payee" placeholder="Enter payee name" required value={form.payee} onChange={(e) => update("payee", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" type="number" step="0.01" placeholder="0.00" required value={form.amount || ""} onChange={(e) => update("amount", parseFloat(e.target.value) || 0)} />
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
          <Label htmlFor="paymentType">Payment Type</Label>
          <Select value={form.paymentType} onValueChange={(v) => update("paymentType", v)}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="wire">Wire Transfer</SelectItem>
              <SelectItem value="ach">ACH</SelectItem>
              <SelectItem value="check">Check</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FormSection>

      <FormSection title="Account Information">
        <div className="space-y-2">
          <Label htmlFor="account">Account Number</Label>
          <Input id="account" placeholder="Enter account number" value={form.account} onChange={(e) => update("account", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="routing">Routing / SWIFT</Label>
          <Input id="routing" placeholder="Enter routing or SWIFT code" value={form.routing} onChange={(e) => update("routing", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select value={form.department} onValueChange={(v) => update("department", v)}>
            <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="itsd">ITSD - Development</SelectItem>
              <SelectItem value="jre">JRE - Development 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="reference">Reference</Label>
          <Input id="reference" placeholder="Payment reference" value={form.reference} onChange={(e) => update("reference", e.target.value)} />
        </div>
      </FormSection>

      <FormSection title="Additional Notes">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" placeholder="Add any additional notes..." rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
        </div>
      </FormSection>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Payment"}
        </Button>
      </div>
    </FormPageLayout>
  );
};

export default NewPayment;
