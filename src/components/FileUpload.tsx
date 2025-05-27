import { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
interface FileUploadProps {
  onFileUpload: (file: File) => void;
}
const FileUpload = ({
  onFileUpload
}: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const validateFile = (file: File): boolean => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return false;
    }
    if (!allowedTypes.includes(file.type)) {
      setError('Only PDF and DOCX files are supported');
      return false;
    }
    setError(null);
    return true;
  };
  const handleFileSelect = useCallback((file: File) => {
    if (validateFile(file)) {
      onFileUpload(file);
    }
  }, [onFileUpload]);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };
  return <div className="w-full max-w-2xl mx-auto">
      <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${isDragOver ? 'border-blue-400 bg-blue-400/10' : 'border-white/30 hover:border-white/50 bg-white/5'}`} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 rounded-full bg-white/10">
            <Upload className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Drop your resume here
            </h3>
            <p className="text-slate-300 mb-4">
              or click to browse files
            </p>
          </div>

          <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()} className="border-white/30 hover:bg-white/10 text-zinc-900">
            <FileText className="mr-2 h-4 w-4" />
            Choose File
          </Button>

          <input id="file-input" type="file" accept=".pdf,.docx" onChange={handleFileInput} className="hidden" />

          <p className="text-sm text-slate-400">
            Supports PDF and DOCX files up to 10MB
          </p>
        </div>
      </div>

      {error && <Alert className="mt-4 bg-red-500/10 border-red-500/20">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-400">
            {error}
          </AlertDescription>
        </Alert>}
    </div>;
};
export default FileUpload;