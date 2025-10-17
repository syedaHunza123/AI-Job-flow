import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Loader2, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GlassCard from '@/components/GlassCard';
import { updateProfile } from '@/services/api';
import { toast } from '@/hooks/use-toast';

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuggestions('');
    setMessage('');

    try {
      const response = await updateProfile(profileUrl);
      setSuggestions(response.profile_suggestions);
      setMessage(response.message);
      toast({
        title: 'Success!',
        description: 'Profile suggestions generated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(suggestions);
    toast({
      title: 'Copied!',
      description: 'Suggestions copied to clipboard.',
    });
  };

  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">Update LinkedIn Profile</h1>
          <p className="text-muted-foreground">
            Get AI-powered suggestions to optimize your LinkedIn profile
          </p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profileUrl">LinkedIn Profile URL *</Label>
              <Input
                id="profileUrl"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="https://www.linkedin.com/in/johndoe"
                required
              />
              <p className="text-sm text-muted-foreground">
                Enter your LinkedIn profile URL to get optimization suggestions
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
                  Generating Suggestions...
                </>
              ) : (
                <>
                  <UserCircle className="mr-2 h-4 w-4" />
                  Get Profile Suggestions
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
                <p className="text-sm">{message}</p>
              </div>
            </motion.div>
          )}
        </GlassCard>

        {suggestions && (
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">AI Profile Suggestions</h3>
              <Button
                onClick={handleCopy}
                size="sm"
                variant="outline"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="text-sm whitespace-pre-wrap">{suggestions}</pre>
            </div>
          </GlassCard>
        )}

        <GlassCard className="p-6 bg-gradient-hero">
          <h3 className="font-semibold mb-3">Optimization Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              Use the AI suggestions to enhance your headline and summary
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              Add relevant keywords from your target job descriptions
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              Update your profile with measurable achievements
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              Keep your profile active with regular posts and engagement
            </li>
          </ul>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default UpdateProfile;
