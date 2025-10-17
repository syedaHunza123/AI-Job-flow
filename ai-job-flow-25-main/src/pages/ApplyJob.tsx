import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GlassCard from '@/components/GlassCard';
import { applyJob } from '@/services/api';
import { toast } from '@/hooks/use-toast';

const ApplyJob = () => {
  const [loading, setLoading] = useState(false);
  const [jobUrl, setJobUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await applyJob(jobUrl);
      setMessage(response.message);
      toast({
        title: 'Success!',
        description: response.message,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process job application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">Apply to Jobs</h1>
          <p className="text-muted-foreground">
            Automate your LinkedIn Easy Apply process with a single click
          </p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobUrl">LinkedIn Job URL *</Label>
              <Input
                id="jobUrl"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="https://www.linkedin.com/jobs/view/..."
                required
              />
              <p className="text-sm text-muted-foreground">
                Paste the URL of the LinkedIn job posting you want to apply to
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Auto Apply to Job
                </>
              )}
            </Button>
          </form>

          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-primary">Application Started</p>
                  <p className="text-sm text-muted-foreground mt-1">{message}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    A LinkedIn window has been opened. Please complete the application manually if required.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </GlassCard>

        <GlassCard className="p-6 bg-gradient-hero">
          <h3 className="font-semibold mb-3">How it works</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-semibold text-primary">1.</span>
              Copy the LinkedIn job URL from the job posting
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">2.</span>
              Paste it in the field above and click "Auto Apply to Job"
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">3.</span>
              The system will open the job application in a new window
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">4.</span>
              Complete any additional steps manually if required
            </li>
          </ol>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default ApplyJob;
