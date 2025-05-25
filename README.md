# Sneakers Price Comparison Bot

A powerful web application that helps users compare sneaker prices across multiple platforms, track price history, and get notified of the best deals. Built with modern web technologies and a beautiful dark-themed UI.

## 🌐 Live Demo

Visit our live application at: [https://omnidim-voice-insights-hub.lovable.app/](https://omnidim-voice-insights-hub.lovable.app/)

\n Use the following admin details:
\n Email: admin@myapp.in
\n Password: admin123

## ✨ Features

- **Price Comparison**: Compare sneaker prices across multiple platforms
- **Price History Tracking**: Monitor price changes over time
- **Deal Notifications**: Get notified when prices drop
- **Voice Agent Integration**: Interactive voice commands for price queries
- **Email Reports**: Receive detailed price analysis via email
- **Analytics Dashboard**: Visualize price trends and market data
- **Security Features**: Secure authentication and data protection
- **Automation Tools**: Set up automated price monitoring

## 🛠️ Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom UI components with shadcn/ui
- **State Management**: React Query
- **Routing**: React Router
- **Authentication**: Custom auth system
- **Icons**: Lucide React
- **Voice Integration**: Omnidim Voice Agent

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/omnidim-voice-insights-hub.git
   cd omnidim-voice-insights-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_API_URL=your_api_url
   VITE_OMNIDIM_SECRET_KEY=your_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:5173`

## 📝 Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "feat: description of your changes"
   ```

4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request

### Commit Guidelines

We follow conventional commits format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## 🔧 Project Structure

```
omnidim-voice-insights-hub/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── types/         # TypeScript type definitions
│   └── integrations/  # Third-party integrations
├── public/            # Static assets
└── tests/            # Test files
```

## 🔐 Environment Variables

Required environment variables:
- `VITE_API_URL`: Your API endpoint
- `VITE_OMNIDIM_SECRET_KEY`: Secret key for Omnidim voice agent

## 📚 Documentation

For detailed documentation about specific features and components, please refer to the following:

- [Voice Agent Integration](./docs/voice-agent.md)
- [Price Comparison API](./docs/api.md)
- [Authentication System](./docs/auth.md)
- [Email Reports](./docs/email-reports.md)

## 🤝 Support

If you encounter any issues or have questions, please:

1. Check the [documentation](./docs)
2. Search for existing issues
3. Create a new issue with detailed information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Omnidim](https://omnidim.io) for the voice agent integration
