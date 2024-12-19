import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, MapPin, Building, Globe, Camera } from 'lucide-react';
import { Input, Button, Avatar, Progress } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useUserSettings } from '../../../contexts/UserSettingsContext';
import SettingsHeader from '../../../components/dashboard/SettingsHeader';
import { getAccountSettings, updateAccountSettings } from '../../../services/settings/accountService';
import { uploadProfilePicture } from '../../../lib/storage';

const AccountSettings = () => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const { refreshSettings } = useUserSettings();
  const { userSettings } = useUserSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [settings, setSettings] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
    location: '',
    website: '',
    profilePicture: ''
  });

  useEffect(() => {
    const loadSettings = async () => {
      if (currentUser?.id) {
        try {
          // Get profile data
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single();

          if (profileError) throw profileError;

          // Set settings from profile data
          setSettings({
            fullName: profile.full_name || currentUser.user_metadata?.full_name || '',
            email: profile.email || currentUser.email || '',
            phoneNumber: profile.phone_number || '',
            company: profile.company || '',
            jobTitle: profile.job_title || '',
            location: profile.location || '',
            website: profile.website || '',
            profilePicture: profile.avatar_url || ''
          });
        } catch (error) {
          console.error('Error loading user settings:', error);
        }
      }
    };
    loadSettings();
  }, [currentUser?.id]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser?.id) return;
    setIsLoading(true);
    setUploadProgress(0);

    try {
      const publicUrl = await uploadProfilePicture(currentUser.id, file, setUploadProgress);
      
      // Update local state
      setSettings(prev => ({
        ...prev,
        profilePicture: publicUrl
      }));
      
      // Update Supabase
      const { error } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentUser.id);
      
      if (error) throw error;
      
      await refreshSettings();
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    if (!currentUser?.id) return;

    setIsLoading(true);
    try {
      const [firstName, ...lastNameParts] = settings.fullName.trim().split(' ');
      const lastName = lastNameParts.join(' ');
      
      // Update profile in Supabase
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          full_name: settings.fullName,
          email: settings.email,
          phone_number: settings.phoneNumber,
          company: settings.company,
          job_title: settings.jobTitle,
          location: settings.location,
          website: settings.website,
          avatar_url: settings.profilePicture,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentUser.id);

      if (profileError) throw profileError;

      // Update auth metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          full_name: settings.fullName,
          first_name: firstName,
          last_name: lastName
        }
      });

      if (metadataError) throw metadataError;

      await refreshSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <SettingsHeader
        icon={<User className="w-6 h-6 text-[#ff3366]" />}
        title="Account Settings"
        description="Manage your account details and preferences"
      />
      
      <div className="space-y-6">
        {/* Profile Picture */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Profile Picture</h3>
            <div className="flex items-center gap-6">
              <Avatar
                isBordered
                src={settings.profilePicture || currentUser?.photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"}
                className="w-24 h-24"
              />
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/png,image/jpeg,image/jpg,image/gif"
                  onChange={handleFileSelect}
                />
                <Button 
                  className="bg-secondary/20 text-secondary hover:bg-secondary/30 border border-secondary"
                  onClick={handleUploadClick}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  Upload New Picture
                </Button>
                {isLoading && (
                  <Progress 
                    value={uploadProgress} 
                    color="primary"
                    className="max-w-md"
                  />
                )}
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Recommended: Square image, at least 400x400px
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Rest of the form */}
        {/* ... */}
      </div>
    </div>
  );
};

export default AccountSettings;