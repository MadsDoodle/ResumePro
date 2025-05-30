
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Flowchart {
  id: string;
  title: string;
  description: string | null;
  flowchart_data: any;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useFlowcharts = () => {
  const [flowcharts, setFlowcharts] = useState<Flowchart[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchFlowcharts = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('flowcharts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFlowcharts(data || []);
    } catch (error) {
      console.error('Error fetching flowcharts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowcharts();
  }, [user]);

  const deleteFlowchart = async (id: string) => {
    try {
      const { error } = await supabase
        .from('flowcharts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setFlowcharts(prev => prev.filter(f => f.id !== id));
    } catch (error) {
      console.error('Error deleting flowchart:', error);
      throw error;
    }
  };

  return {
    flowcharts,
    loading,
    refetch: fetchFlowcharts,
    deleteFlowchart
  };
};
