
import { useState, useCallback } from 'react';
import { useNodesState, useEdgesState, addEdge, Connection, Edge, Node } from '@xyflow/react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useChatHistory } from '@/hooks/useChatHistory';
import { useToast } from '@/hooks/use-toast';

interface FlowchartNodeData {
  label: string;
  description?: string;
  nodeType?: 'start' | 'process' | 'decision' | 'end';
}

export const useFlowchartEditor = () => {
  const { user } = useAuth();
  const { saveMessage } = useChatHistory();
  const { toast } = useToast();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [flowchartTitle, setFlowchartTitle] = useState('');

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = useCallback((nodeType: 'start' | 'process' | 'decision' | 'end') => {
    const newNode: Node<FlowchartNodeData> = {
      id: `${nodeType}-${Date.now()}`,
      type: 'flowchartNode',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { 
        label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1), 
        nodeType,
        description: '' 
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const saveFlowchart = async () => {
    if (!user || !flowchartTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a flowchart title and ensure you're logged in.",
        variant: "destructive"
      });
      return;
    }

    try {
      const flowchartData = {
        nodes: nodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            label: node.data.label || 'Untitled Node',
            description: node.data.description || ''
          }
        })),
        edges
      };

      const { data, error } = await supabase
        .from('flowcharts')
        .insert({
          user_id: user.id,
          title: flowchartTitle.trim(),
          description: `Flowchart with ${nodes.length} nodes and ${edges.length} connections`,
          flowchart_data: flowchartData
        })
        .select()
        .single();

      if (error) throw error;

      // Save to chat history
      const conversationId = `flowchart-${Date.now()}`;
      const sessionId = `session-${Date.now()}`;
      
      await saveMessage(
        `Created flowchart: ${flowchartTitle}`,
        'user',
        conversationId,
        sessionId
      );
      
      await saveMessage(
        `Flowchart "${flowchartTitle}" saved successfully with ${nodes.length} nodes and ${edges.length} connections.`,
        'ai',
        conversationId,
        sessionId
      );

      toast({
        title: "Success",
        description: "Flowchart saved successfully!"
      });

      return data;
    } catch (error) {
      console.error('Error saving flowchart:', error);
      toast({
        title: "Error",
        description: "Failed to save flowchart. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const exportToPDF = async () => {
    try {
      // Create a simple text representation for PDF export
      const flowchartContent = `
Flowchart: ${flowchartTitle || 'Untitled'}
Created: ${new Date().toLocaleDateString()}

Nodes:
${nodes.map((node, index) => 
  `${index + 1}. ${node.data.label} (${node.data.nodeType || 'process'})
     ${node.data.description ? `Description: ${node.data.description}` : ''}`
).join('\n')}

Connections:
${edges.map((edge, index) => 
  `${index + 1}. ${nodes.find(n => n.id === edge.source)?.data.label || edge.source} → ${nodes.find(n => n.id === edge.target)?.data.label || edge.target}`
).join('\n')}
      `;
      
      const blob = new Blob([flowchartContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${flowchartTitle || 'flowchart'}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "Flowchart exported successfully!"
      });
    } catch (error) {
      console.error('Error exporting flowchart:', error);
      toast({
        title: "Error",
        description: "Failed to export flowchart.",
        variant: "destructive"
      });
    }
  };

  const clearFlowchart = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setFlowchartTitle('');
  }, [setNodes, setEdges]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    saveFlowchart,
    exportToPDF,
    clearFlowchart,
    flowchartTitle,
    setFlowchartTitle
  };
};
