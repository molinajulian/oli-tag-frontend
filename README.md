# Oli Tag Frontend

Frontend application for Oli Tag - Smart pet protection system with QR code tags.

## 🚀 Features

- **Responsive Design**: Mobile-first PWA optimized for all devices
- **Internationalization**: Spanish and English support
- **QR Code Scanning**: Direct camera access for tag scanning
- **Pet Profiles**: Complete pet and owner information management
- **Real-time Notifications**: Location tracking when pets are found
- **Progressive Web App**: Installable on mobile devices

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **API Client**: Axios
- **Icons**: Lucide React
- **Testing**: Jest + Testing Library

## 📋 Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- Backend API running (separate repository)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd oli-tag-frontend
pnpm install
```

### 2. Environment Setup

```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Frontend App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Oli Tag

# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_VERSION=v1

# Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id

# Development
NODE_ENV=development
```

### 3. Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production (static export)
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm type-check` - TypeScript type checking
- `pnpm test` - Run Jest tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage
- `pnpm analyze` - Bundle analyzer

## 🏗 Project Structure

```
oli-tag-frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (removed - backend only)
│   ├── create/            # Pet profile creation
│   ├── profile/[id]/      # Pet profile display
│   ├── scan/              # QR code scanning
│   ├── setup/[id]/        # Tag setup
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn)
│   └── LanguageSelector.tsx
├── contexts/             # React contexts
│   └── LanguageContext.tsx
├── lib/                  # Utilities and configurations
│   ├── api-client.ts     # Backend API client
│   ├── translations.ts   # i18n translations
│   ├── utils.ts          # Utility functions
│   └── validations.ts    # Zod schemas
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🌐 Deployment

### Static Export (Recommended)

```bash
pnpm build
```

This creates an `out/` directory with static files ready for deployment to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

### Docker Deployment

```bash
# Build image
docker build -t oli-tag-frontend .

# Run container
docker run -p 80:80 oli-tag-frontend
```

### Environment Variables for Production

```env
NEXT_PUBLIC_APP_URL=https://oli-tag.com
NEXT_PUBLIC_API_URL=https://api.oli-tag.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NODE_ENV=production
```

## 🔧 Configuration

### Backend Integration

This frontend requires a separate backend API. Configure the API URL in environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Expected API endpoints:
- `GET /api/v1/tags/{code}` - Get pet profile
- `POST /api/v1/tags/{code}` - Create/update pet profile
- `POST /api/v1/scans/{code}` - Record scan event
- `GET /api/v1/tags/{code}/availability` - Check tag availability

### PWA Configuration

The app is configured as a Progressive Web App with:
- Manifest file for installation
- Service worker for offline support
- Mobile-optimized design
- App-like experience

### Internationalization

Supports Spanish (default) and English:
- Translations in `lib/translations.ts`
- Language context in `contexts/LanguageContext.tsx`
- Browser language detection
- Persistent language preference

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

## 📱 PWA Features

- **Installable**: Add to home screen
- **Offline Support**: Basic offline functionality
- **Mobile Optimized**: Touch-friendly interface
- **Fast Loading**: Optimized assets and code splitting

## 🔒 Security Features

- Content Security Policy (CSP)
- Security headers (XSS, CSRF protection)
- Input validation with Zod
- Secure image handling
- Rate limiting ready

## 🚀 Performance Optimizations

- Static site generation
- Image optimization
- Code splitting
- Bundle analysis
- Compression (gzip)
- Caching strategies

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Verify `NEXT_PUBLIC_API_URL` is correct
   - Check if backend is running
   - Check CORS configuration on backend

2. **Build Errors**
   - Run `pnpm type-check` for TypeScript errors
   - Run `pnpm lint` for ESLint issues

3. **PWA Issues**
   - Check manifest.json configuration
   - Verify HTTPS in production
   - Check service worker registration

### Development Tips

- Use browser dev tools for debugging
- Check Network tab for API calls
- Use React Developer Tools
- Enable source maps for debugging

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the documentation
- Contact the development team