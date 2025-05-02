# Professional 3D Chair Visualizer

A high-end, professional-grade 3D chair visualization tool built with Next.js, Three.js, and React Three Fiber. This application allows users to customize and visualize different chair styles in real-time with professional-quality materials and lighting.

## Features

- **High-Quality 3D Models**: Three distinct chair styles with detailed geometry and professional finish
  - Modern Office Chair with ergonomic design
  - Minimalist Dining Chair with sleek angles
  - Premium Lounge Chair with luxurious details

- **Professional Materials**:
  - Premium Fabric
  - Fine Leather
  - Solid Wood
  - Brushed Metal
  - Luxury Velvet
  - All materials include high-resolution textures, normal maps, and roughness maps

- **Advanced Rendering**:
  - Studio-quality lighting with HDR environment
  - Real-time shadows and reflections
  - Professional post-processing effects
  - High-performance rendering with optimized geometries

- **Interactive Controls**:
  - Real-time material customization
  - Color picker with instant preview
  - Multiple finish options (Premium, Matte, Glossy)
  - Camera controls with auto-rotation
  - Screenshot capture functionality

## Technology Stack

- **Frontend Framework**: Next.js 14
- **3D Rendering**: Three.js with React Three Fiber
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/chair-visualizer.git
   ```

2. Install dependencies:
   ```bash
   cd chair-visualizer
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
chair-visualizer/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── components/
│   │   │   ├── 3d/             # 3D components (Scene, Chair, Lighting)
│   │   │   └── ui/             # UI components (Controls)
│   │   └── library/            # Shared utilities and store
│   ├── public/
│   │   ├── textures/           # High-resolution textures
│   │   └── hdr/                # Environment maps
│   └── package.json
```

## Performance Optimization

- Efficient geometry management
- Texture compression and optimization
- Lazy loading of 3D assets
- Responsive design for all devices
- Optimized render cycles

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js community for their excellent documentation and examples
- React Three Fiber team for the amazing React bindings
- Next.js team for the outstanding framework
