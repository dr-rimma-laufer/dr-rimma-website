import { useState, useEffect, useRef, useCallback } from 'react';
import { PageType, TreatmentOverlayType, ViewType } from '../utils/appTypes';

interface AppState {
  currentPage: PageType;
  treatmentOverlay: TreatmentOverlayType;
  currentView: ViewType;
  lastActivity: number;
  sessionId: string;
}

const APP_STATE_KEY = 'dr-rima-app-state';
const DEFAULT_STATE: AppState = {
  currentPage: 'home',
  treatmentOverlay: null,
  currentView: 'website',
  lastActivity: Date.now(),
  sessionId: Math.random().toString(36).substring(2, 15)
};

// מחזיר מזהה ייחודי עבור הסשן הנוכחי
function generateSessionId(): string {
  const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  return newSessionId;
}

// שומר את המצב ל-localStorage עם טיפול בשגיאות
function saveStateToStorage(state: AppState): void {
  try {
    const stateWithTimestamp = {
      ...state,
      lastActivity: Date.now()
    };
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(stateWithTimestamp));
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Failed to save app state to localStorage:', error);
    }
  }
}

// טוען את המצב מ-localStorage עם ולידציה
function loadStateFromStorage(): AppState {
  try {
    const storedState = localStorage.getItem(APP_STATE_KEY);
    if (storedState) {
      const parsedState = JSON.parse(storedState) as AppState;
      
      // בדיקת תקינות המצב הנטען
      if (parsedState && 
          typeof parsedState.currentPage === 'string' && 
          typeof parsedState.currentView === 'string') {
        
        // אם המצב ישן מדי (יותר מ-24 שעות), חזור לברירת מחדל
        const hoursSinceLastActivity = (Date.now() - parsedState.lastActivity) / (1000 * 60 * 60);
        if (hoursSinceLastActivity > 24) {
          return { 
            ...DEFAULT_STATE, 
            sessionId: generateSessionId() 
          };
        }
        return {
          ...parsedState,
          lastActivity: Date.now(), // עדכן זמן פעילות
          sessionId: parsedState.sessionId || generateSessionId()
        };
      }
    }
  } catch (error) {
    console.error('❌ Failed to load app state from localStorage:', error);
  }
  
  return { 
    ...DEFAULT_STATE, 
    sessionId: generateSessionId() 
  };
}

// ה-hook הראשי לניהול המצב הגלובלי של האפליקציה
export function useAppState() {
  // טוען את המצב הראשוני מ-localStorage
  const [appState, setAppState] = useState<AppState>(() => loadStateFromStorage());
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  // שומר את המצב עם debounce למנוע יותר מדי כתיבות
  const debouncedSaveState = useCallback((newState: AppState) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      saveStateToStorage(newState);
    }, 300); // שמירה אחרי 300ms ללא שינויים נוספים
  }, []);

  // פונקציה מרכזית לעדכון המצב
  const updateAppState = useCallback((updates: Partial<AppState>) => {
    setAppState(prevState => {
      const newState = {
        ...prevState,
        ...updates,
        lastActivity: Date.now()
      };
      
      // שמור את המצב החדש ל-localStorage
      debouncedSaveState(newState);
      
      return newState;
    });
  }, [debouncedSaveState]);

  // פונקציות נוחות לעדכון מאפיינים ספציפיים
  const setCurrentPage = useCallback((page: PageType) => {
    updateAppState({ currentPage: page });
  }, [updateAppState]);

  const setTreatmentOverlay = useCallback((overlay: TreatmentOverlayType) => {
    updateAppState({ treatmentOverlay: overlay });
  }, [updateAppState]);

  const setCurrentView = useCallback((view: ViewType) => {
    updateAppState({ currentView: view });
  }, [updateAppState]);

  // איפוס המצב (למקרה חירום)
  const resetAppState = useCallback(() => {
    const newState = { 
      ...DEFAULT_STATE, 
      sessionId: generateSessionId() 
    };
    setAppState(newState);
    saveStateToStorage(newState);
  }, []);

  // שמירת המצב כאשר המשתמש עוזב את הדף
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveStateToStorage(appState);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveStateToStorage(appState);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [appState]);

  // שמירה תקופתית של המצב (כל 5 דקות)
  useEffect(() => {
    const periodicSave = setInterval(() => {
      updateAppState({}); // זה יעדכן את lastActivity וישמור את המצב
    }, 5 * 60 * 1000); // 5 דקות

    return () => clearInterval(periodicSave);
  }, [updateAppState]);

  return {
    // המצב הנוכחי
    ...appState,
    
    // פונקציות עדכון
    setCurrentPage,
    setTreatmentOverlay,
    setCurrentView,
    updateAppState,
    resetAppState,
    
    // מידע על הסשן
    isNewSession: appState.sessionId !== DEFAULT_STATE.sessionId,
    timeSinceLastActivity: Date.now() - appState.lastActivity
  };
}

