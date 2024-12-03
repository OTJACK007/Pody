import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardBody, CardFooter, Button, Avatar } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../contexts/ThemeContext';
import useEmblaCarousel from 'embla-carousel-react';

const FamousGuests = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const famousGuests = [
    {
      id: '1',
      name: 'Elon Musk',
      avatar: 'https://static.wixstatic.com/media/c67dd6_8d954ad6b5dc4867b2c13fbef9341d21~mv2.jpg',
      role: 'CEO of Tesla & SpaceX',
      episodes: 3,
      rating: 4.9,
      verified: true,
      coverImage: 'https://static.wixstatic.com/media/c67dd6_8d954ad6b5dc4867b2c13fbef9341d21~mv2.jpg'
    },
    {
      id: '2',
      name: 'Mark Cuban',
      avatar: 'https://static.wixstatic.com/media/c67dd6_1873b1030e46472a999c3cfa20e5ba9e~mv2.jpg',
      role: 'Entrepreneur & Investor',
      episodes: 5,
      rating: 4.8,
      verified: true,
      coverImage: 'https://static.wixstatic.com/media/c67dd6_1873b1030e46472a999c3cfa20e5ba9e~mv2.jpg'
    },
    {
      id: '3',
      name: 'Gary Vee',
      avatar: 'https://static.wixstatic.com/media/c67dd6_ad136564a8924721aa5fa2b1ccb5774d~mv2.webp',
      role: 'CEO of VaynerMedia',
      episodes: 8,
      rating: 4.7,
      verified: true,
      coverImage: 'https://static.wixstatic.com/media/c67dd6_ad136564a8924721aa5fa2b1ccb5774d~mv2.webp'
    },
    {
      id: '4',
      name: 'Simon Sinek',
      avatar: 'https://static.wixstatic.com/media/c67dd6_a62a8c6f29f641f890cbb690871e4aac~mv2.jpg',
      role: 'Author & Leadership Expert',
      episodes: 6,
      rating: 4.9,
      verified: true,
      coverImage: 'https://static.wixstatic.com/media/c67dd6_a62a8c6f29f641f890cbb690871e4aac~mv2.jpg'
    },
    {
      id: '5',
      name: 'Sara Blakely',
      avatar: 'https://static.wixstatic.com/media/c67dd6_fc57c7fb30ad42ebb64050a3c940084a~mv2.jpg',
      role: 'Founder of Spanx',
      episodes: 4,
      rating: 4.8,
      verified: true,
      coverImage: 'https://static.wixstatic.com/media/c67dd6_fc57c7fb30ad42ebb64050a3c940084a~mv2.jpg'
    },
    {
      id: '6',
      name: 'Tim Ferriss',
      avatar: 'https://static.wixstatic.com/media/c67dd6_3e0b3fd2580d46968c46c6353d0dff31~mv2.png',
      role: 'Author & Angel Investor',
      episodes: 7,
      rating: 4.9,
      verified: true,
      coverImage: 'https://static.wixstatic.com/media/c67dd6_3e0b3fd2580d46968c46c6353d0dff31~mv2.png'
    },
    {
      id: '7',
      name: 'Naval Ravikant',
      avatar: 'https://static.wixstatic.com/media/c67dd6_1a731dd9bcc44bf69f8d8031660ec251~mv2.jpg',
      role: 'Angel Investor & Philosopher',
      episodes: 5,
      rating: 4.9,
      verified: true,
      coverImage: 'https://static.wixstatic.com/media/c67dd6_1a731dd9bcc44bf69f8d8031660ec251~mv2.jpg'
    },
    {
      id: '8',
      name: 'Marie Forleo',
      avatar: 'https://static.wixstatic.com/media/c67dd6_b447dc89e76b4ee1a7076515e4b8bdb1~mv2.jpg',
      role: 'Entrepreneur & Author',
      episodes: 4,
      rating: 4.7,
      verified: true,
      coverImage: 'https://static.wixstatic.com/media/c67dd6_b447dc89e76b4ee1a7076515e4b8bdb1~mv2.jpg'
    }
  ];

  return (
    <div className="overflow-hidden -mx-6" ref={emblaRef}>
      <div className="flex gap-4 px-6 py-4">
        {famousGuests.map((guest) => (
          <div key={guest.id} className="flex-none w-[300px]">
            <Card className={`${
              theme === 'dark'
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white border-gray-200'
            } border`}>
              <CardBody className="p-0">
                <div className="relative w-full h-[168px]">
                  <img
                    src={guest.coverImage}
                    alt={guest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={guest.avatar}
                        className="ring-2 ring-white/20"
                        size="lg"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-semibold">{guest.name}</h3>
                          {guest.verified && (
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-gray-300">{guest.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="justify-between">
                <div className="flex items-center gap-2">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {guest.episodes} Episodes
                  </span>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>•</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {guest.rating}
                    </span>
                  </div>
                </div>
                <Button
                  color="success"
                  radius="full"
                  size="sm"
                  variant="flat"
                  className="bg-secondary/20 text-secondary border-secondary"
                  onClick={() => navigate(`/dashboard/guestvideos/${guest.id}`)}
                >
                  View Episodes
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamousGuests;