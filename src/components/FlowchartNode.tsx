
import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit2, Check, X } from 'lucide-react';

interface FlowchartNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  nodeType?: 'start' | 'process' | 'decision' | 'end';
}

const FlowchartNode = ({ data, id, selected }: NodeProps) => {
  const nodeData = data as FlowchartNodeData;
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(nodeData.label || 'New Node');
  const [description, setDescription] = useState(nodeData.description || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    // Update the node data
    nodeData.label = label;
    nodeData.description = description;
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLabel(nodeData.label || 'New Node');
    setDescription(nodeData.description || '');
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const getNodeStyle = () => {
    const baseStyle = "min-w-[120px] min-h-[60px] border-2 rounded-lg p-3 text-center";
    
    switch (nodeData.nodeType) {
      case 'start':
        return `${baseStyle} bg-green-100 border-green-400 text-green-800`;
      case 'end':
        return `${baseStyle} bg-red-100 border-red-400 text-red-800`;
      case 'decision':
        return `${baseStyle} bg-yellow-100 border-yellow-400 text-yellow-800 transform rotate-45`;
      default:
        return `${baseStyle} bg-blue-100 border-blue-400 text-blue-800`;
    }
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Card className={`${getNodeStyle()} ${selected ? 'ring-2 ring-purple-500' : ''}`}>
        {isEditing ? (
          <div className="space-y-2">
            <Input
              ref={inputRef}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={handleKeyPress}
              className="text-sm"
              placeholder="Node title"
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyPress}
              className="text-xs"
              placeholder="Description (optional)"
            />
            <div className="flex space-x-1">
              <Button size="sm" onClick={handleSave} className="h-6 w-6 p-0">
                <Check className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative group">
            <div className="font-medium text-sm">{label}</div>
            {description && (
              <div className="text-xs opacity-70 mt-1">{description}</div>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="absolute -top-1 -right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default FlowchartNode;
