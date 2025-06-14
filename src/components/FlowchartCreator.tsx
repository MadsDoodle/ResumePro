
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
  MarkerType,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Download, 
  Save, 
  Plus, 
  Square, 
  Circle, 
  Diamond,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  Copy,
  Trash2,
  Settings
} from 'lucide-react';

interface NodeData extends Record<string, unknown> {
  label: string;
  isEditing?: boolean;
  nodeType?: 'start' | 'process' | 'decision' | 'end' | 'custom';
  backgroundColor?: string;
  textColor?: string;
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'startNode',
    data: { 
      label: 'Start', 
      isEditing: false, 
      nodeType: 'start',
      backgroundColor: '#10B981',
      textColor: '#ffffff'
    },
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
  const [selectedNodeType, setSelectedNodeType] = useState<'start' | 'process' | 'decision' | 'end' | 'custom'>('process');
  const [showGrid, setShowGrid] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const newEdge = {
        ...params,
        animated: true,
        style: { stroke: '#ffffff', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#ffffff' },
        type: 'smoothstep',
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const getNodeConfig = (nodeType: 'start' | 'process' | 'decision' | 'end' | 'custom') => {
    switch (nodeType) {
      case 'start':
        return {
          type: 'startNode',
          backgroundColor: '#10B981',
          textColor: '#ffffff',
          label: 'Start'
        };
      case 'process':
        return {
          type: 'processNode',
          backgroundColor: '#3B82F6',
          textColor: '#ffffff',
          label: 'Process'
        };
      case 'decision':
        return {
          type: 'decisionNode',
          backgroundColor: '#F59E0B',
          textColor: '#ffffff',
          label: 'Decision'
        };
      case 'end':
        return {
          type: 'endNode',
          backgroundColor: '#EF4444',
          textColor: '#ffffff',
          label: 'End'
        };
      case 'custom':
        return {
          type: 'customNode',
          backgroundColor: '#8B5CF6',
          textColor: '#ffffff',
          label: 'Custom'
        };
      default:
        return {
          type: 'processNode',
          backgroundColor: '#3B82F6',
          textColor: '#ffffff',
          label: 'Process'
        };
    }
  };

  const addNode = (nodeType: 'start' | 'process' | 'decision' | 'end' | 'custom') => {
    const nodeId = `${Date.now()}`;
    const config = getNodeConfig(nodeType);
    
    const newNode: Node = {
      id: nodeId,
      type: config.type,
      data: { 
        label: config.label,
        isEditing: false,
        nodeType,
        backgroundColor: config.backgroundColor,
        textColor: config.textColor
      },
      position: { 
        x: Math.random() * 300 + 100, 
        y: Math.random() * 300 + 100 
      },
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

  const deleteSelectedNodes = useCallback(() => {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) => eds.filter((edge) => !edge.selected));
  }, [setNodes, setEdges]);

  const duplicateSelectedNodes = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);
    const newNodes = selectedNodes.map((node) => ({
      ...node,
      id: `${Date.now()}-${node.id}`,
      position: { x: node.position.x + 50, y: node.position.y + 50 },
      selected: false,
    }));
    setNodes((nds) => [...nds, ...newNodes]);
  }, [nodes, setNodes]);

  const clearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  // Custom Node Components
  const BaseNode = ({ data, id, nodeType, shape }: { data: NodeData; id: string; nodeType: string; shape: 'rectangle' | 'circle' | 'diamond' }) => {
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

    const getShapeClasses = () => {
      const baseClasses = "px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer min-w-[100px] text-center relative border-2 border-white/20";
      
      switch (shape) {
        case 'circle':
          return `${baseClasses} rounded-full w-20 h-20 flex items-center justify-center`;
        case 'diamond':
          return `${baseClasses} transform rotate-45 w-16 h-16 flex items-center justify-center`;
        case 'rectangle':
        default:
          return `${baseClasses} rounded-lg`;
      }
    };

    const handleStyle = {
      backgroundColor: data.backgroundColor || '#6B7280',
      color: data.textColor || '#ffffff',
    };

    return (
      <div 
        className={getShapeClasses()}
        style={handleStyle}
        onDoubleClick={() => toggleNodeEditing(id)}
      >
        {/* Connection Handles */}
        <Handle 
          type="target" 
          position={Position.Top} 
          className="w-4 h-4 bg-white/80 border-2 border-gray-300 rounded-full hover:bg-white transition-colors"
        />
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="w-4 h-4 bg-white/80 border-2 border-gray-300 rounded-full hover:bg-white transition-colors"
        />
        <Handle 
          type="source" 
          position={Position.Left} 
          className="w-4 h-4 bg-white/80 border-2 border-gray-300 rounded-full hover:bg-white transition-colors"
        />
        <Handle 
          type="source" 
          position={Position.Right} 
          className="w-4 h-4 bg-white/80 border-2 border-gray-300 rounded-full hover:bg-white transition-colors"
        />

        <div className={shape === 'diamond' ? 'transform -rotate-45' : ''}>
          {data.isEditing ? (
            <Input
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleBlur}
              className="border-none p-0 text-center bg-transparent text-white placeholder-white/70"
              style={{ color: data.textColor }}
              autoFocus
            />
          ) : (
            <div className="text-sm font-semibold leading-tight" style={{ color: data.textColor }}>
              {data.label}
            </div>
          )}
        </div>
      </div>
    );
  };

  const StartNode = (props: any) => <BaseNode {...props} nodeType="start" shape="circle" />;
  const ProcessNode = (props: any) => <BaseNode {...props} nodeType="process" shape="rectangle" />;
  const DecisionNode = (props: any) => <BaseNode {...props} nodeType="decision" shape="diamond" />;
  const EndNode = (props: any) => <BaseNode {...props} nodeType="end" shape="circle" />;
  const CustomNode = (props: any) => <BaseNode {...props} nodeType="custom" shape="rectangle" />;

  const nodeTypes = {
    startNode: StartNode,
    processNode: ProcessNode,
    decisionNode: DecisionNode,
    endNode: EndNode,
    customNode: CustomNode,
  };

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
          style: edge.style || {},
          animated: edge.animated || false
        })),
        viewport: { x: 0, y: 0, zoom: 1 }
      };

      const { error } = await supabase
        .from('flowcharts')
        .insert({
          user_id: user.id,
          title,
          flowchart_data: flowchartData as any,
          description: `Flowchart with ${nodes.length} nodes and ${edges.length} connections`
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex">
      {/* Enhanced Sidebar */}
      <div className="w-80 bg-gradient-to-b from-gray-900 to-black border-r border-gray-700 p-6 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Flowchart Studio
          </h2>
          <Button onClick={onClose} variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
            ×
          </Button>
        </div>

        {/* Title Input */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Project Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter flowchart name..."
          />
        </div>

        {/* Quick Tips */}
        <div className="mb-8 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl">
          <h4 className="text-sm font-semibold text-purple-300 mb-3 flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Quick Tips
          </h4>
          <ul className="text-xs text-purple-200 space-y-2">
            <li>• Double-click nodes to edit text</li>
            <li>• Drag from connection points to link nodes</li>
            <li>• Use keyboard shortcuts: Enter (save), Esc (cancel)</li>
            <li>• Select multiple items with Shift+Click</li>
          </ul>
        </div>

        {/* Node Palette */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Elements
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => addNode('start')}
              variant="outline"
              className="h-16 border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:border-green-400 transition-all duration-200 flex flex-col"
            >
              <Play className="h-5 w-5 mb-1" />
              <span className="text-xs">Start</span>
            </Button>
            <Button
              onClick={() => addNode('process')}
              variant="outline"
              className="h-16 border-blue-500/40 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-200 flex flex-col"
            >
              <Square className="h-5 w-5 mb-1" />
              <span className="text-xs">Process</span>
            </Button>
            <Button
              onClick={() => addNode('decision')}
              variant="outline"
              className="h-16 border-yellow-500/40 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-400 transition-all duration-200 flex flex-col"
            >
              <Diamond className="h-5 w-5 mb-1" />
              <span className="text-xs">Decision</span>
            </Button>
            <Button
              onClick={() => addNode('end')}
              variant="outline"
              className="h-16 border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-400 transition-all duration-200 flex flex-col"
            >
              <Pause className="h-5 w-5 mb-1" />
              <span className="text-xs">End</span>
            </Button>
            <Button
              onClick={() => addNode('custom')}
              variant="outline"
              className="h-16 border-purple-500/40 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-200 flex flex-col col-span-2"
            >
              <Circle className="h-5 w-5 mb-1" />
              <span className="text-xs">Custom Node</span>
            </Button>
          </div>
        </div>

        {/* Canvas Tools */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Move className="w-5 h-5 mr-2" />
            Canvas Tools
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={duplicateSelectedNodes}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Copy className="h-4 w-4 mr-1" />
              Duplicate
            </Button>
            <Button
              onClick={deleteSelectedNodes}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button
              onClick={clearCanvas}
              variant="outline"
              size="sm"
              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 col-span-2"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto space-y-4">
          <Button
            onClick={saveFlowchart}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Project'}
          </Button>
          <Button
            onClick={downloadFlowchart}
            variant="outline"
            className="w-full border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 font-semibold py-3"
          >
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Enhanced Canvas */}
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          connectionLineStyle={{ 
            stroke: '#ffffff', 
            strokeWidth: 3,
            strokeDasharray: '5,5'
          }}
          defaultEdgeOptions={{
            style: { stroke: '#ffffff', strokeWidth: 2 },
            type: 'smoothstep',
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed, color: '#ffffff' },
          }}
          deleteKeyCode={['Backspace', 'Delete']}
          multiSelectionKeyCode={['Meta', 'Shift']}
        >
          <Controls 
            className="bg-gray-800/80 border-gray-600 backdrop-blur-sm" 
            showZoom={true}
            showFitView={true}
            showInteractive={true}
          />
          <MiniMap 
            className="bg-gray-800/80 border-gray-600 backdrop-blur-sm" 
            nodeColor={(node) => {
              const data = node.data as NodeData;
              return data.backgroundColor || '#6B7280';
            }}
            maskColor="rgba(0, 0, 0, 0.7)"
          />
          <Background 
            variant={showGrid ? BackgroundVariant.Dots : BackgroundVariant.Lines} 
            gap={20} 
            size={1}
            color="#374151"
          />
          
          {/* Floating Panel */}
          <Panel position="top-right" className="m-4">
            <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-600 rounded-lg p-3 text-white space-y-2">
              <div className="text-sm font-medium">Canvas Info</div>
              <div className="text-xs text-gray-300">
                Nodes: {nodes.length} | Edges: {edges.length}
              </div>
              <Button
                onClick={() => setShowGrid(!showGrid)}
                variant="outline"
                size="sm"
                className="w-full text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                {showGrid ? 'Hide Grid' : 'Show Grid'}
              </Button>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default FlowchartCreator;
