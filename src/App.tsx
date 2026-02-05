import { useState } from 'react'
import { LoginPage } from './components/pages/LoginPage/LoginPage'
import { RegisterPage } from './components/pages/RegisterPage/RegisterPage'
import { DashboardPage } from './components/pages/DashboardPage/DashboardPage'
import { authService } from './services/auth.service'

function App() {
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login')
  const isAuthenticated = authService.isAuthenticated()

  // If user is authenticated, show dashboard
  if (isAuthenticated) {
    return <DashboardPage />
  }

  // Show auth pages
  return (
    <div>
      {authPage === 'login' ? (
        <LoginPage onSwitchToRegister={() => setAuthPage('register')} />
      ) : (
        <RegisterPage onSwitchToLogin={() => setAuthPage('login')} />
      )}
    </div>
  )
}

export default App
