export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      daily_challenges: {
        Row: {
          challenge_date: string
          challenge_type: string
          claimed: boolean
          completed: boolean
          created_at: string
          current_value: number
          id: string
          reward_manna: number
          reward_xp: number
          target_value: number
          user_id: string
        }
        Insert: {
          challenge_date?: string
          challenge_type: string
          claimed?: boolean
          completed?: boolean
          created_at?: string
          current_value?: number
          id?: string
          reward_manna?: number
          reward_xp?: number
          target_value: number
          user_id: string
        }
        Update: {
          challenge_date?: string
          challenge_type?: string
          claimed?: boolean
          completed?: boolean
          created_at?: string
          current_value?: number
          id?: string
          reward_manna?: number
          reward_xp?: number
          target_value?: number
          user_id?: string
        }
        Relationships: []
      }
      daily_goals: {
        Row: {
          completed: boolean
          earned_xp: number
          goal_date: string
          id: string
          target_xp: number
          user_id: string
        }
        Insert: {
          completed?: boolean
          earned_xp?: number
          goal_date?: string
          id?: string
          target_xp?: number
          user_id: string
        }
        Update: {
          completed?: boolean
          earned_xp?: number
          goal_date?: string
          id?: string
          target_xp?: number
          user_id?: string
        }
        Relationships: []
      }
      leaderboard_entries: {
        Row: {
          created_at: string
          id: string
          lessons_completed: number
          perfect_lessons: number
          updated_at: string
          user_id: string
          week_start: string
          xp_earned: number
        }
        Insert: {
          created_at?: string
          id?: string
          lessons_completed?: number
          perfect_lessons?: number
          updated_at?: string
          user_id: string
          week_start: string
          xp_earned?: number
        }
        Update: {
          created_at?: string
          id?: string
          lessons_completed?: number
          perfect_lessons?: number
          updated_at?: string
          user_id?: string
          week_start?: string
          xp_earned?: number
        }
        Relationships: []
      }
      learning_stats: {
        Row: {
          correct_answers: number
          created_at: string
          id: string
          lessons_completed: number
          stat_date: string
          time_spent_minutes: number
          total_answers: number
          updated_at: string
          user_id: string
          verses_practiced: number
          xp_earned: number
        }
        Insert: {
          correct_answers?: number
          created_at?: string
          id?: string
          lessons_completed?: number
          stat_date?: string
          time_spent_minutes?: number
          total_answers?: number
          updated_at?: string
          user_id: string
          verses_practiced?: number
          xp_earned?: number
        }
        Update: {
          correct_answers?: number
          created_at?: string
          id?: string
          lessons_completed?: number
          stat_date?: string
          time_spent_minutes?: number
          total_answers?: number
          updated_at?: string
          user_id?: string
          verses_practiced?: number
          xp_earned?: number
        }
        Relationships: []
      }
      power_ups: {
        Row: {
          created_at: string
          id: string
          power_up_type: string
          quantity: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          power_up_type: string
          quantity?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          power_up_type?: string
          quantity?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          current_level: number
          current_streak: number
          current_xp: number
          display_name: string | null
          id: string
          last_activity_date: string | null
          lives: number
          lives_updated_at: string
          longest_streak: number
          manna: number
          max_lives: number
          total_lessons_completed: number
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          current_level?: number
          current_streak?: number
          current_xp?: number
          display_name?: string | null
          id?: string
          last_activity_date?: string | null
          lives?: number
          lives_updated_at?: string
          longest_streak?: number
          manna?: number
          max_lives?: number
          total_lessons_completed?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          current_level?: number
          current_streak?: number
          current_xp?: number
          display_name?: string | null
          id?: string
          last_activity_date?: string | null
          lives?: number
          lives_updated_at?: string
          longest_streak?: number
          manna?: number
          max_lives?: number
          total_lessons_completed?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          book_id: string
          chapter_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          lesson_id: string
          score: number | null
          user_id: string
          xp_earned: number
        }
        Insert: {
          book_id: string
          chapter_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id: string
          score?: number | null
          user_id: string
          xp_earned?: number
        }
        Update: {
          book_id?: string
          chapter_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id?: string
          score?: number | null
          user_id?: string
          xp_earned?: number
        }
        Relationships: []
      }
      verse_progress: {
        Row: {
          created_at: string
          ease_factor: number
          id: string
          interval_days: number
          last_practiced_at: string | null
          mastery_level: number
          next_review_at: string | null
          times_correct: number
          times_practiced: number
          updated_at: string
          user_id: string
          verse_id: string
        }
        Insert: {
          created_at?: string
          ease_factor?: number
          id?: string
          interval_days?: number
          last_practiced_at?: string | null
          mastery_level?: number
          next_review_at?: string | null
          times_correct?: number
          times_practiced?: number
          updated_at?: string
          user_id: string
          verse_id: string
        }
        Update: {
          created_at?: string
          ease_factor?: number
          id?: string
          interval_days?: number
          last_practiced_at?: string | null
          mastery_level?: number
          next_review_at?: string | null
          times_correct?: number
          times_practiced?: number
          updated_at?: string
          user_id?: string
          verse_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
