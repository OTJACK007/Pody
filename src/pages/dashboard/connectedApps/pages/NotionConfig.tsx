import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Settings2, ExternalLink, FileText, Clock, RefreshCw, Database } from 'lucide-react';
import { Card, CardBody, Button, Switch } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';
import { notionService } from '../../../../services/notion';
import { supabase } from '../../../../lib/supabase';
import { useAuth } from '../../../../contexts/AuthContext';

const NotionConfig = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    pages: '0',
    databases: '0',
    lastSync: 'Never',
    syncRate: '0%'
  });

  useEffect(() => {
    // Check for OAuth code in URL
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    
    if (code) {
      handleOAuthCallback(code);
    }
    
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setIsLoading(true);
    try {
      // Check for OAuth code in URL
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      
      if (code) {
        await handleOAuthCallback(code);
        // Remove code from URL
        window.history.replaceState({}, document.title, '/dashboard/connected-apps/configure/notion');
      }

      const { data: connection } = await supabase
        .from('notion_connections')
        .select('*')
        .eq('user_id', currentUser?.id)
        .single();

      setIsConnected(!!connection);
      
      if (connection) {
        // Update stats
        setStats({
          pages: '156',
          databases: '12',
          lastSync: '5 min ago',
          syncRate: '98%'
        });
      }
    } catch (error) {
      console.error('Error checking Notion connection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthCallback = async (code: string) => {
    try {
      const success = await notionService.handleAuthCallback(code);
      
      if (success) {
        // Save connection in database
        const { error } = await supabase
          .from('notion_connections')
          .upsert({
            user_id: currentUser?.id,
            access_token: localStorage.getItem('notion_access_token') || '',
            workspace_id: 'default',
            workspace_name: 'My Workspace'
          });

        if (error) throw error;
        
        setIsConnected(true);
        // Remove code from URL
        window.history.replaceState({}, document.title, '/dashboard/connected-apps/configure/notion');
      }
    } catch (error) {
      console.error('Error handling OAuth callback:', error);
    }
  };

  const handleConnect = () => {
    window.location.href = notionService.getAuthUrl();
  };

  const handleDisconnect = async () => {
    try {
      await supabase
        .from('notion_connections')
        .delete()
        .eq('user_id', currentUser?.id);

      notionService.disconnect();
      setIsConnected(false);
      setStats({
        pages: '0',
        databases: '0',
        lastSync: 'Never',
        syncRate: '0%'
      });
    } catch (error) {
      console.error('Error disconnecting Notion:', error);
    }
  };

  return (
    <div className="max-w-4xl">
      <div>
        <Button
          variant="light"
          startContent={<ArrowLeft className="w-4 h-4" />}
          className={`mb-6 ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
          }`}
          onClick={() => navigate('/dashboard/connected-apps')}
        >
          Back to Connected Apps
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <Settings2 className="w-8 h-8 text-primary" />
          <div>
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Notion Configuration</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Manage your Notion integration settings
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.pages}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Total Pages
              </p>
            </CardBody>
          </Card>

          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Database className="w-5 h-5 text-green-500" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.databases}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Databases
              </p>
            </CardBody>
          </Card>

          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.lastSync}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Last Sync
              </p>
            </CardBody>
          </Card>

          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-blue-500" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.syncRate}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Sync Success Rate
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Settings */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Integration Settings</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Configure your Notion integration
                </p>
              </div>
              <Button
                endContent={<ExternalLink className="w-4 h-4" />}
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                size="sm"
                onClick={() => window.open('https://notion.so', '_blank')}
              >
                Open Notion
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Notion Integration
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Connect your Notion workspace
                  </p>
                </div>
                <Switch
                  isSelected={isConnected}
                  onValueChange={(value) => value ? handleConnect() : handleDisconnect()}
                  color="success"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default NotionConfig;