
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Download, Save, Trash2 } from 'lucide-react';

interface FlowchartToolbarProps {
  onAddNode: (nodeType: 'start' | 'process' | 'decision' | 'end') => void;
  onSave: () => void;
  onDownload: () => void;
  onClear: () => void;
}

const FlowchartToolbar = ({ onAddNode, onSave, onDownload, onClear }: FlowchartToolbarProps) => {
  return (
    <Card className="absolute top-4 left-4 z-10 p-4 bg-white/90 backdrop-blur-sm border-purple-500/20">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium mb-2">Add Nodes</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddNode('start')}
              className="text-xs"
            >
              Start
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddNode('process')}
              className="text-xs"
            >
              Process
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddNode('decision')}
              className="text-xs"
            >
              Decision
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddNode('end')}
              className="text-xs"
            >
              End
            </Button>
          </div>
        </div>
        
        <div className="border-t pt-3">
          <h3 className="text-sm font-medium mb-2">Actions</h3>
          <div className="space-y-2">
            <Button size="sm" onClick={onSave} className="w-full">
              <Save className="h-3 w-3 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={onDownload} className="w-full">
              <Download className="h-3 w-3 mr-1" />
              Export PDF
            </Button>
            <Button size="sm" variant="destructive" onClick={onClear} className="w-full">
              <Trash2 className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FlowchartToolbar;
