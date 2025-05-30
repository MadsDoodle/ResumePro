
import { useToast } from '@/hooks/use-toast';
import html2pdf from 'html2pdf.js';

export const usePDFGeneration = () => {
  const { toast } = useToast();

  const generatePDF = async (elementId: string, filename: string) => {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Element not found');
      }

      const opt = {
        margin: 1,
        filename: `${filename}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
      
      toast({
        title: "Success",
        description: `${filename} downloaded successfully as PDF!`
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const generateResumeFromData = async (resumeData: any, filename: string) => {
    try {
      // Create a temporary div with resume content
      const tempDiv = document.createElement('div');
      tempDiv.style.padding = '40px';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.lineHeight = '1.6';
      tempDiv.style.color = '#333';
      
      tempDiv.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto;">
          <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            ${resumeData.personalInfo?.fullName || 'Resume'}
          </h1>
          
          ${resumeData.personalInfo ? `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1f2937; margin-bottom: 10px;">Contact Information</h2>
              <p><strong>Email:</strong> ${resumeData.personalInfo.email || ''}</p>
              <p><strong>Phone:</strong> ${resumeData.personalInfo.phone || ''}</p>
              <p><strong>Address:</strong> ${resumeData.personalInfo.address || ''}</p>
            </div>
          ` : ''}
          
          ${resumeData.summary ? `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1f2937; margin-bottom: 10px;">Professional Summary</h2>
              <p>${resumeData.summary}</p>
            </div>
          ` : ''}
          
          ${resumeData.experience?.length ? `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1f2937; margin-bottom: 10px;">Experience</h2>
              ${resumeData.experience.map((exp: any) => `
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #374151; margin-bottom: 5px;">${exp.position || ''}</h3>
                  <p style="color: #6b7280; margin-bottom: 5px;">${exp.company || ''} | ${exp.duration || ''}</p>
                  <p>${exp.description || ''}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${resumeData.education?.length ? `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1f2937; margin-bottom: 10px;">Education</h2>
              ${resumeData.education.map((edu: any) => `
                <div style="margin-bottom: 15px;">
                  <h3 style="color: #374151; margin-bottom: 5px;">${edu.degree || ''}</h3>
                  <p style="color: #6b7280;">${edu.school || ''} | ${edu.year || ''}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${resumeData.skills?.length ? `
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1f2937; margin-bottom: 10px;">Skills</h2>
              <p>${resumeData.skills.join(', ')}</p>
            </div>
          ` : ''}
        </div>
      `;
      
      document.body.appendChild(tempDiv);
      
      const opt = {
        margin: 1,
        filename: `${filename}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(tempDiv).save();
      
      document.body.removeChild(tempDiv);
      
      toast({
        title: "Success",
        description: `${filename} downloaded successfully as PDF!`
      });
    } catch (error) {
      console.error('Error generating resume PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate resume PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    generatePDF,
    generateResumeFromData
  };
};
