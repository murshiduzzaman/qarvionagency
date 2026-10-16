/**
 * Hero Section Video & Performance Configuration
 * 
 * Supports:
 * 1. YouTube URLs: (e.g. "https://www.youtube.com/watch?v=VIDEO_ID" or "https://youtu.be/VIDEO_ID")
 *    - Autoplays in ambient loop, muted, no controls, no branding, global CDN fast reload.
 * 2. Vimeo URLs: (e.g. "https://vimeo.com/VIDEO_ID")
 *    - Autoplays in background mode, muted, high-definition.
 * 3. Google Drive URLs: (e.g. "https://drive.google.com/file/d/FILE_ID/view")
 *    - Streams via Google Drive preview player (ensure permission is "Anyone with link can view").
 * 4. Direct MP4 / WebM / Cloud CDN URLs: (e.g. "https://cdn.example.com/reel.mp4")
 *    - Native HTML5 hardware-accelerated video tag.
 * 5. Local files: (e.g. "/videos/hero-reel.mp4")
 */

export type VideoSourceType = 'youtube' | 'vimeo' | 'drive' | 'direct';

export interface VideoSourceDetails {
  type: VideoSourceType;
  rawUrl: string;
  embedUrl?: string;
  videoId?: string;
  label: string;
  platformName: string;
}

export function parseHeroVideoUrl(url: string): VideoSourceDetails {
  if (!url || typeof url !== 'string') {
    return {
      type: 'direct',
      rawUrl: '/videos/hero-reel.mp4',
      label: 'Default Reel',
      platformName: 'Local MP4'
    };
  }

  const cleanUrl = url.trim();

  // YouTube Detection
  // Matches:
  // - https://www.youtube.com/watch?v=XXXXXXXXXXX
  // - https://youtu.be/XXXXXXXXXXX
  // - https://www.youtube.com/embed/XXXXXXXXXXX
  // - https://www.youtube.com/shorts/XXXXXXXXXXX
  const ytMatch = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: 'youtube',
      rawUrl: cleanUrl,
      videoId,
      label: 'YouTube Ambient Stream',
      platformName: 'YouTube',
      // Parameters: autoplay=1, mute=1 (required by all browsers for autoplay), loop=1, playlist=ID (required by YT API to loop single video),
      // controls=0, modestbranding=1, playsinline=1, rel=0, disablekb=1
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1`
    };
  }

  // Vimeo Detection
  // Matches:
  // - https://vimeo.com/XXXXXXXX
  // - https://player.vimeo.com/video/XXXXXXXX
  const vimeoMatch = cleanUrl.match(/(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|))(\d+)/);
  if (vimeoMatch && vimeoMatch[3]) {
    const videoId = vimeoMatch[3];
    return {
      type: 'vimeo',
      rawUrl: cleanUrl,
      videoId,
      label: 'Vimeo Background Video',
      platformName: 'Vimeo',
      // Vimeo background=1 removes controls, loops, and mutes automatically
      embedUrl: `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`
    };
  }

  // Google Drive Detection
  // Matches:
  // - https://drive.google.com/file/d/XXXXXXXXX/view
  // - https://drive.google.com/open?id=XXXXXXXXX
  const driveMatch = cleanUrl.match(/drive\.google\.com\/(?:file\/d\/([a-zA-Z0-9_-]+)|open\?id=([a-zA-Z0-9_-]+))/);
  if (driveMatch) {
    const fileId = driveMatch[1] || driveMatch[2];
    return {
      type: 'drive',
      rawUrl: cleanUrl,
      videoId: fileId,
      label: 'Google Drive Stream',
      platformName: 'Google Drive',
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`
    };
  }

  // Direct MP4 / WebM / CDN
  return {
    type: 'direct',
    rawUrl: cleanUrl,
    label: cleanUrl.startsWith('/') ? 'Local Project Video' : 'Direct Cloud MP4',
    platformName: cleanUrl.startsWith('/') ? 'Local MP4' : 'Direct CDN'
  };
}

export interface HeroConfig {
  videoUrl: string;
  posterUrl: string;
  badgeText: string;
  projectsCount: string;
  headlineHighlight: string;
  headlineLead: string;
  headlineTail: string;
  subheadline: string;
  ratingScore: string;
  clientsCount: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  enableAmbientControls: boolean;
  overlayOpacity: number; // 0 to 1
}

export const heroConfig: HeroConfig = {
  // Direct local hero reel file:
  // Place your video file at public/videos/hero-reels.mp4 or src/videos/hero-reels.mp4
  // You can also use YouTube, Vimeo, or a CDN link if desired.
  videoUrl: '/videos/hero-reel.mp4',
  posterUrl: '/images/hero-reel-poster.jpg',
  badgeText: 'Available Now',
  projectsCount: '170+ Projects Completed',
  headlineLead: 'Grow your own',
  headlineHighlight: 'brand',
  headlineTail: 'with us.',
  subheadline: 'Boost productivity with seamless design and brand management. We transform complex visions into digital reality.',
  ratingScore: '4.9',
  clientsCount: '50+ Clients',
  primaryCtaText: 'Start Your Project',
  secondaryCtaText: 'Explore Selected Works',
  enableAmbientControls: true,
  overlayOpacity: 0.30
};