// שמירת מצב ההתחברות ל-Supabase ב-localStorage
const SUPABASE_CONNECTION_KEY = 'dr-rima-supabase-connection';

interface SupabaseConnectionState {
  isConnected: boolean | null;
  lastConnectionCheck: number;
  connectionAttempts: number;
  connectionError: string | null;
  persistentSessionId: string;
}

// טוען את מצב ההתחברות מ-localStorage
function loadConnectionStateFromStorage(): SupabaseConnectionState {
  try {
    const stored = localStorage.getItem(SUPABASE_CONNECTION_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as SupabaseConnectionState;
      // ALWAYS preserve the existing session ID if it exists
      if (parsed && parsed.persistentSessionId) {
        if (process.env.NODE_ENV === 'development') {
          console.log('🔄 Restored persistent session:', parsed.persistentSessionId.substring(0, 8) + '...');
        }
        return {
          ...parsed,
          isConnected: null, // איפוס מצב החיבור - נבדוק מחדש
          connectionAttempts: 0,
          connectionError: null,
          // KEEP the existing persistentSessionId - this is the key fix!
          persistentSessionId: parsed.persistentSessionId
        };
      }
    }
  } catch (error) {
    console.error('Failed to load connection state:', error);
  }
  
  // ברירת מחדל עם session ID חדש - רק אם אין בכלל session ID קיים
  const newSessionId = generateSessionId();
  console.log('🆕 Creating new persistent session:', newSessionId.substring(0, 8) + '...');
  return {
    isConnected: null,
    lastConnectionCheck: 0,
    connectionAttempts: 0,
    connectionError: null,
    persistentSessionId: newSessionId
  };
}

