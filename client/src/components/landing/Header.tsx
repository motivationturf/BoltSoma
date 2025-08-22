
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onShowFeatures: () => void;
  onShowPricing: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowFeatures, onShowPricing }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/logo.svg" 
              alt="SomaSmart EduHub Logo" 
              className="h-10 w-10 drop-shadow-sm hover:scale-105 transition-transform duration-300"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">SomaSmart EduHub</h1>
              <p className="text-xs text-gray-500">Zambia's Premier Learning Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={onShowFeatures}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Features
            </button>
            <button
              onClick={onShowPricing}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Pricing
            </button>
            <Button
              onClick={() => navigate('/login')}
              variant="ghost"
              className="text-gray-700 hover:text-green-600"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/register')}
              variant="zambian-primary"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300"
            >
              Sign Up
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  onShowFeatures();
                  setIsMenuOpen(false);
                }}
                className="text-left px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
              >
                Features
              </button>
              <button
                onClick={() => {
                  onShowPricing();
                  setIsMenuOpen(false);
                }}
                className="text-left px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
              >
                Pricing
              </button>
              <Button
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
                variant="ghost"
                className="justify-start text-gray-700 hover:text-green-600 hover:bg-green-50"
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  navigate('/register');
                  setIsMenuOpen(false);
                }}
                variant="zambian-primary"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg"
              >
                Sign Up
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
