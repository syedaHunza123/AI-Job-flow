import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import GlassCard from '@/components/GlassCard';
import { generateDocuments, downloadFile, type UserInfo } from '@/services/api';
import { toast } from '@/hooks/use-toast';

const GenerateDocuments = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserInfo>({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    education: '',
    job_description: '',
    linkedin_profile_url: '',
  });
  const [results, setResults] = useState<{
    cv_path: string;
    cover_letter_path: string;
    cv_preview: string;
    cover_letter_preview: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await generateDocuments(formData);
      setResults(response);
      toast({
        title: 'Success!',
        description: 'Your documents have been generated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate documents. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (filename: string, displayName: string) => {
    try {
      const blob = await downloadFile(filename);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = displayName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: 'Downloaded',
        description: `${displayName} downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download file.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Generate Documents</h1>
        <p className="text-muted-foreground">
          Create professional CV and cover letter tailored to your job application
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <GlassCard className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills *</Label>
              <Textarea
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="Python, React, Node.js, Machine Learning..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience *</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="Senior Developer at Tech Corp (2020-2023)..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education *</Label>
              <Textarea
                id="education"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="B.S. Computer Science, MIT (2016-2020)..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_description">Job Description *</Label>
              <Textarea
                id="job_description"
                value={formData.job_description}
                onChange={(e) => setFormData({ ...formData, job_description: e.target.value })}
                placeholder="Paste the job description here..."
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile URL (Optional)</Label>
              <Input
                id="linkedin"
                value={formData.linkedin_profile_url}
                onChange={(e) => setFormData({ ...formData, linkedin_profile_url: e.target.value })}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Documents
                </>
              )}
            </Button>
          </form>
        </GlassCard>

        {/* Results */}
        <div className="space-y-6">
          {results ? (
            <>
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">CV Preview</h3>
                  <Button
                    onClick={() => handleDownload(results.cv_path, 'CV.docx')}
                    size="sm"
                    className="bg-gradient-primary"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap">{results.cv_preview}</pre>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Cover Letter Preview</h3>
                  <Button
                    onClick={() => handleDownload(results.cover_letter_path, 'CoverLetter.docx')}
                    size="sm"
                    className="bg-gradient-primary"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Letter
                  </Button>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap">{results.cover_letter_preview}</pre>
                </div>
              </GlassCard>
            </>
          ) : (
            <GlassCard className="p-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">
                Fill out the form and click "Generate Documents" to see your AI-generated CV and cover letter here.
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateDocuments;
