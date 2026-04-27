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
import { useCreateCustomerMutation } from "@/store/api/workflowApi";
import type { CustomerPayload } from "@/store/api/types";

const AddCustomer = () => {
  const navigate = useNavigate();
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const [form, setForm] = useState<CustomerPayload>({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", customerType: "", sun: "", department: "", address: "",
  });

  const update = (field: keyof CustomerPayload, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    try {
      await createCustomer(form).unwrap();
      toast({ title: "Customer Added", description: "New customer has been created successfully." });
      navigate("/");
    } catch {
      toast({ title: "Error", description: "Failed to add customer. Please try again.", variant: "destructive" });
    }
  };

  return (
    <FormPageLayout title="Add Customer" subtitle="Create a new customer entry" icon="customer" iconColor="bg-quick-action-customer" onSubmit={handleSubmit}>
      <FormSection title="Customer Details" description="Enter the customer information">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="Enter first name" required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Enter last name" required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="customer@example.com" required value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="+1 (000) 000-0000" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
      </FormSection>

      <FormSection title="Organization">
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" placeholder="Enter company name" value={form.company} onChange={(e) => update("company", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerType">Customer Type</Label>
          <Select value={form.customerType} onValueChange={(v) => update("customerType", v)}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="institutional">Institutional</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sun">SUN</Label>
          <Input id="sun" placeholder="Enter SUN number" value={form.sun} onChange={(e) => update("sun", e.target.value)} />
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
      </FormSection>

      <FormSection title="Address">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="address">Full Address</Label>
          <Textarea id="address" placeholder="Enter full address..." rows={3} value={form.address} onChange={(e) => update("address", e.target.value)} />
        </div>
      </FormSection>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Add Customer"}
        </Button>
      </div>
    </FormPageLayout>
  );
};

export default AddCustomer;
