# Aurora Effect Setup Guide

## Installation

You have two options to get the OGL library working:

### Option 1: Using npm (Recommended)

1. Install Node.js if you haven't already
2. Run: `npm install`
3. The OGL library will be installed in `node_modules/ogl/`
4. Update the import in `Aurora.js` to:
   ```javascript
   import { Renderer, Program, Mesh, Color, Triangle } from './node_modules/ogl/dist/ogl.mjs';
   ```

### Option 2: Using CDN (Quick)

1. Replace the import in `Aurora.js` with:
   ```javascript
   import { Renderer, Program, Mesh, Color, Triangle } from 'https://cdn.skypack.dev/ogl';
   ```

## Running the Site

Since this uses ES6 modules, you need to serve it with a local server:

```bash
# Option 1: Using Python 3
python -m http.server 8000

# Option 2: Using Python 2
python -m SimpleHTTPServer 8000

# Option 3: Using Node.js
npx serve

# Option 4: Using VS Code
Install "Live Server" extension and click "Go Live"
```

Then visit: `http://localhost:8000`

## Customization

The Aurora effect is configured in `aurora-init.js`:

```javascript
const aurora = new Aurora(auroraContainer, {
  colorStops: ['#f4c430', '#4a9eff', '#d4af37'], // Gold -> Blue -> Dark Gold
  amplitude: 1.2,      // Wave height (0.5 - 2.0)
  blend: 0.6,          // Color blending (0.0 - 1.0)
  speed: 0.4           // Animation speed (0.1 - 1.0)
});
```

You can also adjust the opacity in `styles.css`:

```css
#hero #aurora-background {
    opacity: 0.3; /* Adjust between 0.1 - 0.5 for subtle effect */
}
```

## Color Palette

Current colors match your site theme:
- **Gold**: `#f4c430` (primary accent)
- **Blue**: `#4a9eff` (secondary accent)
- **Dark Gold**: `#d4af37` (tertiary accent)

## Troubleshooting

**Aurora not showing?**
- Check browser console for errors
- Ensure you're serving the site (not opening index.html directly)
- Verify OGL library is loaded correctly

**Performance issues?**
- Reduce amplitude to 0.8
- Reduce blend to 0.4
- Lower opacity to 0.2
