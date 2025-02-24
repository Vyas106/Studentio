"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FiHeart, FiMessageSquare, FiShare2, FiBookmark, FiArrowLeft } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, increment } from '@/lib/firebase';
import { db } from '@/lib/firebase';
import { useAuth } from '../../../../utils/hooks/useAuth';
import type { Post, Comment, UserProfile } from '../../../../types/user';
import Link from 'next/link';

export default function PostPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [postUser, setPostUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [commentUsers, setCommentUsers] = useState<Record<string, UserProfile>>({});

  const fetchPost = async () => {
    try {
      const postDoc = await getDoc(doc(db, 'posts', id as string));
      if (!postDoc.exists()) {
        throw new Error('Post not found');
      }

      const postData = { id: postDoc.id, ...postDoc.data() } as Post;
      setPost(postData);

      // Fetch post author details
      const userDoc = await getDoc(doc(db, 'users', postData.userId));
      if (userDoc.exists()) {
        setPostUser(userDoc.data() as UserProfile);
      }

      // Fetch comment authors
      const commentUserIds = postData.comments?.map(comment => comment.userId) || [];
      const uniqueUserIds = [...new Set(commentUserIds)];
      
      const commentUserData: Record<string, UserProfile> = {};
      for (const userId of uniqueUserIds) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          commentUserData[userId] = userDoc.data() as UserProfile;
        }
      }
      setCommentUsers(commentUserData);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        title: "Error",
        description: "Failed to load post. Please try again later.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!user || !post) return;

    try {
      const postRef = doc(db, 'posts', post.id);
      const isLiked = post.likes.includes(user.uid);

      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
      });

      setPost(prev => {
        if (!prev) return null;
        return {
          ...prev,
          likes: isLiked 
            ? prev.likes.filter(id => id !== user.uid)
            : [...prev.likes, user.uid]
        };
      });

      toast({
        title: isLiked ? "Post unliked" : "Post liked",
        variant: "default"
      });
    } catch (error) {
      console.error('Error updating like:', error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSave = async () => {
    if (!user || !post) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      if (!userData) throw new Error('User data not found');

      const savedPosts = userData.savedPosts || [];
      const isSaved = savedPosts.includes(post.id);

      await updateDoc(userRef, {
        savedPosts: isSaved ? arrayRemove(post.id) : arrayUnion(post.id)
      });

      toast({
        title: isSaved ? "Post removed from saved" : "Post saved",
        variant: "default"
      });
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleShare = async () => {
    if (!post) return;

    try {
      await navigator.clipboard.writeText(window.location.href);
      
      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        shares: increment(1)
      });

      setPost(prev => {
        if (!prev) return null;
        return {
          ...prev,
          shares: (prev.shares || 0) + 1
        };
      });

      toast({
        title: "Link copied",
        description: "Post link copied to clipboard",
        variant: "default"
      });
    } catch (error) {
      console.error('Error sharing post:', error);
      toast({
        title: "Error",
        description: "Failed to share post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleComment = async () => {
    if (!user || !post || !commentText.trim()) return;

    try {
      const newComment: Comment = {
        id: Date.now().toString(),
        userId: user.uid,
        content: commentText.trim(),
        createdAt: Date.now(),
      };

      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        comments: arrayUnion(newComment)
      });

      setPost(prev => {
        if (!prev) return null;
        return {
          ...prev,
          comments: [...(prev.comments || []), newComment]
        };
      });

      setCommentText('');

      toast({
        title: "Comment added",
        variant: "default"
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Skeleton className="h-[600px] rounded-xl" />
      </div>
    );
  }

  if (!post || !postUser) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p className="text-gray-600 mb-4">The post you're looking for doesn't exist or has been removed.</p>
        <Link href="/explore">
          <Button>
            <FiArrowLeft className="mr-2" />
            Back to Explore
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/explore">
          <Button variant="ghost" className="mb-4">
            <FiArrowLeft className="mr-2" />
            Back to Explore
          </Button>
        </Link>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-12 w-12">
                <AvatarImage src={postUser.photoURL} />
                <AvatarFallback>{postUser.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">{postUser.name}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt as number).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {post.imageUrl && (
              <div className="relative h-96 mb-6">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            <p className="text-gray-800 text-lg mb-6 whitespace-pre-wrap">{post.content}</p>

            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between py-4 border-t border-b">
              <div className="flex gap-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={post.likes?.includes(user?.uid || '') ? 'text-red-500' : ''}
                >
                  <FiHeart className="mr-2" />
                  {post.likes?.length || 0} likes
                </Button>
                
                <Button variant="ghost" size="sm">
                  <FiMessageSquare className="mr-2" />
                  {post.comments?.length || 0} comments
                </Button>

                <Button variant="ghost" size="sm">
                  <FiShare2 className="mr-2" />
                  {post.shares || 0} shares
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
              >
                <FiBookmark />
              </Button>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-4">Comments</h3>
              
              {user ? (
                <div className="mb-6">
                  <Textarea
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="mb-2"
                  />
                  <Button 
                    onClick={handleComment}
                    disabled={!commentText.trim()}
                  >
                    Post Comment
                  </Button>
                </div>
              ) : (
                <p className="text-gray-600 mb-4">
                  Please <Link href="/login" className="text-blue-600">sign in</Link> to comment
                </p>
              )}

              <div className="space-y-4">
                {post.comments?.map((comment) => {
                  const commentUser = commentUsers[comment.userId];
                  return (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={commentUser?.photoURL} />
                          <AvatarFallback>{commentUser?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{commentUser?.name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}