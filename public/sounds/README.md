# Sound Assets for IJIDD UK

This directory contains traditional Yoruba sound effects and ambience for the website.

## Required Sound Files

### Button Sounds
- `talking-drum-tap.mp3` - Subtle talking drum sound for button clicks
- `talking-drum-press.mp3` - Slightly deeper drum for CTA buttons

### Menu Sounds
- `menu-open.mp3` - Traditional instrument sound for menu opening
- `menu-close.mp3` - Complementary sound for menu closing

### Ambience
- `gangan-ambience.mp3` - Looping traditional flute/gangan background (10-20 seconds loop)

### Hero/Greeting
- `yoruba-greeting.mp3` - Voice-over Yoruba greeting for hero section

## Sound Specifications

- **Format**: MP3 (high compatibility)
- **Quality**: 128-192 kbps (balance between quality and file size)
- **Duration**: 
  - Button sounds: 200-500ms
  - Menu sounds: 300-700ms
  - Ambience: 10-20 seconds (seamless loop)
  - Greeting: 3-5 seconds

## File Size Guidelines

Keep individual sound files under:
- Button sounds: < 50KB
- Menu sounds: < 100KB
- Ambience: < 500KB
- Greeting: < 200KB

## Usage

These sounds are loaded and managed by the `useSoundManager` hook in `/src/hooks/use-sound.tsx`.

## Temporary Development

For development, you can use placeholder silent audio or free sound effects until proper Yoruba sounds are recorded/sourced.
