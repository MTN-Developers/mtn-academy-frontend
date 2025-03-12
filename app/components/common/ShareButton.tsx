// components/common/ShareButton.tsx
'use client';

import { useState } from 'react';
import { Share, X, Facebook, Instagram, Linkedin, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface ShareButtonProps {
  title?: string;
  customShareText?: string;
  className?: string;
  iconSize?: number;
  showText?: boolean;
}

export const ShareButton = ({
  title = 'Share this course',
  customShareText = 'Hi, I am taking this amazing course',
  className = 'flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors',
  iconSize = 18,
  showText = true,
}: ShareButtonProps) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get the current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = customShareText;

  // Share functions for different platforms
  const shareFunctions = {
    facebook: () => {
      window.open(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
    },
    x: () => {
      window.open(
        `https://x.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
        '_blank',
      );
    },
    linkedin: () => {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          currentUrl,
        )}&summary=${encodeURIComponent(shareText)}`,
        '_blank',
      );
    },
    instagram: () => {
      window.open('https://www.instagram.com/', '_blank');
      toast.info(
        'Instagram does not support direct sharing via links. Please copy the URL and share it manually on Instagram.',
      );
    },
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className={className} onClick={() => setIsShareModalOpen(true)}>
        <Share size={iconSize} />
        {showText && <span>share</span>}
      </div>

      {/* Share Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {/* <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose> */}
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 py-4">
            <button
              onClick={shareFunctions.facebook}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <Facebook className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm">Facebook</span>
            </button>

            <button
              onClick={shareFunctions.instagram}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 flex items-center justify-center">
                <Instagram className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm">Instagram</span>
            </button>

            <button
              onClick={shareFunctions.x}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                <X className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm">X</span>
            </button>

            <button
              onClick={shareFunctions.linkedin}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center">
                <Linkedin className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm">LinkedIn</span>
            </button>
          </div>

          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-2">Or copy the link:</p>
            <div className="flex items-center space-x-2">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={currentUrl}
                readOnly
                placeholder="URL"
              />
              <Button onClick={handleCopyLink} className="bg-[#07519C] h-10 px-4">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