// שומר את מצב ההתחברות ל-localStorage
function saveConnectionStateToStorage(state: SupabaseConnectionState): void {
  try {
    localStorage.setItem(SUPABASE_CONNECTION_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save connection state:', error);
  }
}

// Hook מעודכן לניטור מצב ההתחברות ל-Supabase עם שמירת session עצמאית
export function useSupabaseConnectionState() {
  // טען מצב ראשוני מ-localStorage
  const [connectionState, setConnectionState] = useState<SupabaseConnectionState>(() => 
    loadConnectionStateFromStorage()
  );

  // פונקציה לעדכון המצב ושמירתו
  const updateConnectionState = useCallback((updates: Partial<SupabaseConnectionState>) => {
    setConnectionState(prevState => {
      const newState = { ...prevState, ...updates };
      saveConnectionStateToStorage(newState);
      return newState;
    });
  }, []);

  const checkConnection = useCallback(async () => {
    // Don't check if we've already reached max attempts (reduced to 2)
    if (connectionState.connectionAttempts >= 2) {
      return;
    }

    const currentSessionId = connectionState.persistentSessionId;
    
    try {
      const { contentAPI } = await import('../utils/supabase/client');
      await contentAPI.healthCheck();
      
      updateConnectionState({
        isConnected: true,
        lastConnectionCheck: Date.now(),
        connectionAttempts: 0,
        connectionError: null,
        // EXPLICITLY preserve the session ID - never change it on successful connection
        persistentSessionId: currentSessionId
      });
      
      // Silent connection restoration to reduce console noise
    } catch (error) {
      const newAttempts = connectionState.connectionAttempts + 1;
      
      updateConnectionState({
        isConnected: false,
        lastConnectionCheck: Date.now(),
        connectionAttempts: newAttempts,
        connectionError: error.message,
        // EXPLICITLY preserve the session ID - NEVER change it on failed connection
        persistentSessionId: currentSessionId
      });
      
      // Silent error handling to reduce console noise
    }
  }, [connectionState.connectionAttempts, connectionState.persistentSessionId, updateConnectionState]);

  // Minimal connection checking to reduce server load and errors
  useEffect(() => {
    // Only check connection initially if we haven't checked recently
    const timeSinceLastCheck = Date.now() - connectionState.lastConnectionCheck;
    const shouldDoInitialCheck = timeSinceLastCheck > 60000; // Only if more than 1 minute since last check
    
    let initialCheck: NodeJS.Timeout;
    if (shouldDoInitialCheck) {
      initialCheck = setTimeout(checkConnection, 5000); // 5 second delay to reduce rapid checks
    }
    
    // Greatly reduced retry logic
    let interval: NodeJS.Timeout;
    
    if (connectionState.isConnected === false && connectionState.connectionAttempts < 2) { // Reduced to only 2 attempts
      // Much longer intervals to reduce server spam
      const baseInterval = 30000; // Start with 30 seconds
      const maxInterval = 600000; // Max 10 minutes
      const backoffFactor = 3; // Aggressive backoff
      
      let retryInterval = baseInterval * Math.pow(backoffFactor, connectionState.connectionAttempts);
      retryInterval = Math.min(retryInterval, maxInterval);
      
      interval = setInterval(checkConnection, retryInterval);
    } else if (connectionState.isConnected === true) {
      // Much longer periodic check when connected - every 10 minutes
      interval = setInterval(checkConnection, 600000); 
    }
    
    return () => {
      if (initialCheck) clearTimeout(initialCheck);
      if (interval) clearInterval(interval);
    };
  }, [checkConnection, connectionState.isConnected, connectionState.connectionAttempts, connectionState.lastConnectionCheck]);

  // בדיקת חיבור מופחתת - רק לאירועים קריטיים
  useEffect(() => {
    const handleOnline = () => {
      // Reset connection attempts when network comes back
      updateConnectionState({
        connectionAttempts: 0,
        connectionError: null,
        persistentSessionId: connectionState.persistentSessionId
      });
      // Wait a bit before checking to let network stabilize
      setTimeout(checkConnection, 1000);
    };

    const handleOffline = () => {
      updateConnectionState({
        isConnected: false,
        connectionError: 'NETWORK_OFFLINE',
        persistentSessionId: connectionState.persistentSessionId
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkConnection, connectionState.persistentSessionId, updateConnectionState]);

  // פונקציה לאיפוס הסשן (אם נדרש)
  const resetPersistentSession = useCallback(() => {
    const newSessionId = generateSessionId();
    console.log('🔄 Resetting persistent session:', newSessionId.substring(0, 8) + '...');
    updateConnectionState({
      persistentSessionId: newSessionId,
      connectionAttempts: 0,
      connectionError: null
    });
  }, [updateConnectionState]);

  // Silent session tracking to reduce console noise

  return {
    isConnected: connectionState.isConnected,
    lastConnectionCheck: connectionState.lastConnectionCheck,
    connectionAttempts: connectionState.connectionAttempts,
    connectionError: connectionState.connectionError,
    persistentSessionId: connectionState.persistentSessionId,
    checkConnection,
    resetPersistentSession,
    shouldShowOfflineMode: connectionState.isConnected === false && connectionState.connectionAttempts >= 1,
    maxRetryReached: connectionState.connectionAttempts >= 2,
    // Debug info for troubleshooting
    sessionDebugInfo: {
      hasLocalStorage: typeof(Storage) !== "undefined",
      storedSessionExists: !!localStorage.getItem('dr-rima-supabase-connection'),
      sessionIdLength: connectionState.persistentSessionId?.length || 0
    }
  };
}