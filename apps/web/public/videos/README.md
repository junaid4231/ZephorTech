# Hero Video Setup Guide

## Video Requirements

To add a video background to the home page hero section, place your video files in this directory:

### Required Files

1. **hero-video.mp4** - Main video file
   - Format: MP4 (H.264 codec)
   - Resolution: 1920x1080 (Full HD) minimum
   - Duration: 15-30 seconds (will loop)
   - File size: < 5MB (optimized)
   - Frame rate: 24-30 fps

2. **hero-poster.jpg** (Optional but recommended)
   - Static image shown before video loads
   - Same aspect ratio as video (16:9)
   - Resolution: 1920x1080
   - File size: < 500KB

## Video Specifications

### Technical Requirements
- **Codec:** H.264 (most compatible)
- **Container:** MP4
- **Audio:** None (muted by default)
- **Loop:** Yes (seamless loop)
- **Autoplay:** Yes (muted)

### Content Recommendations
- **Theme:** Technology, innovation, digital transformation
- **Style:** Abstract tech patterns, code, network connections
- **Color:** Blue tones matching brand (#004E8F → #0076D1)
- **Motion:** Slow, smooth, professional
- **Duration:** 15-30 seconds (loops seamlessly)

## Optimization Tips

1. **Compress Video:**
   ```bash
   # Using ffmpeg (recommended)
   ffmpeg -i input.mp4 -vcodec h264 -acodec aac -crf 23 -preset slow -movflags +faststart hero-video.mp4
   ```

2. **Create Poster Image:**
   ```bash
   # Extract first frame as poster
   ffmpeg -i hero-video.mp4 -ss 00:00:01 -vframes 1 hero-poster.jpg
   ```

3. **Online Tools:**
   - HandBrake (free, GUI)
   - CloudConvert (online)
   - Adobe Media Encoder

## Fallback Behavior

The video background automatically falls back to the gradient background in these cases:
- Mobile devices (video disabled for performance)
- Reduced motion preference (accessibility)
- Video file not found or error loading
- Slow network connection

## Testing

After adding your video:
1. Test on desktop browsers (Chrome, Firefox, Safari, Edge)
2. Test on mobile devices (video should show gradient fallback)
3. Test with slow network (throttle to 3G in DevTools)
4. Verify text readability with overlay
5. Check Lighthouse performance score

## Stock Video Sources

If you need a temporary video for testing:
- Pexels Videos (free, high quality)
- Pixabay Videos (free)
- Coverr (free stock videos)

Search for: "technology", "code", "digital", "network", "abstract tech"

