import React from 'react'
import {SnackbarProvider} from 'notistack'
import {AppProvider} from './AppContext'
import AppRoutes from './AppRoutes'
import {ColorModeProvider} from './ColorModeContext.jsx'

// removed <AuthProvider> & <DBProvider>

function App() {
    return (
        <ColorModeProvider>
            <SnackbarProvider>

                    <AppProvider>

                            <AppRoutes/>

                    </AppProvider>

            </SnackbarProvider>
        </ColorModeProvider>
    )
}

export default App
