import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { RefreshCw, Info } from 'lucide-react';

interface DebugInfo {
  health: any;
  storage: any;
  posts: any[];
  projectId: string;
}

export const ImageDebugPanel: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [error, setError] = useState('');

  const runDebug = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { contentAPI } = await import('../../utils/supabase/client');
      const { projectId } = await import('../../utils/supabase/info');
      
      // Simple health check
      const postsData = await contentAPI.getBlogPosts();
      
      setDebugInfo({
        health: { status: 'ok', timestamp: new Date().toISOString() },
        storage: { status: 'checking...' },
        posts: postsData.posts || [],
        projectId: projectId
      });
      
    } catch (error) {
      setError('Debug failed: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Image Debug Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runDebug} 
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Checking...' : 'Check Images'}
        </Button>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {debugInfo && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-600">OK</Badge>
                <span className="font-semibold">Posts with Images</span>
              </div>
              <div className="text-sm space-y-2">
                {debugInfo.posts
                  .filter(post => post.additionalImages?.length > 0)
                  .map(post => (
                    <div key={post.id} className="bg-white p-2 rounded">
                      <p><strong>{post.title}</strong></p>
                      <p>Images: {post.additionalImages.length}</p>
                    </div>
                  ))}
                {debugInfo.posts.filter(post => post.additionalImages?.length > 0).length === 0 && (
                  <p className="text-gray-600">No posts with additional images found.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};