import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { CirclePlus, UserRound } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Brand - Home Page Link */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="BrokeEats" className="w-8 h-8" />
              <span className="text-xl font-bold bg-black text-white rounded-md shadow px-2 py-1">BrokeEats</span>
            </Link>
          </div>

          
          <div className="flex items-center space-x-4">
            {isLoading ? (
              // Show loading state - you can customize this
              <div className="flex items-center space-x-2">
                <div className="w-28 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-28 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : user ? (
              <>
                {/* Add Recipe Button */}
                <Link to="/add-recipe">
                  <Button variant="outline" className="bg-primary text-white">
                    <CirclePlus/>
                    Add Recipe
                    </Button>
                </Link>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {/* User Name */}
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <span><UserRound/></span>{user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    {/* User Profile Information */}
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>

                    {/* Sign Out Button */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              // User Authentication - Sign In/Sign Up
              <div className="flex items-center space-x-2">
                
                {/* Sign In Button */}
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>

                {/* Sign Up Button */}
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
