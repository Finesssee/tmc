import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export type AnimatedButtonProps = ComponentPropsWithoutRef<typeof Button>;

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Button ref={ref} className={className} {...props}>
          {children}
        </Button>
      </motion.div>
    );
  }
); 