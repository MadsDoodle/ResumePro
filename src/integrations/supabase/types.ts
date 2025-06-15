export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_bio: string | null
          content: string
          created_at: string
          id: string
          publication_date: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          author_bio?: string | null
          content: string
          created_at?: string
          id?: string
          publication_date?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          author_bio?: string | null
          content?: string
          created_at?: string
          id?: string
          publication_date?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_history: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          message_content: string
          message_type: string
          session_id: string
          user_id: string
        }
        Insert: {
          conversation_id?: string
          created_at?: string
          id?: string
          message_content: string
          message_type: string
          session_id: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          message_content?: string
          message_type?: string
          session_id?: string
          user_id?: string
        }
        Relationships: []
      }
      created_resume: {
        Row: {
          created_at: string
          id: string
          resume_pdf: string | null
          resume_title: string
          unique_identifier: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          resume_pdf?: string | null
          resume_title: string
          unique_identifier?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          resume_pdf?: string | null
          resume_title?: string
          unique_identifier?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      credit_history: {
        Row: {
          action_type: string
          created_at: string
          credit_change: number
          description: string | null
          id: string
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          credit_change: number
          description?: string | null
          id?: string
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          credit_change?: number
          description?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      flowcharts: {
        Row: {
          created_at: string
          description: string | null
          flowchart_data: Json
          id: string
          thumbnail_url: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          flowchart_data: Json
          id?: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          flowchart_data?: Json
          id?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          credits: number | null
          current_plan: string | null
          email: string | null
          full_name: string | null
          id: string
          last_credit_reset: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          credits?: number | null
          current_plan?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          last_credit_reset?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          credits?: number | null
          current_plan?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          last_credit_reset?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      resource_documents: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          id: string
          is_active: boolean | null
          updated_at: string
          upload_date: string
          version: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          id?: string
          is_active?: boolean | null
          updated_at?: string
          upload_date?: string
          version?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          id?: string
          is_active?: boolean | null
          updated_at?: string
          upload_date?: string
          version?: string | null
        }
        Relationships: []
      }
      resume_analysis: {
        Row: {
          analysis_date: string
          analysis_summary: string | null
          ats_score: number | null
          created_at: string
          id: string
          improvements: Json | null
          overall_score: number | null
          resume_id: string | null
          strengths: Json | null
          suggestions: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          analysis_date?: string
          analysis_summary?: string | null
          ats_score?: number | null
          created_at?: string
          id?: string
          improvements?: Json | null
          overall_score?: number | null
          resume_id?: string | null
          strengths?: Json | null
          suggestions?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          analysis_date?: string
          analysis_summary?: string | null
          ats_score?: number | null
          created_at?: string
          id?: string
          improvements?: Json | null
          overall_score?: number | null
          resume_id?: string | null
          strengths?: Json | null
          suggestions?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resume_analysis_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "created_resume"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          account_status: string | null
          created_at: string
          id: string
          last_login: string | null
          terms_accepted: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_status?: string | null
          created_at?: string
          id?: string
          last_login?: string | null
          terms_accepted?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_status?: string | null
          created_at?: string
          id?: string
          last_login?: string | null
          terms_accepted?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      voice_conversations: {
        Row: {
          audio_url: string | null
          conversation_id: string
          created_at: string
          id: string
          message_content: string
          message_type: string
          user_id: string
        }
        Insert: {
          audio_url?: string | null
          conversation_id: string
          created_at?: string
          id?: string
          message_content: string
          message_type: string
          user_id: string
        }
        Update: {
          audio_url?: string | null
          conversation_id?: string
          created_at?: string
          id?: string
          message_content?: string
          message_type?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      deduct_credit: {
        Args: {
          p_user_id: string
          p_action_type: string
          p_description?: string
        }
        Returns: boolean
      }
      has_credits: {
        Args: { p_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
