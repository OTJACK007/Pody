import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Settings, Search, Crown, Edit3, CreditCard, Bug, MessageCircle, LogOut, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUserSettings } from '../../contexts/UserSettingsContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAdmin } from '../../hooks/useAdmin';
import { supabase } from '../../lib/supabase';
import NotificationsMenu from './NotificationsMenu';
import ReportBugModal from './modals/ReportBugModal';
import ContactUsModal from './modals/ContactUsModal';
import UpgradePlanModal from './modals/UpgradePlanModal';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { currentUser, logout } = useAuth();
  const { userSettings } = useUserSettings();
  const { isAdmin } = useAdmin(); 
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showBugModal, setShowBugModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(
    currentUser?.user_metadata?.avatar_url || null
  );

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (currentUser?.id) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('profile_picture')
          .eq('id', currentUser.id)
          .single();

        if (error) {
          console.error('Error fetching profile picture:', error);
          return;
        }

        if (profile?.profile_picture) {
          setProfilePicture(profile.profile_picture);
        }
      }
    };

    fetchProfilePicture();

    // Subscribe to profile changes
    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${currentUser?.id}`
        },
        (payload) => {
          if (payload.new.profile_picture) {
            setProfilePicture(payload.new.profile_picture);
          }
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      channel.unsubscribe();
    };
  }, [currentUser?.id]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className={`${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-800/50' 
        : 'bg-white border-gray-200'
    } border-b sticky top-0 z-40`}>
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center flex-1">
          <button
            onClick={onMenuClick}
            className={`p-2 hover:bg-gray-800 rounded-lg transition-colors md:hidden ${
              theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="ml-4 flex-1 max-w-xl">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search podcasts, summaries, notes..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 text-white border-gray-700/50 focus:border-primary'
                    : 'bg-gray-100 text-black border-gray-200 focus:border-primary'
                } focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-500`}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationsMenu notificationCount={3} />
          
          <button
            onClick={() => navigate('/dashboard/settings')}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-black'
            }`}
          >
            <Settings className="w-6 h-6" />
          </button>
          
          <div className={`relative flex items-center space-x-3 pl-4 border-l ${
            theme === 'dark' ? 'border-gray-800/50' : 'border-gray-200'
          }`}>
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <div className="text-right hidden sm:block">
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}> 
                  {userSettings?.fullName || currentUser?.user_metadata?.full_name || ''}
                  {isAdmin && <span className="ml-2 text-xs text-primary">(Admin)</span>}
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Premium Member</p>
              </div>
              <div className="relative">
                <img
                  src={profilePicture || "https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full ring-2 ring-primary"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full" />
              </div>
            </button>

            {isProfileMenuOpen && (
              <div className={`absolute right-0 top-full mt-2 w-72 rounded-lg shadow-xl border transform transition-all duration-200 ease-out ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}>
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Crown className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Premium Plan</p>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>Unlimited access to all features</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowUpgradeModal(true);
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-black rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Upgrade Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="py-2">
                  <button
                    onClick={() => {
                      navigate('/dashboard/settings/account');
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-700 hover:text-black'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <Edit3 className="w-4 h-4" />
                    </div>
                    <span>Edit Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate('/dashboard/settings/billing');
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-700 hover:text-black'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span>Manage Subscription</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowBugModal(true);
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-700 hover:text-black'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <Bug className="w-4 h-4" />
                    </div>
                    <span>Report a Bug</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowContactModal(true);
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-700 hover:text-black'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span>Contact Us</span>
                  </button>

                  <div className={`px-2 mx-2 my-2 border-t ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                  }`} />

                  <button
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-red-500/10 text-red-500'
                        : 'hover:bg-red-50 text-red-600'
                    }`}
                    onClick={handleLogout}
                  >
                    <div className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ReportBugModal
        isOpen={showBugModal}
        onClose={() => setShowBugModal(false)}
      />

      <ContactUsModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />

      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </header>
  );
};

export default TopBar;