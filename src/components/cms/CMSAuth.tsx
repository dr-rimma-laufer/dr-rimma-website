import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Alert, AlertDescription } from '../ui/alert'
import { Loader2, UserPlus, LogIn } from 'lucide-react'
import { auth, contentAPI } from '../../utils/supabase/client'
import { CMSPanel } from './CMSPanel'

export function CMSAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mode, setMode] = useState<'login' | 'register'>('register')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  // Check if user is already authenticated
  useEffect(() => {
    checkAuthStatus()
    // Check server health
    checkServerHealth()
  }, [])

  const checkServerHealth = async () => {
    try {
      await contentAPI.healthCheck()
      console.log('Server is healthy')
    } catch (error) {
      console.error('Server health check failed:', error)
      setError('שרת לא זמין. אנא נסו שוב מאוחר יותר.')
    }
  }

  const checkAuthStatus = async () => {
    try {
      const { data } = await auth.getSession()
      setIsAuthenticated(!!data.session)
    } catch (error) {
      console.error('Error checking auth status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'login') {
        const response = await auth.signIn(formData.email, formData.password)
        
        if (response.user) {
          setSuccess('התחברות בוצעה בהצלחה!')
          setIsAuthenticated(true)
          
          // Initialize site data if this is first login
          try {
            await contentAPI.initializeSite()
            console.log('Site initialized with seed data')
          } catch (initError) {
            console.log('Site may already be initialized:', initError)
          }
        }
      } else {
        const response = await auth.signUp(formData.email, formData.password, formData.name)
        
        if (response.user) {
          setSuccess('משתמש נוצר בהצלחה! מתחבר אוטומטית...')
          
          // Try to auto-login after successful registration
          try {
            const loginResponse = await auth.signIn(formData.email, formData.password)
            if (loginResponse.user) {
              setIsAuthenticated(true)
              setSuccess('הרשמה והתחברות בוצעו בהצלחה!')
              
              // Initialize site data
              try {
                await contentAPI.initializeSite()
                console.log('Site initialized with seed data')
              } catch (initError) {
                console.log('Site may already be initialized:', initError)
              }
            } else {
              // Fall back to manual login
              setSuccess('משתמש נוצר בהצלחה! כעת תוכלו להתחבר.')
              setMode('login')
              setFormData({ ...formData, password: '', name: '' })
            }
          } catch (autoLoginError) {
            console.log('Auto-login failed, user needs to login manually:', autoLoginError)
            setSuccess('משתמש נוצר בהצלחה! כעת תוכלו להתחבר.')
            setMode('login')
            setFormData({ ...formData, password: '', name: '' })
          }
        }
      }
    } catch (error: any) {
      console.error('Authentication error:', error)
      
      // Provide more specific error messages
      let errorMessage = 'שגיאה בתהליך האימות'
      if (error.message) {
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = mode === 'login' 
            ? 'שם משתמש או סיסמה שגויים. אם אין לכם חשבון, לחצו על "הרשמו כאן"'
            : 'שגיאה ביצירת החשבון. אנא נסו שוב'
        } else if (error.message.includes('User already registered')) {
          errorMessage = 'המשתמש כבר קיים במערכת. נסו להתחבר במקום'
          setMode('login')
        } else if (error.message.includes('Password')) {
          errorMessage = 'הסיסמה חייבת להכיל לפחות 6 תווים'
        } else {
          errorMessage = error.message
        }
      }
      
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      setIsAuthenticated(false)
      setFormData({ email: '', password: '', name: '' })
      setSuccess('התנתקות בוצעה בהצלחה')
    } catch (error) {
      console.error('Sign out error:', error)
      setError('שגיאה בהתנתקות')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-reverse space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>טוען...</span>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <CMSPanel onSignOut={handleSignOut} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            מערכת ניהול תוכן
          </h2>
          <p className="mt-2 text-gray-600">
            {mode === 'login' 
              ? 'התחברו לחשבון שלכם' 
              : 'צרו חשבון ראשון למערכת ניהול התוכן'
            }
          </p>
          {mode === 'register' && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 זהו חשבון המנהל הראשון - החשבון הזה יקבל הרשאות מלאות לניהול האתר
              </p>
            </div>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {mode === 'login' ? 'התחברות' : 'הרשמה'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    שם מלא
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required={mode === 'register'}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="הכניסו שם מלא"
                    disabled={isSubmitting}
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  כתובת אימייל
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="הכניסו כתובת אימייל"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  סיסמה
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="הכניסו סיסמה"
                  disabled={isSubmitting}
                />
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin ml-2" />
                ) : mode === 'login' ? (
                  <LogIn className="h-4 w-4 ml-2" />
                ) : (
                  <UserPlus className="h-4 w-4 ml-2" />
                )}
                {isSubmitting 
                  ? 'מעבד...' 
                  : mode === 'login' 
                    ? 'התחברות' 
                    : 'הרשמה'
                }
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login')
                  setError('')
                  setSuccess('')
                  setFormData({ email: '', password: '', name: '' })
                }}
                className="text-sm text-blue-600 hover:text-blue-500"
                disabled={isSubmitting}
              >
                {mode === 'login' 
                  ? 'אין לכם חשבון? הרשמו כאן' 
                  : 'יש לכם חשבון? התחברו כאן'
                }
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>מערכת ניהול תוכן לאתר ד"ר רימה לאופר</p>
          <p>לשימוש מורשה בלבד</p>
        </div>
      </div>
    </div>
  )
}