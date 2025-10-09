# Image Optimization

## Overview
All images have been optimized for web performance using the Sharp image processing library.

## Optimization Results
- **Original size**: 179.94 MB
- **Optimized size**: 2.46 MB
- **Total savings**: 177.48 MB (98.6% reduction)

## Image Types & Settings

### Gallery Images (JPG)
- Maximum width: 1920px
- Maximum height: 1080px
- Quality: 85%
- Progressive JPEG with MozJPEG compression

### Review Screenshots (PNG)
- Maximum dimensions: 400x400px
- PNG compression level: 9
- Quality: 85%

### Other PNG Images
- Maximum width: 1200px
- PNG compression level: 9
- Quality: 85%

## How to Optimize New Images

1. Add new images to `src/assets/` folder
2. Run the optimization script:
   ```bash
   npm run optimize-images
   ```
3. The script will create optimized versions in `src/assets-optimized/`
4. Review the results and replace if satisfied

## Backup
Original unoptimized images are saved in `src/assets-original/` (excluded from git)

## Performance Benefits
- **Faster page load times**: Smaller images load significantly faster
- **Reduced bandwidth**: Less data transfer for users
- **Better SEO**: Google favors faster-loading websites
- **Improved mobile experience**: Crucial for users on slower connections

