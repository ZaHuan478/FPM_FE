import { useState } from 'react'
import { LoginPage } from './components/pages/LoginPage/LoginPage'
import { RegisterPage } from './components/pages/RegisterPage/RegisterPage'
import { authService } from './services/auth.service'

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login')
  const isAuthenticated = authService.isAuthenticated()

  // If user is authenticated, show dashboard message
  if (isAuthenticated) {
    const user = authService.getUser()
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user?.fullName}!</h1>
          <p className="text-gray-600 mb-4">You are logged in.</p>
          <button
            onClick={() => {
              authService.logout()
              window.location.reload()
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {currentPage === 'login' ? (
        <LoginPage onSwitchToRegister={() => setCurrentPage('register')} />
      ) : (
        <RegisterPage onSwitchToLogin={() => setCurrentPage('login')} />
      )}
    </div>
  )
}

export default App
