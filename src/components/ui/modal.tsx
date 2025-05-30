
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'library' | 'saved' | 'chat' | 'settings';
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, variant, children, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isOpen]);

  const getModalSize = () => {
    switch (variant) {
      case 'library':
      case 'saved':
        return 'max-w-4xl w-full mx-4';
      case 'chat':
        return 'max-w-6xl w-full mx-4 h-[80vh]';
      case 'settings':
        return 'max-w-2xl w-full mx-4';
      default:
        return 'max-w-2xl w-full mx-4';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`relative ${getModalSize()} max-h-[90vh] overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(14, 14, 14, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(147, 51, 234, 0.2)',
              boxShadow: '0 8px 32px rgba(147, 51, 234, 0.3)',
            }}
            className={`${getModalSize()} max-h-[90vh] overflow-hidden rounded-xl border border-purple-500/20 bg-[#0E0E0E]/85 backdrop-blur-lg shadow-2xl shadow-purple-500/20`}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
                <h2 id="modal-title" className="text-xl font-semibold text-white">
                  {title}
                </h2>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            )}

            {/* Content */}
            <div className={`${title ? 'p-6' : 'p-6'} overflow-y-auto max-h-full`}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
