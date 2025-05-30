
import React, { useCallback, useState, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, Save, Plus, Square, Circle, Diamond } from 'lucide-react';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 25 },
  },
];

const initialEdges: Edge[] = [];

interface FlowchartCreatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlowchartCreator = ({ isOpen, onClose }: FlowchartCreatorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [title, setTitle] = useState('My Flowchart');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (type: string) => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: type === 'rectangle' ? 'default' : type,
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const saveFlowchart = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const flowchartData = {
        nodes,
        edges,
        viewport: { x: 0, y: 0, zoom: 1 }
      };

      const { error } = await supabase
        .from('flowcharts')
        .insert({
          user_id: user.id,
          title,
          flowchart_data: flowchartData,
          description: `Flowchart with ${nodes.length} nodes`
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Flowchart saved successfully!"
      });
    } catch (error) {
      console.error('Error saving flowchart:', error);
      toast({
        title: "Error",
        description: "Failed to save flowchart",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFlowchart = () => {
    const flowchartData = { nodes, edges, title };
    const dataStr = JSON.stringify(flowchartData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${title.replace(/\s+/g, '_')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    // Also save to database
    saveFlowchart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-[#0E0E0E] border-r border-gray-800 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Flowchart Creator</h2>
          <Button onClick={onClose} variant="outline" size="sm">
            ×
          </Button>
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Node Tools */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Add Nodes</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => addNode('input')}
              variant="outline"
              size="sm"
              className="border-green-500/30 text-green-400 hover:bg-green-500/10"
            >
              <Circle className="h-4 w-4 mr-1" />
              Start
            </Button>
            <Button
              onClick={() => addNode('default')}
              variant="outline"
              size="sm"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
            >
              <Square className="h-4 w-4 mr-1" />
              Process
            </Button>
            <Button
              onClick={() => addNode('output')}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <Diamond className="h-4 w-4 mr-1" />
              End
            </Button>
            <Button
              onClick={() => addNode('default')}
              variant="outline"
              size="sm"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
            >
              <Plus className="h-4 w-4 mr-1" />
              Custom
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto space-y-3">
          <Button
            onClick={saveFlowchart}
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
          <Button
            onClick={downloadFlowchart}
            variant="outline"
            className="w-full border-[#00FF88]/30 text-[#00FF88] hover:bg-[#00FF88]/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="bg-[#1a1a1a]"
        >
          <Controls className="bg-gray-800 border-gray-700" />
          <MiniMap className="bg-gray-800 border-gray-700" />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default FlowchartCreator;
