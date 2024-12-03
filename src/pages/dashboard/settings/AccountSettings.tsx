import React from 'react';
import { User, Mail, Phone, MapPin, Building, Globe } from 'lucide-react';
import { Input, Button, Avatar, Card, CardBody } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import SettingsHeader from '../../../components/dashboard/SettingsHeader';

const AccountSettings = () => {
  const { theme } = useTheme();

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
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                className="w-24 h-24"
              />
              <div className="space-y-3">
                <Button 
                  className="bg-secondary/20 text-secondary hover:bg-secondary/30 border border-secondary"
                >
                  Upload New Picture
                </Button>
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
                <label className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>First Name</label>
                <Input
                  placeholder="John"
                  defaultValue="John"
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
                }`}>Last Name</label>
                <Input
                  placeholder="Doe"
                  defaultValue="Doe"
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
                  placeholder="john@example.com"
                  defaultValue="john@example.com"
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
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  startContent={<Phone className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
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
                  placeholder="Company Name"
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
                  placeholder="Job Title"
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
                  placeholder="City, Country"
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
                  placeholder="https://example.com"
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
          <Button color="primary">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;