import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isLandingPage = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
            AI JobMate
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {!isLandingPage && (
            <>
              <Link 
                to="/dashboard" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/settings" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Settings
              </Link>
            </>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {isLandingPage && (
            <Button asChild className="bg-gradient-primary">
              <Link to="/dashboard">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
