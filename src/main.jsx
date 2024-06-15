import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Routes/Routes.jsx';
import AuthProvider, { AuthContext } from './Pages/Providers/AuthProvider.jsx';
import { HelmetProvider } from 'react-helmet-async';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
     <HelmetProvider>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </HelmetProvider>
    </QueryClientProvider>
    
  </React.StrictMode>,
)
