import React from 'react'
import {SnackbarProvider} from 'notistack'
import {AppProvider} from './AppContext'
import AppRoutes from './AppRoutes'
import {ColorModeProvider} from './ColorModeContext.jsx'
import {LoadingProvider} from '../youtubeContext/LoadingProvider.jsx'

// removed <AuthProvider> & <DBProvider>

function App() {
    return (
        <ColorModeProvider>
            <SnackbarProvider>
                    <AppProvider>

                        <LoadingProvider>
                            <AppRoutes/>
                        </LoadingProvider>

                    </AppProvider>
            </SnackbarProvider>
        </ColorModeProvider>
    )
}

export default App
