import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/home";
import ListingDetail from "./pages/listingDetails";
import Navbar from "./components/navbar";
import CreateListing from "./pages/createListing";
import EditListing from "./pages/editListing";
import Footer from "./components/footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Wishlist from "./pages/Wishlist";
import { LoadingProvider } from "./context/LoadingContext";



function App() {


  return (

    <BrowserRouter>
      <LoadingProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings/:id" element={<ListingDetail />} />
            <Route path="/listings/new" element={<ProtectedRoute><CreateListing /></ProtectedRoute>} />
            <Route path="/listings/:id/edit" element={<ProtectedRoute><EditListing /></ProtectedRoute>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<h1 style={{ textAlign: 'center', margin: '5rem 0' }}>404 Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </LoadingProvider>
    </BrowserRouter>

  )
}

export default App

