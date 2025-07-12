# Authentication System Setup

This document explains how to set up and use the secure authentication system for BrokeEats.

## Features

- **Secure Login/Register**: Form validation with Zod schema
- **JWT Token Authentication**: Using Laravel Sanctum
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Persistent Sessions**: Tokens stored in localStorage
- **Modern UI**: Built with shadcn/ui components
- **Type Safety**: Full TypeScript support

## Backend Setup

### Prerequisites
- Laravel 10+ with Sanctum
- Database configured and migrated

### API Endpoints

The authentication system provides these endpoints:

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout (protected)
- `GET /api/me` - Get current user (protected)

### Registration Request
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### Login Request
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Frontend Setup

### Prerequisites
- Node.js 18+
- React 18+ with TypeScript
- shadcn/ui components

### Components

1. **AuthContext** (`src/contexts/AuthContext.tsx`)
   - Manages authentication state
   - Provides login/register/logout functions
   - Handles token storage and API calls

2. **Login** (`src/pages/auth/Login.tsx`)
   - Email and password form
   - Form validation with Zod
   - Error handling and loading states

3. **Register** (`src/pages/auth/Register.tsx`)
   - Name, email, password, and confirmation
   - Password strength validation
   - Password confirmation matching

4. **ProtectedRoute** (`src/components/ProtectedRoute.tsx`)
   - Wraps protected pages
   - Redirects to login if not authenticated
   - Shows loading spinner during auth check

5. **Navbar** (`src/components/Navbar.tsx`)
   - Shows user info when logged in
   - Provides logout functionality
   - Navigation links

### Usage

1. **Wrap your app with AuthProvider**:
```tsx
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Your app components */}
    </AuthProvider>
  );
}
```

2. **Use authentication in components**:
```tsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, login, logout } = useAuth();
  
  if (!user) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user.name}!</div>;
}
```

3. **Protect routes**:
```tsx
import ProtectedRoute from './components/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## Security Features

- **Password Hashing**: Laravel's Hash facade
- **Token-based Auth**: Laravel Sanctum
- **CORS Protection**: Configured for frontend domain
- **Form Validation**: Client and server-side validation
- **Secure Headers**: Authorization headers for API calls
- **Automatic Logout**: On token expiration or 401 errors

## Running the Application

1. **Start the backend**:
```bash
cd backend
php artisan serve
```

2. **Start the frontend**:
```bash
cd frontend
npm run dev
```

3. **Access the application**:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api

## Testing the Authentication

1. Navigate to http://localhost:5173
2. You'll be redirected to the login page
3. Click "Sign up" to create a new account
4. Fill in the registration form
5. After successful registration, you'll be logged in and redirected to the home page
6. Use the navbar to navigate and logout

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend CORS config allows your frontend URL
2. **Token Not Persisting**: Check localStorage in browser dev tools
3. **401 Errors**: Verify the token is being sent in Authorization header
4. **Form Validation Errors**: Check the Zod schema and Laravel validation rules

### Debug Mode

Enable debug mode in the frontend by adding console logs in the AuthContext:

```tsx
console.log('Auth state:', { user, token, isLoading });
```

## File Structure

```
frontend/
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── components/
│   │   ├── ProtectedRoute.tsx
│   │   └── Navbar.tsx
│   ├── pages/auth/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── types/
│   │   └── auth.ts
│   └── lib/
│       └── axios.ts
```

This authentication system provides a solid foundation BrokeEats application with modern security practices and a great user experience. 