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

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Brand - Home Page Link */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🍛</span>
              <span className="text-xl font-bold text-gray-900">BrokeEats</span>
            </Link>
          </div>

          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Add Recipe Button */}
                <Link to="/add-recipe">
                  <Button variant="outline">Add Recipe</Button>
                </Link>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {/* User Name */}
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <span>👤 {user.name}</span>
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
