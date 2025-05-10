import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SocialMediaLinks = ({ socialLinks }) => {
  const socialIcons = {
    facebook: { icon: Facebook, color: 'text-blue-600' },
    instagram: { icon: Instagram, color: 'text-pink-600' },
    youtube: { icon: Youtube, color: 'text-red-600' },
    linkedin: { icon: Linkedin, color: 'text-blue-700' },
    github: { icon: Github, color: 'text-dark-600' }
  };

  return (
    <div className="mt-4 flex gap-2">
      {socialLinks.map((socialLink) => {
        const socialType = socialLink.link_type.toLowerCase();
        const SocialIcon = socialIcons[socialType]?.icon;
        const iconColor = socialIcons[socialType]?.color;
        
        if (!SocialIcon) return null;
        
        return (
          <a 
            key={socialLink.id} 
            href={socialLink.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon" className={iconColor}>
              <SocialIcon className="h-4 w-4" />
            </Button>
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaLinks;
