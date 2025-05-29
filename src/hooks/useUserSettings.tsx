
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export interface UserSettings {
  termsAccepted: boolean;
  accountStatus: string;
  lastLogin: string | null;
}

export function useUserSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('terms_accepted, account_status, last_login')
        .eq('user_id', user.id)
        .single();

      if (error) {
        // If no settings exist, create them
        if (error.code === 'PGRST116') {
          const { data: newSettings, error: insertError } = await supabase
            .from('user_settings')
            .insert({
              user_id: user.id,
              terms_accepted: false,
              account_status: 'active'
            })
            .select('terms_accepted, account_status, last_login')
            .single();

          if (insertError) throw insertError;
          setSettings({
            termsAccepted: newSettings.terms_accepted,
            accountStatus: newSettings.account_status,
            lastLogin: newSettings.last_login
          });
        } else {
          throw error;
        }
      } else {
        setSettings({
          termsAccepted: data.terms_accepted,
          accountStatus: data.account_status,
          lastLogin: data.last_login
        });
      }
    } catch (error) {
      console.error('Error fetching user settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLastLogin = async () => {
    if (!user) return;

    try {
      await supabase
        .from('user_settings')
        .update({ last_login: new Date().toISOString() })
        .eq('user_id', user.id);
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [user]);

  return {
    settings,
    loading,
    refreshSettings: fetchSettings,
    updateLastLogin
  };
}
