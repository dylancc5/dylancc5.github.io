# Dylan Chen - Portfolio Website

Personal portfolio website built from scratch showcasing technical competency in WebGL graphics programming, modern JavaScript, and performance-optimized UI development.

## Technical Implementations

### Custom WebGL Aurora Animation

- Hand-written GLSL vertex and fragment shaders for procedural aurora effect
- Simplex noise algorithm implementation for organic movement
- Real-time WebGL rendering with OGL library
- Custom color interpolation system with dynamic gradients
- Proper resource management and cleanup

### Performance-Optimized Scroll Animations

- Intersection Observer API for efficient viewport detection
- Staggered animations with programmatic delay calculation
- RequestAnimationFrame for smooth 60fps rendering
- Lazy animation triggering to reduce computational overhead

### Custom Interactive Components

- Mouse-tracking spotlight effect using CSS custom properties and JavaScript
- Custom cursor system with lerp (linear interpolation) for smooth easing
- Animated stat counters with timing control
- Multi-layer parallax scrolling with depth-based speed calculations

### Advanced Features

- Konami code easter egg with physics-based confetti simulation
- Modular JavaScript architecture with ES6 modules
- Custom SVG inline favicon generation
- Responsive design with mobile-first approach

## Technology Stack

**Languages & Core Technologies**

- Vanilla JavaScript (ES6+) - Modules, IntersectionObserver, RequestAnimationFrame
- WebGL/GLSL - Custom shaders and GPU-accelerated graphics
- CSS3 - Custom properties, Grid, Flexbox, CSS animations
- HTML5 - Semantic markup, accessibility features

**Libraries**

- OGL (WebGL helper library) - Minimal abstraction for WebGL rendering

**Architecture**

- Static site with zero build process
- Modular CSS organization (main, aurora, spotlight)
- ES6 module system for JavaScript organization
- Performance-first design patterns
