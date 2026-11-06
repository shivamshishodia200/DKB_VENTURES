import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Brands from './pages/Brands'
import BrandDetail from './pages/BrandDetail'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Wholesale from './pages/Wholesale'
import Distribution from './pages/Distribution'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import TrackOrder from './pages/TrackOrder'
import Policies from './pages/Policies'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Core Public Pages */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="brands" element={<Brands />} />
        <Route path="brands/:brandSlug" element={<BrandDetail />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:slug" element={<Product />} />

        {/* B2B Commercial & Partnerships */}
        <Route path="wholesale" element={<Wholesale />} />
        <Route path="distribution" element={<Distribution />} />
        <Route path="partner-with-us" element={<Navigate to="/distribution" replace />} />
        <Route path="contact" element={<Contact />} />

        {/* Commerce Flow */}
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="track-order" element={<TrackOrder />} />

        {/* Operations & Admin Portal */}
        <Route path="admin" element={<Admin />} />

        {/* Legal & Policy Pages */}
        <Route path="privacy-policy" element={<Policies />} />
        <Route path="terms-and-conditions" element={<Policies />} />
        <Route path="shipping-policy" element={<Policies />} />
        <Route path="return-refund-policy" element={<Policies />} />

        {/* 404 Wildcard Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
