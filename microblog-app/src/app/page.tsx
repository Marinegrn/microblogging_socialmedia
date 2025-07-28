'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import type { User, Post, Like, Follow, TrendingTopic } from '@shared';
import { Heart, MessageCircle, Repeat2, Share, Search, Bell, Mail, Bookmark, User, Home, Hash, MoreHorizontal, Edit3, TrendingUp, Users, Calendar, MapPin, ExternalLink, Verified } from 'lucide-react';

// Types TypeScript basés sur le modèle Prisma


const MicroblogHomepage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulation des données basées sur le modèle Prisma TODO : appel APIs
  useEffect(() => {
    const fetchData = async () => {
      // Simuler le chargement des données depuis API
      // GET /api/auth/me pour l'utilisateur connecté
      // GET /api/posts pour le feed
      // BONUS : GET /api/users/suggestions pour les suggestions
      
      setTimeout(() => {
        setCurrentUser({
          id: 'user-1',
          email: 'john.doe@example.com',
          username: 'john_doe',
          name: 'John Doe',
          bio: 'Développeur Full Stack | Tech enthusiast 🚀',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          createdAt: '2020-03-15T10:00:00Z',
          updatedAt: '2024-07-28T10:00:00Z',
          followersCount: 1234,
          followingCount: 567,
          postsCount: 42
        });

        // Test
        const mockPosts: Post[] = [
          {
            id: 'post-1',
            content: 'Juste fini de déployer ma nouvelle app React avec NextJS et Supabase! Les performances sont incroyables 🚀 #coding #react #nextjs',
            authorId: 'user-2',
            createdAt: '2024-07-28T10:30:00Z',
            updatedAt: '2024-07-28T10:30:00Z',
            author: {
              id: 'user-2',
              email: 'marie@example.com',
              username: 'marie_dev',
              name: 'Marie Yamamoto',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              createdAt: '2019-08-15T10:00:00Z',
              updatedAt: '2024-07-28T09:00:00Z',
              followersCount: 892,
              followingCount: 234,
              postsCount: 156
            },
            likes: [
              { id: 'like-1', userId: 'user-3', postId: 'post-1' },
              { id: 'like-2', userId: 'user-4', postId: 'post-1' }
            ],
            likesCount: 42,
            isLikedByCurrentUser: false
          },
          {
            id: 'post-2',
            content: 'Les tests automatisés avec Vitest et React Testing Library changent vraiment la donne. Plus jamais de bugs en production! 🧪✨',
            authorId: 'user-3',
            createdAt: '2024-07-28T09:15:00Z',
            updatedAt: '2024-07-28T09:15:00Z',
            author: {
              id: 'user-3',
              email: 'alex@example.com',
              username: 'alex_fullstack',
              name: 'Alex Rodriguez',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
              createdAt: '2021-01-15T10:00:00Z',
              updatedAt: '2024-07-28T08:00:00Z',
              followersCount: 445,
              followingCount: 189,
              postsCount: 78
            },
            likes: [
              { id: 'like-3', userId: 'user-1', postId: 'post-2' },
              { id: 'like-4', userId: 'user-4', postId: 'post-2' }
            ],
            likesCount: 28,
            isLikedByCurrentUser: true
          },
          {
            id: 'post-3',
            content: 'Qui d\'autre est tombé amoureux de Tailwind CSS? Cette bibliothèque est juste parfaite pour du rapid prototyping 💙',
            authorId: 'user-4',
            createdAt: '2024-07-28T08:45:00Z',
            updatedAt: '2024-07-28T08:45:00Z',
            author: {
              id: 'user-4',
              email: 'sarah@example.com',
              username: 'sarah_design',
              name: 'Sarah Osei',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
              createdAt: '2018-11-15T10:00:00Z',
              updatedAt: '2024-07-28T07:00:00Z',
              followersCount: 2341,
              followingCount: 892,
              postsCount: 234
            },
            likes: [
              { id: 'like-5', userId: 'user-2', postId: 'post-3' },
              { id: 'like-6', userId: 'user-3', postId: 'post-3' }
            ],
            likesCount: 156,
            isLikedByCurrentUser: false
          },
          
          {
            id: 'post-4',
            content: 'Le design thinking transforme la manière dont nous créons des expériences utilisateurs. 🚀',
            authorId: 'user-5',
            createdAt: '2024-07-20T11:00:00Z',
            updatedAt: '2024-07-20T11:00:00Z',
            author: {
              id: 'user-5',
              email: 'emma@example.com',
              username: 'emma_codes',
              name: 'Emma Diakité',
              avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
              createdAt: '2021-01-10T08:00:00Z',
              updatedAt: '2025-07-28T10:00:00Z',
              followersCount: 1540,
              followingCount: 321,
              postsCount: 78
              },
            likes: [
              { id: 'like-5', userId: 'user-1', postId: 'post-4' },
              { id: 'like-6', userId: 'user-3', postId: 'post-4' }
            ],
            likesCount: 52,
            isLikedByCurrentUser: false
          },
          {
            id: 'post-5',
            content: 'La collaboration est la clé pour créer des projets innovants et durables. 🤝',
            authorId: 'user-6',
            createdAt: '2024-07-22T14:30:00Z',
            updatedAt: '2024-07-22T14:30:00Z',
            author: {
              id: 'user-6',
              email: 'liam@example.com',
              username: 'liam_design',
              name: 'Liam Ivanov',
              avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop&crop=face',
              createdAt: '2022-05-12T11:00:00Z',
              updatedAt: '2025-07-27T14:30:00Z',
              followersCount: 879,
              followingCount: 189,
              postsCount: 45
              },
            likes: [
              { id: 'like-7', userId: 'user-2', postId: 'post-5' }
            ],
            likesCount: 12,
            isLikedByCurrentUser: false
          },
          {
            id: 'post-6',
            content: 'JavaScript est devenu le langage universel du web. Chaque jour, il continue d’évoluer !',
            authorId: 'user-7',
            createdAt: '2024-07-25T16:00:00Z',
            updatedAt: '2024-07-25T16:00:00Z',
            author: {
              id: 'user-7',
              email: 'sofia@example.com',
              username: 'sofia_ui',
              name: 'Sofiane Abdelrahman',
              avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face',
              createdAt: '2020-09-25T09:30:00Z',
              updatedAt: '2025-07-28T09:45:00Z',
              followersCount: 2033,
              followingCount: 420,
              postsCount: 123
            },
          likes: [
            { id: 'like-8', userId: 'user-5', postId: 'post-6' },
            { id: 'like-9', userId: 'user-6', postId: 'post-6' },
            { id: 'like-10', userId: 'user-8', postId: 'post-6' }
          ],
          likesCount: 89,
          isLikedByCurrentUser: true
        },
        {
          id: 'post-7',
          content: 'Le backend est le moteur qui fait tourner toutes nos applications préférées.',
          authorId: 'user-8',
          createdAt: '2024-07-26T09:20:00Z',
          updatedAt: '2024-07-26T09:20:00Z',
          author: {
            id: 'user-8',
            email: 'lucas@example.com',
            username: 'lucas_dev',
            name: 'Lucas Müller',
            avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=150&h=150&fit=crop&crop=face',
            createdAt: '2019-04-17T13:00:00Z',
            updatedAt: '2025-07-26T17:00:00Z',
            followersCount: 640,
            followingCount: 98,
            postsCount: 91
          },
          likes: [],
          likesCount: 0,
          isLikedByCurrentUser: false
        },
        {
          id: 'post-8',
          content: 'Les frameworks JS modernes facilitent le développement front-end comme jamais.',
          authorId: 'user-9',
          createdAt: '2024-07-27T12:45:00Z',
          updatedAt: '2024-07-27T12:45:00Z',
          author: {
            id: 'user-9',
            email: 'clara@example.com',
            username: 'clara_js',
            name: 'Clara Dupont',
            avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
            createdAt: '2023-01-05T10:15:00Z',
            updatedAt: '2025-07-25T12:00:00Z',
            followersCount: 1580,
            followingCount: 301,
            postsCount: 65
          },
          likes: [
            { id: 'like-11', userId: 'user-7', postId: 'post-8' }
          ],
          likesCount: 15,
          isLikedByCurrentUser: false
        },
        {
          id: 'post-9',
          content: 'Node.js est idéal pour construire des API rapides et scalables. À adopter !',
          authorId: 'user-10',
          createdAt: '2024-07-28T08:00:00Z',
          updatedAt: '2024-07-28T08:00:00Z',
          author: {
            id: 'user-10',
            email: 'matt@example.com',
            username: 'matt_node',
            name: 'Matt García',
            avatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=150&h=150&fit=crop&crop=face',
            createdAt: '2018-06-20T14:45:00Z',
            updatedAt: '2025-07-24T18:30:00Z',
            followersCount: 2109,
            followingCount: 632,
            postsCount: 201
          },
          likes: [
            { id: 'like-12', userId: 'user-9', postId: 'post-9' },
            { id: 'like-13', userId: 'user-4', postId: 'post-9' }
          ],
          likesCount: 42,
          isLikedByCurrentUser: true
        }];

        setPosts(mockPosts);

      setTrendingTopics([
        { hashtag: '#NextJS', posts: 12453 },
        { hashtag: '#React', posts: 8921 },
        { hashtag: '#Tailwind', posts: 5647 },
        { hashtag: '#TypeScript', posts: 4332 },
        { hashtag: '#Supabase', posts: 2108 }
      ]);

      setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const handleLike = async (postId: string) => {
    if (!currentUser) return;
    
    // Optimistic update
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isCurrentlyLiked = post.isLikedByCurrentUser;
        const newLikes = isCurrentlyLiked 
          ? post.likes.filter(like => like.userId !== currentUser.id)
          : [...post.likes, { id: `temp-${Date.now()}`, userId: currentUser.id, postId }];
        
        return {
          ...post,
          likes: newLikes,
          likesCount: isCurrentlyLiked ? post.likesCount - 1 : post.likesCount + 1,
          isLikedByCurrentUser: !isCurrentlyLiked
        };
      }
      return post;
    }));

    // TODO: Appel API
    // if (post.isLikedByCurrentUser) {
    //   await fetch(`/api/posts/${postId}/unlike`, { method: 'DELETE' });
    // } else {
    //   await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
    // }
  };

  const handleFollow = async (userId: string) => {
    // TODO: Implémenter la logique de follow/unfollow
    // await fetch(`/api/users/${userId}/follow`, { method: 'POST' });
    console.log('Follow user:', userId);
  };

  const handleNewPost = async () => {
    if (newPostContent.trim() && currentUser) {
      const newPost: Post = {
        id: `temp-post-${Date.now()}`,
        content: newPostContent,
        authorId: currentUser.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: currentUser,
        likes: [],
        likesCount: 0,
        isLikedByCurrentUser: false
      };
      
      // Optimistic update
      setPosts([newPost, ...posts]);
      setNewPostContent('');

      // TODO: Appel API
      // try {
      //   const response = await fetch('/api/posts', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ content: newPostContent })
      //   });
      //   const createdPost = await response.json();
      //   // Remplacer le post temporaire par le vrai post
      // } catch (error) {
      //   // Rollback en cas d'erreur
      //   setPosts(posts => posts.filter(post => post.id !== newPost.id));
      // }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'maintenant';
    if (diffHours < 24) return `${diffHours}h`;
    return `${Math.floor(diffHours / 24)}j`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-8 h-8 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-8 h-8 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              MicroBlog
            </h1>
            <nav className="hidden md:flex space-x-6">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-full bg-blue-500/10 text-blue-400">
                <Home size={20} />
                <span>Accueil</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-800 transition-colors">
                <Hash size={20} />
                <span>Explorer</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-800 transition-colors">
                <Bell size={20} />
                <span>Notifications</span>
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="bg-gray-900 pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            {currentUser && (
              <div className="flex items-center space-x-3">
                <Image
                  src={currentUser.avatar || '/default-avatar.png'} // Fallback si avatar est undefined
                  alt={currentUser.displayName || currentUser.username}
                  width={32}       // Remplace w-8 (8 * 4px = 32px)
                  height={32}      // Remplace h-8
                  className="rounded-full"
                />
                <span className="hidden md:block font-medium">{currentUser.displayName}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-20 max-w-6xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar gauche */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              {currentUser && (
                <div className="bg-gray-900/50 rounded-2xl p-6 mb-6 backdrop-blur-sm border border-gray-800">
                  <div className="flex items-center space-x-3 mb-4">
                    <Image
                      src={currentUser.avatar || '/default-avatar.png'}
                      alt={currentUser.name || currentUser.username}
                      width={48} // w-12 = 12 * 4px = 48px
                      height={48} // h-12 = 12 * 4px = 48px
                      className="rounded-full"
                      />                    
                      <div>
                      <div className="flex items-center space-x-1">
                        <h3 className="font-bold">{currentUser.name || currentUser.username}</h3>
                      </div>
                      <p className="text-gray-400 text-sm">@{currentUser.username}</p>
                      </div>
                  </div>
                  {currentUser.bio && <p className="text-sm mb-4">{currentUser.bio}</p>}
                  <div className="flex space-x-4 text-sm">
                    <span><strong>{currentUser.followingCount}</strong> <span className="text-gray-400">Suivi(e)s</span></span>
                    <span><strong>{currentUser.followersCount}</strong> <span className="text-gray-400">Abonnés</span></span>
                  </div>
                </div>
              )}

              <div className="bg-gray-900/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-800">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <TrendingUp className="mr-2 text-orange-500" size={20} />
                  Tendances
                </h3>
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="py-3 border-b border-gray-800 last:border-b-0 hover:bg-gray-800/50 rounded-lg px-2 cursor-pointer transition-colors">
                    <p className="font-medium text-blue-400">{topic.hashtag}</p>
                    <p className="text-gray-400 text-sm">{topic.posts.toLocaleString()} posts</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feed principal */}
          <div className="lg:col-span-2">
            {/* Composer un nouveau post */}
            <div className="bg-gray-900/50 rounded-2xl p-6 mb-6 backdrop-blur-sm border border-gray-800">
              <div className="flex space-x-4">
                {currentUser && (
                  <Image 
                  src={currentUser.avatar || '/default-avatar.png'} 
                  alt={currentUser.name || currentUser.username}
                  width={48} // w-12 = 12 * 4px = 48px
                  height={48}
                  className="w-12 h-12 rounded-full" />
                )}
                <div className="flex-1">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Quoi de neuf?"
                    className="w-full bg-transparent text-xl placeholder-gray-500 resize-none focus:outline-none"
                    rows={3}
                    maxLength={280}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400">
                        {newPostContent.length}/280
                      </span>
                    </div>
                    <button
                      onClick={handleNewPost}
                      disabled={!newPostContent.trim() || newPostContent.length > 280}
                      className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 px-6 py-2 rounded-full font-medium transition-colors disabled:cursor-not-allowed"
                    >
                      Publier
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <article key={post.id} className="bg-gray-900/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-800 hover:bg-gray-900/70 transition-colors">
                  <div className="flex space-x-3">
                    <Image
                      src={post.author.avatar || '/default-avatar.png'} 
                      alt={post.author.name || post.author.username}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-bold">{post.author.name || post.author.username}</span>
                        <span className="text-gray-400">@{post.author.username}</span>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-400">{formatDate(post.createdAt)}</span>
                        <button className="ml-auto text-gray-400 hover:text-white">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-white leading-relaxed">{post.content}</p>
                      </div>

                      <div className="flex items-center justify-between max-w-md">
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                            <MessageCircle size={18} />
                          </div>
                          <span className="text-sm">0</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-green-500/10">
                            <Repeat2 size={18} />
                          </div>
                          <span className="text-sm">0</span>
                        </button>
                        
                        <button 
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 transition-colors group ${
                            post.isLikedByCurrentUser ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                          }`}
                        >
                          <div className="p-2 rounded-full group-hover:bg-red-500/10">
                            <Heart size={18} fill={post.isLikedByCurrentUser ? 'currentColor' : 'none'} />
                          </div>
                          <span className="text-sm">{post.likesCount}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                            <Share size={18} />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar droite */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-gray-900/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-800">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Users className="mr-2 text-green-500" size={20} />
                  Suggestions
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Emma Tech', username: 'emma_codes', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face', verified: true },
                    { name: 'David UI', username: 'david_design', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', verified: false },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image 
                        src={user.avatar} 
                        alt={user.name} 
                        width={48}
                        height={48}
                        className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="flex items-center space-x-1">
                            <p className="font-medium">{user.name}</p>
                            {user.verified && <Verified className="text-blue-500" size={14} />}
                          </div>
                          <p className="text-gray-400 text-sm">@{user.username}</p>
                        </div>
                      </div>
                      <button className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                        Suivre
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Navigation mobile*/}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800 lg:hidden">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center space-y-1 text-blue-400">
            <Home size={24} />
            <span className="text-xs">Accueil</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400">
            <Search size={24} />
            <span className="text-xs">Recherche</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400">
            <Bell size={24} />
            <span className="text-xs">Notifications</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400">
            <User size={24} />
            <span className="text-xs">Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MicroblogHomepage;
