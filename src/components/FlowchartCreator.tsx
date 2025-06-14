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
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, Save, Plus, Square, Circle, Diamond } from 'lucide-react';

interface NodeData extends Record<string, unknown> {
  label: string;
  isEditing?: boolean;
  nodeType?: 'start' | 'process' | 'custom' | 'end';
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start', isEditing: false, nodeType: 'start' },
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

  const addNode = (type: string, nodeType: 'start' | 'process' | 'custom' | 'end') => {
    const nodeId = `${nodes.length + 1}`;
    const newNode: Node = {
      id: nodeId,
      type: type === 'rectangle' ? 'default' : type,
      data: { 
        label: `Node ${nodes.length + 1}`,
        isEditing: false,
        nodeType
      },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const updateNodeLabel = useCallback((nodeId: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, label: newLabel, isEditing: false } }
          : node
      )
    );
  }, [setNodes]);

  const toggleNodeEditing = useCallback((nodeId: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, isEditing: !node.data.isEditing } }
          : { ...node, data: { ...node.data, isEditing: false } }
      )
    );
  }, [setNodes]);

  const saveFlowchart = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const flowchartData = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type || 'default',
          data: { ...node.data, isEditing: false },
          position: node.position,
          style: node.style || {}
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: edge.type || 'default',
          style: edge.style || {}
        })),
        viewport: { x: 0, y: 0, zoom: 1 }
      };

      const { error } = await supabase
        .from('flowcharts')
        .insert({
          user_id: user.id,
          title,
          flowchart_data: flowchartData as any,
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

    saveFlowchart();
  };

  const getNodeBorderColor = (nodeType?: string) => {
    switch (nodeType) {
      case 'start':
        return '#10B981'; // green
      case 'process':
        return '#3B82F6'; // blue
      case 'custom':
        return '#F59E0B'; // yellow
      case 'end':
        return '#EF4444'; // red
      default:
        return '#6B7280'; // gray
    }
  };

  // Custom node component for editable nodes with connection handles
  const CustomNode = ({ data, id }: { data: NodeData; id: string }) => {
    const [tempLabel, setTempLabel] = useState(data.label);

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        updateNodeLabel(id, tempLabel);
      } else if (e.key === 'Escape') {
        setTempLabel(data.label);
        toggleNodeEditing(id);
      }
    };

    const handleBlur = () => {
      updateNodeLabel(id, tempLabel);
    };

    const borderColor = getNodeBorderColor(data.nodeType);

    return (
      <div 
        className="px-4 py-2 bg-white rounded shadow-md hover:shadow-lg transition-shadow cursor-pointer min-w-[80px] text-center relative"
        style={{ borderWidth: '2px', borderStyle: 'solid', borderColor }}
        onDoubleClick={() => toggleNodeEditing(id)}
      >
        {/* Connection Handles */}
        <Handle 
          type="target" 
          position={Position.Top} 
          className="w-3 h-3 bg-gray-400 border-2 border-white rounded-full"
        />
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="w-3 h-3 bg-gray-400 border-2 border-white rounded-full"
        />
        <Handle 
          type="source" 
          position={Position.Left} 
          className="w-3 h-3 bg-gray-400 border-2 border-white rounded-full"
        />
        <Handle 
          type="source" 
          position={Position.Right} 
          className="w-3 h-3 bg-gray-400 border-2 border-white rounded-full"
        />

        {data.isEditing ? (
          <Input
            value={tempLabel}
            onChange={(e) => setTempLabel(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
            className="border-none p-0 text-center bg-transparent"
            autoFocus
          />
        ) : (
          <div className="text-sm font-medium">{data.label}</div>
        )}
      </div>
    );
  };

  const nodeTypes = {
    default: CustomNode,
    input: CustomNode,
    output: CustomNode,
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
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Instructions */}
        <div className="mb-6 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <h4 className="text-sm font-medium text-purple-300 mb-2">How to Use:</h4>
          <ul className="text-xs text-purple-400 space-y-1">
            <li>• Double-click any node to edit text</li>
            <li>• Drag from connection points to connect nodes</li>
            <li>• Press Enter to save or Escape to cancel</li>
          </ul>
        </div>

        {/* Node Tools */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Add Nodes</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => addNode('input', 'start')}
              variant="outline"
              size="sm"
              className="border-green-500/30 text-green-400 hover:bg-green-500/10"
            >
              <Circle className="h-4 w-4 mr-1" />
              Start
            </Button>
            <Button
              onClick={() => addNode('default', 'process')}
              variant="outline"
              size="sm"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
            >
              <Square className="h-4 w-4 mr-1" />
              Process
            </Button>
            <Button
              onClick={() => addNode('output', 'end')}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <Diamond className="h-4 w-4 mr-1" />
              End
            </Button>
            <Button
              onClick={() => addNode('default', 'custom')}
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
          nodeTypes={nodeTypes}
          fitView
          className="bg-[#1a1a1a]"
          connectionLineStyle={{ stroke: '#fff', strokeWidth: 2 }}
          defaultEdgeOptions={{
            style: { stroke: '#fff', strokeWidth: 2 },
            type: 'smoothstep',
          }}
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
