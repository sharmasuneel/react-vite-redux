import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormPageLayout } from "@/components/workflow/FormPageLayout";
import { FormSection } from "@/components/workflow/FormSection";
import { toast } from "@/hooks/use-toast";

const UploadDocument = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Document Uploaded", description: "Your document has been uploaded successfully." });
      setIsSubmitting(false);
      navigate("/");
    }, 1000);
  };

  return (
    <FormPageLayout
      title="Upload Document"
      subtitle="Add a document to filing"
      icon={Upload}
      iconColor="bg-quick-action-upload"
      onSubmit={handleSubmit}
    >
      <FormSection title="Document Information" description="Provide the document details">
        <div className="space-y-2">
          <Label htmlFor="docTitle">Document Title</Label>
          <Input id="docTitle" placeholder="Enter document title" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="invoice">Invoice</SelectItem>
              <SelectItem value="report">Report</SelectItem>
              <SelectItem value="correspondence">Correspondence</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="reference">Reference Number</Label>
          <Input id="reference" placeholder="Enter reference" />
        </div>
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
      </FormSection>

      <FormSection title="File Upload">
        <div className="md:col-span-2">
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors"
          >
            <FileUp className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="text-sm font-medium text-foreground">
              {fileName || "Click to upload or drag and drop"}
            </span>
            <span className="text-xs text-muted-foreground mt-1">PDF, DOCX, XLSX up to 10MB</span>
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              accept=".pdf,.docx,.xlsx,.doc,.xls,.csv"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
            />
          </label>
        </div>
      </FormSection>

      <FormSection title="Notes">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="notes">Description</Label>
          <Textarea id="notes" placeholder="Describe the document..." rows={3} />
        </div>
      </FormSection>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload Document"}
        </Button>
      </div>
    </FormPageLayout>
  );
};

export default UploadDocument;
