export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
  };
  likesCount: number;
  isLiked: boolean;
}
export interface TrendingTopic {
  hashtag: string;
  posts: number;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
}

export interface ApiResponse<T = any> {
  message?: string;
  error?: string;
  data?: T;
}

export interface PostsResponse {
  posts: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

export interface AuthResponse {
  message: string;
  user: User;
  session?: {
    access_token: string;
    refresh_token: string;
  };
}

// Types pour les formulaires
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  username: string;
}

export interface CreatePostForm {
  content: string;
}

export interface UpdateProfileForm {
  name?: string;
  bio?: string;
  avatar?: string;
}