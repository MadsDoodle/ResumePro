
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import VoiceInterface from '@/components/VoiceInterface';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceModal = ({ isOpen, onClose }: VoiceModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] border border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Voice Assistant</DialogTitle>
        </DialogHeader>
        <VoiceInterface />
      </DialogContent>
    </Dialog>
  );
};

export default VoiceModal;
