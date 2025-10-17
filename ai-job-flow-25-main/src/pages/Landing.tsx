import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Send, UserCircle, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/GlassCard';
import heroImage from '@/assets/hero-bg.jpg';

const features = [
  {
    icon: FileText,
    title: 'AI-Powered Documents',
    description: 'Generate professional CVs and cover letters tailored to any job description in seconds.',
  },
  {
    icon: Send,
    title: 'Auto Job Applications',
    description: 'Streamline your LinkedIn Easy Apply process with intelligent automation.',
  },
  {
    icon: UserCircle,
    title: 'Profile Optimization',
    description: 'Get AI-driven suggestions to enhance your LinkedIn profile and stand out.',
  },
];

const benefits = [
  'Save hours on job applications',
  'Increase interview callbacks by 3x',
  'Stand out with tailored applications',
  'Never miss a deadline',
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-hero" />
        
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Job Applications</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Automate Your Job
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Applications with AI
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate professional CVs, cover letters, and optimize your LinkedIn profile in seconds.
              Land your dream job faster with AI JobMate.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-gradient-primary text-lg h-12 px-8">
                <Link to="/generate">
                  Generate CV & Cover Letter
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-secondary">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to accelerate your job search
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard hover className="p-8 h-full">
                  <div className="p-3 rounded-lg bg-gradient-primary w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <GlassCard className="p-12 text-center bg-gradient-hero">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold">Ready to Land Your Dream Job?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of job seekers who have accelerated their career with AI JobMate.
              </p>
              <Button asChild size="lg" className="bg-gradient-primary text-lg h-12 px-8">
                <Link to="/dashboard">
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default Landing;
