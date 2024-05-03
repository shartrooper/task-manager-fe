import { Header } from '@/features/header';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { GridContainer } from './features/products';

function App() {
  return (<div className='bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen'>
    <Header />
    <QueryClientProvider client={queryClient}>
      <GridContainer />
    </QueryClientProvider>
  </div>
  )
}

export default App
