import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Send, UserCircle, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/GlassCard';

const stats = [
  { label: 'Documents Generated', value: '12', icon: FileText, color: 'text-blue-500' },
  { label: 'Applications Submitted', value: '8', icon: Send, color: 'text-green-500' },
  { label: 'Profile Views', value: '45', icon: TrendingUp, color: 'text-purple-500' },
  { label: 'Pending Applications', value: '3', icon: Clock, color: 'text-orange-500' },
];

const recentActivity = [
  { action: 'Generated CV for Software Engineer position', time: '2 hours ago', icon: FileText },
  { action: 'Applied to Senior Developer at Tech Corp', time: '5 hours ago', icon: Send },
  { action: 'Updated LinkedIn profile summary', time: '1 day ago', icon: UserCircle },
  { action: 'Generated cover letter for Product Manager role', time: '2 days ago', icon: FileText },
];

const quickActions = [
  {
    title: 'Generate Documents',
    description: 'Create CV and cover letter',
    icon: FileText,
    href: '/generate',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Apply to Jobs',
    description: 'Auto-apply on LinkedIn',
    icon: Send,
    href: '/apply',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Update Profile',
    description: 'Optimize your LinkedIn',
    icon: UserCircle,
    href: '/profile',
    gradient: 'from-purple-500 to-pink-500',
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your job search overview
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard hover className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link to={action.href}>
                <GlassCard hover className="p-6 group cursor-pointer">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${action.gradient} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                  <p className="text-muted-foreground text-sm">{action.description}</p>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <GlassCard className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <activity.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Tips */}
      <GlassCard className="p-6 bg-gradient-hero">
        <h3 className="font-semibold mb-3">Pro Tip</h3>
        <p className="text-sm text-muted-foreground">
          Tailor your CV and cover letter for each job application to increase your chances of getting interviews by up to 3x.
          Use specific keywords from the job description in your documents.
        </p>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
