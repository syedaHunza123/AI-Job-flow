import { motion } from 'framer-motion';
import { Moon, Sun, Key, User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/GlassCard';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your preferences have been updated successfully.',
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
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your preferences and account settings
          </p>
        </div>

        {/* Appearance */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            {theme === 'dark' ? (
              <Moon className="w-5 h-5 text-primary" />
            ) : (
              <Sun className="w-5 h-5 text-primary" />
            )}
            <h2 className="text-xl font-semibold">Appearance</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Toggle between light and dark theme
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
        </GlassCard>

        {/* API Configuration */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">API Configuration</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key (Optional)</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key..."
              />
              <p className="text-sm text-muted-foreground">
                Configure your custom API key for enhanced features
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backend-url">Backend URL</Label>
              <Input
                id="backend-url"
                defaultValue="http://localhost:8080"
                placeholder="http://localhost:8080"
              />
              <p className="text-sm text-muted-foreground">
                URL of the FastAPI backend server
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Profile */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="display-name">Display Name</Label>
              <Input
                id="display-name"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        </GlassCard>

        {/* Save Button */}
        <Button 
          onClick={handleSave}
          className="w-full bg-gradient-primary"
        >
          Save Settings
        </Button>
      </motion.div>
    </div>
  );
};

export default Settings;
