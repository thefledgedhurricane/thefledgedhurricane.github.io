# Enhanced Markdown Rendering for Sanity CMS

This document explains the improved markdown rendering system implemented for the portfolio website using Sanity CMS and Portable Text.

## Overview

The enhanced markdown rendering system provides:
- **Better Typography**: Improved spacing, font sizes, and visual hierarchy
- **Enhanced Code Blocks**: Better styling with filename support and language indicators
- **Rich Content Support**: Images, blockquotes, lists, and inline formatting
- **Responsive Design**: Mobile-friendly layouts with proper spacing
- **Dark Mode Support**: Consistent styling across light and dark themes
- **Accessibility**: Proper semantic HTML and ARIA attributes

## Key Improvements

### 1. Centralized Component
- **File**: `src/components/PortableTextRenderer.tsx`
- **Purpose**: Single, reusable component for all Portable Text rendering
- **Benefits**: Consistent styling across all content types (posts, publications, events, teaching)

### 2. Enhanced Typography
- **Headings**: Improved hierarchy with better spacing and font weights
- **Paragraphs**: Larger text (18px) with optimal line height for readability
- **Lists**: Better spacing and indentation
- **Links**: Enhanced hover effects and proper accessibility

### 3. Code Block Improvements
```typescript
// Features:
- Filename display with file icon
- Language indicator
- Better syntax highlighting preparation
- Improved contrast and readability
- Responsive horizontal scrolling
```

### 4. Image Handling
- **Higher Resolution**: 1200x800 instead of 800x600
- **Better Styling**: Rounded corners, shadows, and responsive sizing
- **Caption Support**: Improved typography for image captions
- **Lazy Loading**: Optimized performance with Next.js Image component

### 5. Content Types Supported

#### Standard Blocks
- **Headings** (H1-H6): Proper hierarchy and spacing
- **Paragraphs**: Enhanced readability
- **Blockquotes**: Styled with left border and background
- **Lists**: Bullet and numbered with proper spacing

#### Rich Content
- **Images**: With captions and responsive sizing
- **Code Blocks**: With filename and language support
- **Math Blocks**: Prepared for mathematical expressions
- **Callouts**: Info, warning, error, and success alerts

#### Inline Formatting
- **Bold**: Enhanced font weight
- **Italic**: Proper emphasis styling
- **Code**: Inline code with background and border
- **Links**: Improved hover states and accessibility
- **Underline**: Custom styling with primary color
- **Strikethrough**: Muted appearance
- **Highlight**: Yellow background highlighting

## Usage

### Basic Implementation
```tsx
import PortableTextRenderer from '@/components/PortableTextRenderer';

// In your component
<PortableTextRenderer value={content} />
```

### With Custom Styling
```tsx
<PortableTextRenderer 
  value={content} 
  className="custom-prose-styles" 
/>
```

## Tailwind Typography Integration

The component leverages `@tailwindcss/typography` for:
- **Consistent Spacing**: Proper vertical rhythm
- **Responsive Design**: Scales appropriately on different screen sizes
- **Dark Mode**: Automatic dark mode support with `prose-invert`
- **Customization**: Easy to override with custom classes

## Files Updated

The following files were updated to use the new renderer:

1. **Posts**: `src/app/posts/[slug]/page.tsx`
2. **Publications**: `src/app/publications/[slug]/page.tsx`
3. **Events**: `src/app/events/[slug]/page.tsx`
4. **Teaching**: `src/app/teaching/[slug]/page.tsx`

## Benefits

### For Content Creators
- **Consistent Formatting**: All content looks professional and consistent
- **Rich Media Support**: Easy to add images, code, and formatted text
- **Better Readability**: Improved typography makes content easier to read

### For Developers
- **DRY Principle**: Single component instead of duplicated code
- **Easy Maintenance**: Changes in one place affect all content
- **Extensible**: Easy to add new content types and formatting

### For Users
- **Better Reading Experience**: Improved typography and spacing
- **Mobile Friendly**: Responsive design works on all devices
- **Accessibility**: Proper semantic HTML and contrast ratios

## Future Enhancements

### Planned Features
1. **Syntax Highlighting**: Add Prism.js or similar for code syntax highlighting
2. **Math Support**: LaTeX/MathJax integration for mathematical expressions
3. **Interactive Elements**: Expandable sections, tabs, etc.
4. **Copy Code Button**: One-click copying for code blocks
5. **Table Support**: Enhanced table rendering with sorting and filtering

### Customization Options
1. **Theme Variants**: Different styling themes for different content types
2. **Font Options**: Support for different font families
3. **Color Schemes**: Custom color palettes for different sections

## Technical Details

### Dependencies
- `@portabletext/react`: Core Portable Text rendering
- `@tailwindcss/typography`: Typography plugin for consistent styling
- `next/image`: Optimized image handling
- `clsx`: Conditional class name handling

### Performance Considerations
- **Image Optimization**: Next.js Image component with proper sizing
- **Lazy Loading**: Images load only when needed
- **Minimal Bundle**: Only necessary components are included
- **CSS Optimization**: Tailwind purges unused styles

## Troubleshooting

### Common Issues
1. **Images Not Loading**: Check Sanity image URLs and permissions
2. **Styling Issues**: Ensure Tailwind Typography is properly configured
3. **Code Blocks**: Verify language names match supported languages

### Debug Tips
1. Check browser console for errors
2. Verify Sanity content structure matches expected format
3. Test with different content types to isolate issues

This enhanced markdown rendering system significantly improves the content presentation quality while maintaining consistency across the entire portfolio website.