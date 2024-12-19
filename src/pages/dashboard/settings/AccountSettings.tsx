import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Building, Globe, Search } from 'lucide-react';
import { Input, Button, Avatar, Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useUserSettings } from '../../../contexts/UserSettingsContext';
import SettingsHeader from '../../../components/dashboard/SettingsHeader';
import { supabase } from '../../../lib/supabase';
import { countryCodes, detectCountryCode, formatPhoneNumber } from '../../../utils/phoneUtils';
import { getUserProfile, getUserSettings, updateUserProfile, updateUserProfessionalInfo } from '../../../lib/database';
import type { ProfileData, ProfessionalInfo } from '../../../types/settings';

const AccountSettings = () => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const { refreshSettings } = useUserSettings();
  const { userSettings } = useUserSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: selectedCountry.dial_code,
    company: '',
    jobTitle: '',
    location: '',
    website: '',
    profilePicture: ''
  });

  useEffect(() => {
    if (!currentUser?.id) return;

    const loadUserSettings = async () => {
      try {
        const [profile, settings] = await Promise.all([
          getUserProfile(currentUser.id),
          getUserSettings(currentUser.id)
        ]);

        if (profile && settings) {
          const { professionalInfo } = settings;
          
          setFormData({
            fullName: profile.fullname || currentUser.user_metadata?.full_name || '',
            email: profile.email || currentUser.email || '',
            phoneNumber: profile.phone_number || selectedCountry.dial_code,
            company: professionalInfo.company || '',
            jobTitle: professionalInfo.jobTitle || '',
            location: professionalInfo.location || '',
            website: professionalInfo.website || '',
            profilePicture: profile.profile_picture || currentUser.user_metadata?.avatar_url || ''
          });
        }
      } catch (error) {
        console.error('Error loading user settings:', error);
        alert('Error loading settings. Please refresh the page.');
      }
    };

    loadUserSettings();
  }, [currentUser?.id, selectedCountry?.dial_code, currentUser?.email, currentUser?.user_metadata?.full_name, currentUser?.user_metadata?.avatar_url]);

  useEffect(() => {
    // Cleanup preview URL on unmount
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handlePhoneChange = (value: string) => {
    const detectedCountry = detectCountryCode(value);
    if (detectedCountry) {
      setSelectedCountry(detectedCountry);
    }
    const phoneValue = value || '';
    setFormData(prev => ({ 
      ...prev, 
      phoneNumber: formatPhoneNumber(phoneValue, selectedCountry)
    }));
  };

  const filteredCountries = countryCodes.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dial_code.includes(searchQuery)
  );

  const handleSave = async () => {
    if (!currentUser?.id) return;

    setIsLoading(true);
    try {
      const profileData: Partial<ProfileData> = {
        fullname: formData.fullName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        profile_picture: formData.profilePicture,
        updated_at: new Date().toISOString()
      };

      const professionalInfo: ProfessionalInfo = {
        company: formData.company,
        jobTitle: formData.jobTitle,
        location: formData.location,
        website: formData.website
      };

      await Promise.all([
        updateUserProfile(currentUser.id, profileData),
        updateUserProfessionalInfo(currentUser.id, professionalInfo)
      ]);

      await refreshSettings();
      
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error updating settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser?.id) return;

     // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

     // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${currentUser.id}/profile.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        profilePicture: publicUrl
      }));
      
      // Save changes immediately after upload
      await handleSave();
      
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
                src={previewImage || formData.profilePicture || "https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png"}
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
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Uploading image...
                  </p>
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

        {/* Personal Information */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={`text-sm col-span-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Full Name</label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  startContent={<User className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Phone Number</label>
                <div className="flex gap-2">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button 
                        className={`min-w-[120px] ${
                          theme === 'dark'
                            ? 'bg-gray-700/50 text-white border-gray-600'
                            : 'bg-gray-100 text-gray-900 border-gray-300'
                        }`}
                      >
                        <span className="mr-2">{selectedCountry.flag}</span>
                        <span>{selectedCountry.dial_code}</span>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      className="max-h-[300px] overflow-y-auto"
                      aria-label="Country codes"
                    >
                      <DropdownItem>
                        <Input
                          placeholder="Search countries..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          startContent={<Search className="w-4 h-4 text-gray-400" />}
                          classNames={{
                            input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                            inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                          }}
                        />
                      </DropdownItem>
                      {filteredCountries.map((country) => (
                        <DropdownItem
                          key={country.code}
                          onClick={() => setSelectedCountry(country)}
                        >
                          <div className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.name}</span>
                            <span className="text-gray-400 ml-auto">
                              {country.dial_code}
                            </span>
                          </div>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  <Input
                    type="tel"
                    value={(formData.phoneNumber || '').replace(selectedCountry.dial_code, '')}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    startContent={<Phone className="w-4 h-4 text-gray-400" />}
                    placeholder="Phone number"
                    classNames={{
                      input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                      inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                    }}
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Professional Information */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Company</label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  startContent={<Building className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Job Title</label>
                <Input
                  value={formData.jobTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                  startContent={<Building className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  startContent={<MapPin className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Website</label>
                <Input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  startContent={<Globe className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="flex justify-end gap-3">
          <Button color="danger" variant="flat">
            Cancel
          </Button>
          <Button 
            color="primary"
            onClick={handleSave}
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;