import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormPageLayout } from "@/components/workflow/FormPageLayout";
import { FormSection } from "@/components/workflow/FormSection";
import { toast } from "@/hooks/use-toast";
import { useCreateRequestMutation } from "@/store/api/workflowApi";
import type { RequestPayload } from "@/store/api/types";

const NewRequest = () => {
  const navigate = useNavigate();
  const [createRequest, { isLoading }] = useCreateRequestMutation();
  const [form, setForm] = useState<RequestPayload>({
    title: "", instructionType: "", priority: "", sun: "",
    department: "", team: "", description: "",
  });

  const update = (field: keyof RequestPayload, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    try {
      await createRequest(form).unwrap();
      toast({ title: "Request Created", description: "Your request has been submitted successfully." });
      navigate("/");
    } catch {
      toast({ title: "Error", description: "Failed to submit request. Please try again.", variant: "destructive" });
    }
  };

  return (
    <FormPageLayout title="New Request" subtitle="Submit a new request form" icon={FilePlus} iconColor="bg-quick-action-request" onSubmit={handleSubmit}>
      <FormSection title="Request Information" description="Provide the request details">
        <div className="space-y-2">
          <Label htmlFor="title">Request Title</Label>
          <Input id="title" placeholder="Enter request title" required value={form.title} onChange={(e) => update("title", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructionType">Instruction Type</Label>
          <Select value={form.instructionType} onValueChange={(v) => update("instructionType", v)}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="refunding">Refunding Fee</SelectItem>
              <SelectItem value="sbi">SBI Request</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select value={form.priority} onValueChange={(v) => update("priority", v)}>
            <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sun">SUN</Label>
          <Input id="sun" placeholder="Enter SUN number" value={form.sun} onChange={(e) => update("sun", e.target.value)} />
        </div>
      </FormSection>

      <FormSection title="Assignment">
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
          <Label htmlFor="team">Team</Label>
          <Select value={form.team} onValueChange={(v) => update("team", v)}>
            <SelectTrigger><SelectValue placeholder="Select team" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ops">Operations Support</SelectItem>
              <SelectItem value="data">Data Control</SelectItem>
              <SelectItem value="remit">Remittances and Expenses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FormSection>

      <FormSection title="Description">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="description">Details</Label>
          <Textarea id="description" placeholder="Describe the request in detail..." rows={5} required value={form.description} onChange={(e) => update("description", e.target.value)} />
        </div>
      </FormSection>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </FormPageLayout>
  );
};

export default NewRequest;
