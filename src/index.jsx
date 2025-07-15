import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Main  from "./page/main/Main.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <Main  />
    </StrictMode>
  </QueryClientProvider>
)
