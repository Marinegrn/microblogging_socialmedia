type Empty = Record<string, never>;

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          username: string;
          name: string | null;
          bio: string | null;
          avatar: string | null;
          created_at: string; // ISO date string
          updated_at: string; // ISO date string
        };
        Insert: {
          id?: string;
          email: string;
          username: string;
          name?: string | null;
          bio?: string | null;
          avatar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          username?: string;
          name?: string | null;
          bio?: string | null;
          avatar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          content: string;
          author_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          content: string;
          author_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          content?: string;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          user_id: string;
          post_id: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_id: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          post_id?: string;
        };
      };
      follows: {
        Row: {
          id: string;
          follower_id: string;
          following_id: string;
        };
        Insert: {
          id?: string;
          follower_id: string;
          following_id: string;
        };
        Update: {
          id?: string;
          follower_id?: string;
          following_id?: string;
        };
      };
    };
    Views: Empty;
    Functions: Empty;
    Enums: Empty;
    CompositeTypes: Empty;
  };
}

