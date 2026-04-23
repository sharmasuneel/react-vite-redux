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

const NewRequest = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Request Created", description: "Your request has been submitted successfully." });
      setIsSubmitting(false);
      navigate("/");
    }, 1000);
  };

  return (
    <FormPageLayout
      title="New Request"
      subtitle="Submit a new request form"
      icon={FilePlus}
      iconColor="bg-quick-action-request"
      onSubmit={handleSubmit}
    >
      <FormSection title="Request Information" description="Provide the request details">
        <div className="space-y-2">
          <Label htmlFor="title">Request Title</Label>
          <Input id="title" placeholder="Enter request title" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructionType">Instruction Type</Label>
          <Select>
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
          <Select>
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
          <Input id="sun" placeholder="Enter SUN number" />
        </div>
      </FormSection>

      <FormSection title="Assignment">
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="itsd">ITSD - Development</SelectItem>
              <SelectItem value="jre">JRE - Development 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="team">Team</Label>
          <Select>
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
          <Textarea id="description" placeholder="Describe the request in detail..." rows={5} required />
        </div>
      </FormSection>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </FormPageLayout>
  );
};

export default NewRequest;
