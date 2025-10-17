import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  animate?: boolean;
}

const GlassCard = ({ children, className, hover = false, animate = true }: GlassCardProps) => {
  const Component = animate ? motion.div : 'div';
  
  return (
    <Component
      {...(animate && {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 }
      })}
      className={cn(
        'bg-card/80 backdrop-blur-md shadow-glass rounded-lg border border-border',
        hover && 'transition-all duration-300 hover:shadow-card hover:-translate-y-1',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default GlassCard;
