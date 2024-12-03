import React from 'react';
import { User, Mail, Phone, MapPin, Building, Globe } from 'lucide-react';
import { Input, Button, Avatar, Card, CardBody } from "@nextui-org/react";
import SettingsHeader from '../../../components/dashboard/SettingsHeader';

const AccountSettings = () => {
  return (
    <div className="max-w-4xl">
      <SettingsHeader
        icon={<User className="w-6 h-6 text-primary" />}
        title="Account Settings"
        description="Manage your account details and preferences"
      />
      
      <div className="space-y-6">
        {/* Profile Picture */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Profile Picture</h3>
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
                <p className="text-sm text-gray-400">
                  Recommended: Square image, at least 400x400px
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Personal Information */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">First Name</label>
                <Input
                  placeholder="John"
                  defaultValue="John"
                  startContent={<User className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Last Name</label>
                <Input
                  placeholder="Doe"
                  defaultValue="Doe"
                  startContent={<User className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Email Address</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  defaultValue="john@example.com"
                  startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  startContent={<Phone className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
                  }}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Professional Information */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Company</label>
                <Input
                  placeholder="Company Name"
                  startContent={<Building className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Job Title</label>
                <Input
                  placeholder="Job Title"
                  startContent={<Building className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Location</label>
                <Input
                  placeholder="City, Country"
                  startContent={<MapPin className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Website</label>
                <Input
                  placeholder="https://example.com"
                  startContent={<Globe className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
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