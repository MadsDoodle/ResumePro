
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Edit3, Eye } from 'lucide-react';

interface PageTransitionProps {
  children: React.ReactNode;
  currentStep: number;
  direction?: 'forward' | 'backward';
}

const PageTransition = ({ children, currentStep, direction = 'forward' }: PageTransitionProps) => {
  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === 'forward' ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      rotateY: direction === 'forward' ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: string) => ({
      x: direction === 'forward' ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      rotateY: direction === 'forward' ? -15 : 15,
    }),
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.2 
      }
    }
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 0: return <Edit3 className="h-8 w-8 text-blue-400" />;
      case 1: return <FileText className="h-8 w-8 text-purple-400" />;
      case 2: return <FileText className="h-8 w-8 text-green-400" />;
      case 3: return <FileText className="h-8 w-8 text-orange-400" />;
      case 4: return <Eye className="h-8 w-8 text-pink-400" />;
      default: return <FileText className="h-8 w-8 text-gray-400" />;
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Floating step indicator */}
      <motion.div
        className="absolute -top-4 right-4 z-20 bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20"
        variants={iconVariants}
        initial="hidden"
        animate="visible"
        key={currentStep}
      >
        {getStepIcon(currentStep)}
      </motion.div>

      {/* Page content with transition */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
            rotateY: { duration: 0.4 }
          }}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Progress dots animation */}
      <motion.div 
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2, 3, 4].map((step) => (
          <motion.div
            key={step}
            className={`w-2 h-2 rounded-full ${
              step <= currentStep ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-white/20'
            }`}
            animate={{
              scale: step === currentStep ? [1, 1.3, 1] : 1,
            }}
            transition={{
              scale: {
                duration: 0.8,
                repeat: step === currentStep ? Infinity : 0,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default PageTransition;
