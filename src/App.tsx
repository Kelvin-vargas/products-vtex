import ProductList from './components/ProductList'
import ProductListAxios from './components/ProductListAxios'
import './App.css'

function App() {
  return (
    <main className='min-h-screen bg-blue-50'>
      <div className='flex'>
        <h1 className='font-bold text-2xl text-center py-6'>Productos VTEX (fetch)</h1>
        <ProductList />
        <h1 className="text-2xl font-bold text-center py-6">Productos VTEX (axios)</h1>
        <ProductListAxios />
        </div>
    </main>
  )
}

export default App
