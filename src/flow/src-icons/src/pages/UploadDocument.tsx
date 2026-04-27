import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Icon } from "@/lib/icons";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormPageLayout } from "@/components/workflow/FormPageLayout";
import { FormSection } from "@/components/workflow/FormSection";
import { toast } from "@/hooks/use-toast";
import { useUploadDocumentMutation } from "@/store/api/workflowApi";

const UploadDocument = () => {
  const navigate = useNavigate();
  const [uploadDocument, { isLoading }] = useUploadDocumentMutation();
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [docTitle, setDocTitle] = useState("");
  const [category, setCategory] = useState("");
  const [reference, setReference] = useState("");
  const [department, setDepartment] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("docTitle", docTitle);
    formData.append("category", category);
    formData.append("reference", reference);
    formData.append("department", department);
    formData.append("notes", notes);
    if (file) formData.append("file", file);

    try {
      await uploadDocument(formData).unwrap();
      toast({ title: "Document Uploaded", description: "Your document has been uploaded successfully." });
      navigate("/");
    } catch {
      toast({ title: "Error", description: "Failed to upload document. Please try again.", variant: "destructive" });
    }
  };

  return (
    <FormPageLayout title="Upload Document" subtitle="Add a document to filing" icon="upload" iconColor="bg-quick-action-upload" onSubmit={handleSubmit}>
      <FormSection title="Document Information" description="Provide the document details">
        <div className="space-y-2">
          <Label htmlFor="docTitle">Document Title</Label>
          <Input id="docTitle" placeholder="Enter document title" required value={docTitle} onChange={(e) => setDocTitle(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
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
          <Input id="reference" placeholder="Enter reference" value={reference} onChange={(e) => setReference(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select value={department} onValueChange={setDepartment}>
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
            <Icon name="file-up" className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="text-sm font-medium text-foreground">
              {fileName || "Click to upload or drag and drop"}
            </span>
            <span className="text-xs text-muted-foreground mt-1">PDF, DOCX, XLSX up to 10MB</span>
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              accept=".pdf,.docx,.xlsx,.doc,.xls,.csv"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) { setFile(f); setFileName(f.name); }
              }}
            />
          </label>
        </div>
      </FormSection>

      <FormSection title="Notes">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="notes">Description</Label>
          <Textarea id="notes" placeholder="Describe the document..." rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </FormSection>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload Document"}
        </Button>
      </div>
    </FormPageLayout>
  );
};

export default UploadDocument;
