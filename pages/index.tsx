"use client"


import type React from "react"


import { createContext, useContext, useState, useEffect, useRef } from "react"
import Head from "next/head"


// Type definitions
type Product = {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
}


type CartItem = {
  product: Product
  quantity: number
}


type User = {
  id: number
  name: string
  email: string
}


type Page = "home" | "product" | "cart" | "login" | "signup" | "checkout" | "confirmation" | "deals" | "about"


// Type definitions for context
type AppContextType = {
  currentPage: Page
  setCurrentPage: (page: Page) => void
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  user: User | null
  login: (email: string, password: string) => void
  signup: (name: string, email: string, password: string) => void
  logout: () => void
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void
  homeRef: React.RefObject<HTMLDivElement>
  categoriesRef: React.RefObject<HTMLDivElement>
  dealsRef: React.RefObject<HTMLDivElement>
  aboutRef: React.RefObject<HTMLDivElement>
  quickViewProduct: Product | null
  setQuickViewProduct: (product: Product | null) => void
}


const AppContext = createContext<AppContextType | undefined>(undefined)


// Sample product data with accurate Unsplash images
const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design for extended listening sessions.",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Ergonomic Office Chairs",
    price: 249.99,
    description:
      "Work in comfort with our ergonomic office chair. Designed to support proper posture with adjustable height, lumbar support, and breathable mesh backing.",
    image:
      "https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Furniture",
  },
  {
    id: 3,
    name: "Smart Fitness Watches",
    price: 149.99,
    description:
      "Track your fitness goals with precision. Features heart rate monitoring, sleep tracking, GPS, and water resistance up to 50 meters. Compatible with iOS and Android.",
    image:
      "https://images.unsplash.com/photo-1629339837617-7069ce9e7f6b?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    description:
      "Stay hydrated with our vacuum-insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. Made from high-quality stainless steel with a leak-proof design.",
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Kitchen",
  },
  {
    id: 5,
    name: "Organic Cotton T-Shirt",
    price: 34.99,
    description:
      "Feel good in our 100% organic cotton t-shirt. Soft, breathable, and ethically sourced. Available in multiple colors and sizes.",
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Clothing",
  },
  {
    id: 6,
    name: "Professional Chef Knife",
    price: 89.99,
    description:
      "Elevate your cooking with our professional-grade chef knife. Precision-forged from high-carbon stainless steel with a comfortable ergonomic handle.",
    image:
      "https://sjc.microlink.io/ljn6BBJict56lY7790XMJJWEEBCjVx6BSuq6V6JCYJueRRp6cfQ8ZQWYRbPXSKezQwXsl1wLbDC1CLJezgw9cA.jpeg",
    category: "Kitchen",
  },
  {
    id: 7,
    name: "Wireless Charging Pad",
    price: 39.99,
    description:
      "Charge your devices without the hassle of cables. Compatible with all Qi-enabled smartphones and earbuds. Sleek, minimal design fits any desk or nightstand.",
    image:
      "https://images.unsplash.com/photo-1622445275576-721325763afe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
  },
  {
    id: 8,
    name: "Leather Messenger Bag",
    price: 129.99,
    description:
      "Carry your essentials in style with our genuine leather messenger bag. Features multiple compartments, laptop sleeve, and adjustable shoulder strap.",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Accessories",
  },
  {
    id: 9,
    name: "Bluetooth Portable Speaker",
    price: 79.99,
    description:
      "Take your music anywhere with this compact yet powerful Bluetooth speaker. Features 12-hour battery life, water resistance, and rich, immersive sound quality.",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Electronics",
  },
  {
    id: 10,
    name: "Ceramic Coffee Mug Set",
    price: 24.99,
    description:
      "Start your morning right with this elegant set of four ceramic coffee mugs. Microwave and dishwasher safe with a comfortable handle and modern design.",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Kitchen",
  },
  {
    id: 11,
    name: "Leather Wallet",
    price: 49.99,
    description:
      "Slim, stylish leather wallet with RFID protection. Features multiple card slots, ID window, and bill compartment in a compact design.",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Accessories",
  },
  {
    id: 12,
    name: "Smart Home Hub",
    price: 129.99,
    description:
      "Control your entire smart home with this intuitive hub. Compatible with most smart devices and voice assistants for seamless home automation.",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Electronics",
  },
  {
    id: 13,
    name: "Premium Cutting Board",
    price: 59.99,
    description:
      "Handcrafted acacia wood cutting board with juice groove and non-slip feet. Durable, knife-friendly, and beautiful enough to serve as a serving platter.",
    image:
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Kitchen",
  },
  {
    id: 14,
    name: "Vintage Sunglasses",
    price: 89.99,
    description:
      "Classic design meets modern protection with these vintage-inspired sunglasses. Featuring polarized lenses and 100% UV protection in a timeless frame.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Accessories",
  },
]


const additionalProducts: Product[] = [
  {
    id: 15,
    name: "Running Shoes",
    price: 79.99,
    description:
      "Comfortable running shoes with advanced cushioning technology for your daily workout. Breathable mesh upper and durable rubber outsole provide support and traction for any terrain.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Clothing",
  },
  {
    id: 16,
    name: "Coffee Maker",
    price: 49.99,
    description:
      "Brew your perfect cup of coffee every morning with this programmable coffee maker. Features adjustable brew strength, auto-shutoff, and a sleek design that complements any kitchen.",
    image:
      "https://images.unsplash.com/photo-1608354580875-30bd4168b351?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Kitchen",
  },
]


// Combine the original products with the additional ones
const allProducts = [...products, ...additionalProducts]


// Main App Component
export default function EcommerceApp() {
  // State management
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")


  // Refs for scrolling to sections
  const homeRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const dealsRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)


  // Scroll to section function with offset for header
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const headerOffset = 80 // Adjust based on your header height
      const elementPosition = ref.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset


      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }


  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }


    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])


  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])


  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])


  // Toast notification
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showToast])


  // Close quick view when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (quickViewProduct && !target.closest(".quick-view-content")) {
        setQuickViewProduct(null)
      }
    }


    if (quickViewProduct) {
      document.addEventListener("mousedown", handleClickOutside)
    }


    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [quickViewProduct])


  // Prevent body scroll when quick view is open
  useEffect(() => {
    if (quickViewProduct) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }


    return () => {
      document.body.style.overflow = "auto"
    }
  }, [quickViewProduct])


  // Cart functions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        return [...prevCart, { product, quantity }]
      }
    })


    // Show toast notification
    setToastMessage(`${product.name} added to cart!`)
    setShowToast(true)
  }


  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
  }


  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }


    setCart((prevCart) => prevCart.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }


  const clearCart = () => {
    setCart([])
  }


  // Auth functions
  const login = (email: string, password: string) => {
    // In a real app, this would validate against a backend
    // For demo purposes, we'll just create a mock user
    setUser({
      id: 1,
      name: email.split("@")[0],
      email,
    })
    setCurrentPage("home")


    // Show toast notification
    setToastMessage(`Welcome back, ${email.split("@")[0]}!`)
    setShowToast(true)
  }


  const signup = (name: string, email: string, password: string) => {
    // In a real app, this would create a user in the backend
    // For demo purposes, we'll just create a mock user
    setUser({
      id: 1,
      name,
      email,
    })
    setCurrentPage("home")


    // Show toast notification
    setToastMessage(`Welcome, ${name}! Your account has been created.`)
    setShowToast(true)
  }


  const logout = () => {
    setUser(null)


    // Show toast notification
    setToastMessage("You have been logged out.")
    setShowToast(true)
  }


  // Context value
  const contextValue: AppContextType = {
    currentPage,
    setCurrentPage,
    selectedProduct,
    setSelectedProduct,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    user,
    login,
    signup,
    logout,
    scrollToSection,
    homeRef,
    categoriesRef,
    dealsRef,
    aboutRef,
    quickViewProduct,
    setQuickViewProduct,
  }


  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>EcoShop - Premium E-Commerce Platform</title>
          <meta name="description" content="Shop premium products with EcoShop" />
        </Head>


        {/* Inline Tailwind directives */}
        <style jsx global>{`
          @tailwind base;
          @tailwind components;
          @tailwind utilities;
          
          :root {
            --foreground-rgb: 0, 0, 0;
            --background-rgb: 248, 250, 252;
            --primary: 20, 184, 166;
            --primary-light: 153, 246, 228;
            --primary-dark: 17, 94, 89;
            --secondary: 100, 116, 139;
            --accent: 249, 115, 22;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          body {
            color: rgb(var(--foreground-rgb));
            background: rgb(var(--background-rgb));
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }
          
          .section-transition {
            transition: all 0.3s ease-in-out;
          }
          
          .product-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          
          .btn-primary {
            background-color: rgb(var(--primary));
            color: white;
            transition: all 0.2s ease;
          }
          
          .btn-primary:hover {
            background-color: rgb(var(--primary-dark));
          }
          
          .btn-secondary {
            background-color: white;
            color: rgb(var(--primary));
            border: 1px solid rgb(var(--primary));
            transition: all 0.2s ease;
          }
          
          .btn-secondary:hover {
            background-color: rgb(var(--primary-light));
            color: rgb(var(--primary-dark));
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .blur-bg {
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
          
          .quick-view-modal {
            animation: modalFadeIn 0.3s ease-in-out;
          }
          
          @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>


        <Header />


        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-4 right-4 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn flex items-center">
            <span>{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-3 text-white hover:text-teal-100"
              aria-label="Close notification"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}


        <main className="container mx-auto px-4 py-8">
          {currentPage === "home" && (
            <>
              <div ref={homeRef} className="section-transition">
                <Hero />
                <ProductListing />
              </div>


              <div ref={categoriesRef} id="categories" className="section-transition pt-16">
                <CategorySection />
              </div>


              <div ref={dealsRef} id="deals" className="section-transition pt-16">
                <DealsSection />
              </div>


              <div ref={aboutRef} id="about" className="section-transition pt-16">
                <AboutSection />
              </div>
            </>
          )}


          {currentPage === "product" && <ProductDetail />}
          {currentPage === "cart" && <CartPage />}
          {currentPage === "login" && <LoginPage />}
          {currentPage === "signup" && <SignupPage />}
          {currentPage === "checkout" && <CheckoutPage />}
          {currentPage === "confirmation" && <OrderConfirmation />}
        </main>


        {/* Quick View Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50 blur-bg"></div>
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto quick-view-modal quick-view-content">
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                aria-label="Close quick view"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>


              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-72 md:h-96">
                    <img
                      src={quickViewProduct.image || "/placeholder.svg"}
                      alt={quickViewProduct.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=400&width=400"
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-teal-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                      {quickViewProduct.category}
                    </div>
                  </div>
                </div>
                <div className="p-6 md:w-1/2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{quickViewProduct.name}</h2>
                  <p className="text-2xl text-teal-600 font-bold mb-4">${quickViewProduct.price.toFixed(2)}</p>
                  <p className="text-gray-600 mb-6">{quickViewProduct.description}</p>


                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setSelectedProduct(quickViewProduct)
                        setCurrentPage("product")
                        setQuickViewProduct(null)
                      }}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct)
                        setQuickViewProduct(null)
                      }}
                      className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition-colors shadow-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        <Footer />
      </div>
    </AppContext.Provider>
  )
}


// Custom hook for using the app context
function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}


// Header Component
function Header() {
  const {
    currentPage,
    setCurrentPage,
    cart,
    user,
    logout,
    scrollToSection,
    homeRef,
    categoriesRef,
    dealsRef,
    aboutRef,
  } = useAppContext()


  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)


  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }


    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)


  return (
    <header
      className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => {
                setCurrentPage("home")
                if (homeRef.current) scrollToSection(homeRef)
              }}
              className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors"
              aria-label="Go to home page"
            >
              EcoShop
            </button>
          </div>


          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <button
              onClick={() => {
                setCurrentPage("home")
                scrollToSection(homeRef)
              }}
              className={`text-base font-medium transition-colors ${
                currentPage === "home" ? "text-teal-600" : "text-gray-500 hover:text-teal-600"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentPage("home")
                scrollToSection(categoriesRef)
              }}
              className="text-base font-medium text-gray-500 hover:text-teal-600 transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => {
                setCurrentPage("home")
                scrollToSection(dealsRef)
              }}
              className="text-base font-medium text-gray-500 hover:text-teal-600 transition-colors"
            >
              Deals
            </button>
            <button
              onClick={() => {
                setCurrentPage("home")
                scrollToSection(aboutRef)
              }}
              className="text-base font-medium text-gray-500 hover:text-teal-600 transition-colors"
            >
              About
            </button>
          </nav>


          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage("cart")}
              className="relative text-gray-600 hover:text-teal-600 transition-colors"
              aria-label={`View cart with ${totalItems} items`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>


            {user ? (
              <div className="relative group">
                <button
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="mr-1">{user.name}</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => alert("Profile feature coming soon!")}
                  >
                    Profile
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => alert("Orders feature coming soon!")}
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage("login")}
                className="text-teal-600 hover:text-teal-800 font-medium transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>


        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  setCurrentPage("home")
                  scrollToSection(homeRef)
                  setIsMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage("home")
                  scrollToSection(categoriesRef)
                  setIsMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
              >
                Categories
              </button>
              <button
                onClick={() => {
                  setCurrentPage("deals")
                  scrollToSection(dealsRef)
                  setIsMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
              >
                Deals
              </button>
              <button
                onClick={() => {
                  setCurrentPage("about")
                  scrollToSection(aboutRef)
                  setIsMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
              >
                About
              </button>
              <button
                onClick={() => {
                  setCurrentPage("cart")
                  setIsMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
              >
                Cart ({totalItems})
              </button>
              {user ? (
                <>
                  <button
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
                    onClick={() => alert("Profile feature coming soon!")}
                  >
                    Profile
                  </button>
                  <button
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
                    onClick={() => alert("Orders feature coming soon!")}
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setCurrentPage("login")
                    setIsMenuOpen(false)
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-teal-600 hover:text-teal-800 w-full text-left"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}


// Hero Component
function Hero() {
  const { setCurrentPage, scrollToSection, categoriesRef } = useAppContext()


  return (
    <div className="relative py-16 md:py-24 rounded-xl mb-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-teal-800/90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Hero background showing a shopping scene"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=600&width=1200"
          }}
        />
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Discover Quality Products</span>
            <span className="block">For Your Lifestyle</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-white text-opacity-90 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Shop our curated collection of premium products at affordable prices. Free shipping on orders over $50.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={() => scrollToSection(categoriesRef)}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Browse Categories
              </button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <button
                onClick={() => setCurrentPage("cart")}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-800 hover:bg-teal-900 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// Product Listing Component
function ProductListing() {
  const { setSelectedProduct, addToCart, setQuickViewProduct } = useAppContext()
  const [filter, setFilter] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])


  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)


    return () => clearTimeout(timer)
  }, [])


  // Listen for category filter events
  useEffect(() => {
    const handleFilterCategory = (event: CustomEvent) => {
      setFilter(event.detail)
    }


    window.addEventListener("filter-category" as any, handleFilterCategory as EventListener)


    return () => {
      window.removeEventListener("filter-category" as any, handleFilterCategory as EventListener)
    }
  }, [])


  // Update related products when filter changes
  useEffect(() => {
    if (filter) {
      // Find products related to the selected category but not in the filtered products
      const filtered = allProducts.filter((product) => product.category.toLowerCase() === filter.toLowerCase())
      const otherCategories = allProducts.filter(
        (product) =>
          product.category.toLowerCase() !== filter.toLowerCase() &&
          ["Electronics", "Kitchen", "Accessories"].includes(product.category),
      )


      // Randomly select up to 3 products from other categories
      const shuffled = otherCategories.sort(() => 0.5 - Math.random())
      setRelatedProducts(shuffled.slice(0, 3))
    } else {
      setRelatedProducts([])
    }
  }, [filter])


  const filteredProducts = filter
    ? allProducts.filter((product) => product.category.toLowerCase() === filter.toLowerCase())
    : allProducts


  const categories = Array.from(new Set(allProducts.map((product) => product.category)))


  return (
    <div id="product-listing" className="py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          {filter ? `${filter} Products` : "Featured Products"}
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "" ? "bg-teal-500 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category ? "bg-teal-500 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>


      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-64 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="flex space-x-2">
                  <div className="h-10 bg-gray-300 rounded flex-1"></div>
                  <div className="h-10 bg-gray-300 rounded flex-1"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
              >
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=300&width=300"
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="bg-white text-gray-800 py-2 px-4 rounded-md mx-2 hover:bg-gray-100 transition-colors shadow-md"
                      aria-label={`Quick view ${product.name}`}
                    >
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                    <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">{product.category}</span>
                  </div>
                  <p className="text-teal-600 font-bold text-xl mb-4">${product.price.toFixed(2)}</p>
                  <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                  <div className="flex space-x-2 mt-auto">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition-colors shadow-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* Related Products Section */}
          {filter && relatedProducts.length > 0 && (
            <div className="mt-16 animate-fadeIn">
              <div className="border-l-4 border-teal-500 pl-4 mb-8">
                <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
                <p className="text-gray-600 mt-1">Discover related products from other categories</p>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {relatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-card bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden group">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=300&width=300"
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="bg-white text-gray-800 py-2 px-4 rounded-md mx-2 hover:bg-gray-100 transition-colors shadow-md"
                          aria-label={`Quick view ${product.name}`}
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                        <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      <p className="text-teal-600 font-bold text-xl mb-4">${product.price.toFixed(2)}</p>
                      <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                      <div className="flex space-x-2 mt-auto">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition-colors shadow-md"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}


// Product Detail Component
function ProductDetail() {
  const { selectedProduct, addToCart, setCurrentPage } = useAppContext()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")


  if (!selectedProduct) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Product not found</p>
        <button
          onClick={() => setCurrentPage("home")}
          className="mt-4 text-teal-600 hover:text-teal-800 transition-colors"
        >
          Back to products
        </button>
      </div>
    )
  }


  return (
    <div className="py-8 animate-fadeIn">
      <button
        onClick={() => setCurrentPage("home")}
        className="flex items-center text-teal-600 hover:text-teal-800 mb-6 transition-colors"
      >
        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to products
      </button>


      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <div className="relative h-96 md:h-full">
              <img
                src={selectedProduct.image || "/placeholder.svg"}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=400&width=400"
                }}
              />
              <div className="absolute top-4 right-4 bg-teal-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                {selectedProduct.category}
              </div>
            </div>
          </div>
          <div className="p-8 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
            <p className="text-3xl text-teal-600 font-bold mb-6">${selectedProduct.price.toFixed(2)}</p>


            <div className="mb-8">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`py-2 px-4 font-medium ${
                    activeTab === "description"
                      ? "text-teal-600 border-b-2 border-teal-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`py-2 px-4 font-medium ${
                    activeTab === "details"
                      ? "text-teal-600 border-b-2 border-teal-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`py-2 px-4 font-medium ${
                    activeTab === "shipping"
                      ? "text-teal-600 border-b-2 border-teal-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Shipping
                </button>
              </div>


              <div className="py-4">
                {activeTab === "description" && (
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                )}


                {activeTab === "details" && (
                  <div className="text-gray-600">
                    <p className="mb-2">• Premium quality materials</p>
                    <p className="mb-2">• Designed for durability and performance</p>
                    <p className="mb-2">• 1-year manufacturer warranty</p>
                    <p>• Satisfaction guaranteed</p>
                  </div>
                )}


                {activeTab === "shipping" && (
                  <div className="text-gray-600">
                    <p className="mb-2">• Free shipping on orders over $50</p>
                    <p className="mb-2">• Standard shipping: 3-5 business days</p>
                    <p className="mb-2">• Express shipping: 1-2 business days (additional fee)</p>
                    <p>• 30-day return policy</p>
                  </div>
                )}
              </div>
            </div>


            <div className="mb-8">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>


            <div className="flex space-x-4">
              <button
                onClick={() => {
                  addToCart(selectedProduct, quantity)
                  setCurrentPage("cart")
                }}
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-md transition-colors shadow-md"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(selectedProduct, quantity)
                  setCurrentPage("checkout")
                }}
                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-md transition-colors shadow-md"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// Category Section Component
function CategorySection() {
  const { setCurrentPage, scrollToSection } = useAppContext()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)


  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      count: allProducts.filter((p) => p.category === "Electronics").length,
    },
    {
      name: "Furniture",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      count: allProducts.filter((p) => p.category === "Furniture").length,
    },
    {
      name: "Kitchen",
      image:
        "https://plus.unsplash.com/premium_photo-1686090446908-60fbb45f2805?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      count: allProducts.filter((p) => p.category === "Kitchen").length,
    },
    {
      name: "Clothing",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      count: allProducts.filter((p) => p.category === "Clothing").length,
    },
    {
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      count: allProducts.filter((p) => p.category === "Accessories").length,
    },
  ]


  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
        <p className="mt-4 text-xl text-gray-600">Browse our wide selection of products by category</p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="product-card bg-white rounded-lg shadow-lg overflow-hidden text-center">
            <div className="relative h-40 overflow-hidden">
              <img
                src={category.image || "/placeholder.svg"}
                alt={`${category.name} category`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=200&width=200"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4">
                <h3 className="text-white font-bold text-xl">{category.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4">{category.count} Products</p>
              <button
                onClick={() => {
                  // Filter products by this category
                  window.dispatchEvent(new CustomEvent("filter-category", { detail: category.name }))
                  scrollToSection({
                    current: document.getElementById("product-listing"),
                  } as React.RefObject<HTMLDivElement>)
                }}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition-colors shadow-md"
              >
                View Products
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


// Deals Section Component
function DealsSection() {
  const { setCurrentPage, setSelectedProduct, addToCart, scrollToSection, dealsRef } = useAppContext()


  // Featured deals (using some of the existing products)
  const deals = allProducts.slice(0, 3).map((product) => ({
    ...product,
    originalPrice: product.price * 1.25, // 25% discount
    discountPercent: 25,
  }))


  const viewAllDeals = () => {
    // Create a special "Deals" page or just show all products with a filter
    setCurrentPage("home")
    // Scroll to the deals section
    scrollToSection(dealsRef)
  }


  return (
    <div className="py-12 bg-gray-50 rounded-xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Special Deals</h2>
        <p className="mt-4 text-xl text-gray-600">Limited time offers on our best products</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="product-card bg-white rounded-lg shadow-lg overflow-hidden border-2 border-teal-500"
          >
            <div className="relative">
              <div className="absolute top-0 right-0 bg-teal-500 text-white px-3 py-1 rounded-bl-lg font-bold shadow-md z-10">
                {deal.discountPercent}% OFF
              </div>
              <img
                src={deal.image || "/placeholder.svg"}
                alt={deal.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=200&width=300"
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{deal.name}</h3>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-teal-600">${deal.price.toFixed(2)}</span>
                <span className="ml-2 text-lg text-gray-500 line-through">${deal.originalPrice.toFixed(2)}</span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{deal.description}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedProduct(deal)
                    setCurrentPage("product")
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
                >
                  Details
                </button>
                <button
                  onClick={() => addToCart(deal)}
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition-colors shadow-md"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="text-center mt-10">
        <button
          onClick={viewAllDeals}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors"
        >
          View All Deals
          <svg
            className="ml-2 -mr-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}


// About Section Component
function AboutSection() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">About EcoShop</h2>
          <p className="mt-4 text-xl text-gray-600">Your trusted source for quality products</p>
        </div>


        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="About EcoShop - Team working in a modern office"
                className="h-64 w-full object-cover md:h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=400&width=600"
                }}
              />
            </div>
            <div className="p-8 md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-600 mb-4">
                Founded in 2023, EcoShop was created with a simple mission: to provide high-quality products at
                affordable prices while maintaining a commitment to sustainability and ethical business practices.
              </p>
              <p className="text-gray-600 mb-4">
                We carefully curate our selection to ensure that every product meets our standards for quality,
                durability, and value. Our team works directly with manufacturers to bring you the best products without
                the markup of traditional retail.
              </p>
              <p className="text-gray-600">
                At EcoShop, we believe that shopping should be easy, enjoyable, and environmentally responsible. That's
                why we offer carbon-neutral shipping, minimal packaging, and a commitment to reducing waste in all
                aspects of our business.
              </p>
            </div>
          </div>
        </div>


        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white mb-4 shadow-md">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Shipping</h3>
            <p className="text-gray-600">Free shipping on orders over $50, and all orders ship within 24 hours.</p>
          </div>


          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white mb-4 shadow-md">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guarantee</h3>
            <p className="text-gray-600">All products are backed by our 30-day satisfaction guarantee.</p>
          </div>


          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white mb-4 shadow-md">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payments</h3>
            <p className="text-gray-600">Your payment information is always secure with our encrypted checkout.</p>
          </div>
        </div>
      </div>
    </div>
  )
}


// Cart Page Component
function CartPage() {
  const { cart, updateQuantity, removeFromCart, setCurrentPage, user } = useAppContext()


  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax


  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h2 className="mt-4 text-2xl font-medium text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">Looks like you haven't added any products to your cart yet.</p>
        <button
          onClick={() => setCurrentPage("home")}
          className="mt-6 inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-teal-500 hover:bg-teal-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    )
  }


  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>


      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.product.id} className="p-6">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:flex-shrink-0 mb-4 sm:mb-0">
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-full sm:w-32 h-32 object-cover rounded-md shadow-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=150&width=150"
                        }}
                      />
                    </div>
                    <div className="sm:ml-6 sm:flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h2 className="text-lg font-medium text-gray-900">{item.product.name}</h2>
                        <p className="text-lg font-medium text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                      <div className="mt-4 flex-1 flex items-end justify-between">
                        <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-sm text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>


          <div className="mt-6">
            <button
              onClick={() => setCurrentPage("home")}
              className="flex items-center text-teal-600 hover:text-teal-800 transition-colors"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </button>
          </div>
        </div>


        <div className="mt-8 lg:mt-0 lg:col-span-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="flow-root">
              <dl className="text-sm">
                <div className="py-2 flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="py-2 flex items-center justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="font-medium text-gray-900">${shipping.toFixed(2)}</dd>
                </div>
                <div className="py-2 flex items-center justify-between">
                  <dt className="text-gray-600">Tax</dt>
                  <dd className="font-medium text-gray-900">${tax.toFixed(2)}</dd>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-gray-200">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>


            <div className="mt-6">
              <button
                onClick={() => setCurrentPage(user ? "checkout" : "login")}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-md transition-colors duration-300 shadow-md"
              >
                {user ? "Proceed to Checkout" : "Login to Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// Login Page Component
function LoginPage() {
  const { login, setCurrentPage } = useAppContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }


    // Simple validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }


    login(email, password)
  }


  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Login to Your Account</h1>


      <div className="bg-white rounded-lg shadow-lg p-8">
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}


        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 shadow-sm"
              placeholder="you@example.com"
            />
          </div>


          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 shadow-sm"
              placeholder="••••••••"
            />
          </div>


          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>


            <div className="text-sm">
              <a href="#" className="text-teal-600 hover:text-teal-500 transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>


          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-md transition-colors duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>


        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => setCurrentPage("signup")}
              className="text-teal-600 hover:text-teal-500 font-medium transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}


// Signup Page Component
function SignupPage() {
  const { signup, setCurrentPage } = useAppContext()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }


    // Simple validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }


    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }


    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }


    signup(name, email, password)
  }


  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create an Account</h1>


      <div className="bg-white rounded-lg shadow-lg p-8">
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}


        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 shadow-sm"
              placeholder="John Doe"
            />
          </div>


          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 shadow-sm"
              placeholder="you@example.com"
            />
          </div>


          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 shadow-sm"
              placeholder="••••••••"
            />
          </div>


          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 shadow-sm"
              placeholder="••••••••"
            />
          </div>


          <div className="mb-6">
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-teal-600 hover:text-teal-500 transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-teal-600 hover:text-teal-500 transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>


          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-md transition-colors duration-300 shadow-md"
          >
            Create Account
          </button>
        </form>


        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => setCurrentPage("login")}
              className="text-teal-600 hover:text-teal-500 font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}


// Checkout Page Component
function CheckoutPage() {
  const { cart, clearCart, setCurrentPage } = useAppContext()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })


  const [errors, setErrors] = useState<Record<string, string>>({})


  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))


    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }


  const validateForm = () => {
    const newErrors: Record<string, string> = {}


    // Required fields
    const requiredFields = ["firstName", "lastName", "address", "city", "state", "zipCode"]
    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = "This field is required"
      }
    })


    // Payment validation
    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber) {
        newErrors.cardNumber = "Card number is required"
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Invalid card number"
      }


      if (!formData.cardExpiry) {
        newErrors.cardExpiry = "Expiry date is required"
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = "Invalid format (MM/YY)"
      }


      if (!formData.cardCvc) {
        newErrors.cardCvc = "CVC is required"
      } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
        newErrors.cardCvc = "Invalid CVC"
      }
    }


    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()


    if (validateForm()) {
      // In a real app, this would submit the order to a backend
      clearCart()
      setCurrentPage("confirmation")
    }
  }


  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-medium text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">Add some products to your cart before checking out.</p>
        <button
          onClick={() => setCurrentPage("home")}
          className="mt-6 inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-teal-500 hover:bg-teal-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    )
  }


  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>


      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>


            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.firstName ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>


                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.lastName ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>


                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.address ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>


                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.city ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>


                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State / Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.state ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                  />
                  {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                </div>


                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP / Postal code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.zipCode ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                  />
                  {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                </div>


                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
              </div>


              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>


                <div className="mt-4">
                  <div className="flex items-center">
                    <input
                      id="credit-card"
                      name="paymentMethod"
                      type="radio"
                      value="credit-card"
                      checked={formData.paymentMethod === "credit-card"}
                      onChange={handleChange}
                      className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                    />
                    <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                      Credit Card
                    </label>
                  </div>


                  {formData.paymentMethod === "credit-card" && (
                    <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                      <div className="sm:col-span-3">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                          Card number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          className={`mt-1 block w-full border ${errors.cardNumber ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                        />
                        {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                      </div>


                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                          Expiration date (MM/YY)
                        </label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className={`mt-1 block w-full border ${errors.cardExpiry ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                        />
                        {errors.cardExpiry && <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>}
                      </div>


                      <div>
                        <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
                          CVC
                        </label>
                        <input
                          type="text"
                          id="cardCvc"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          placeholder="123"
                          className={`mt-1 block w-full border ${errors.cardCvc ? "border-red-300" : "border-gray-300"} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500`}
                        />
                        {errors.cardCvc && <p className="mt-1 text-sm text-red-600">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  )}


                  <div className="mt-4">
                    <div className="flex items-center">
                      <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={handleChange}
                        className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                      />
                      <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                        PayPal
                      </label>
                    </div>
                  </div>
                </div>
              </div>


              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-md transition-colors duration-300 shadow-md"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>


        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>


            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.product.id} className="py-4 flex">
                  <div className="flex-shrink-0 w-16 h-16">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-md shadow-sm"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=100&width=100"
                      }}
                    />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>


            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Shipping</dt>
                <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Tax</dt>
                <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}


// Order Confirmation Component
function OrderConfirmation() {
  const { setCurrentPage } = useAppContext()
  const orderNumber = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")


  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <svg className="mx-auto h-16 w-16 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Thank you for your order!</h1>
        <p className="mt-2 text-lg text-gray-600">Your order has been placed successfully.</p>
        <p className="mt-1 text-lg text-gray-600">
          Order number: <span className="font-medium">{orderNumber}</span>
        </p>


        <p className="mt-6 text-base text-gray-500">
          We've sent a confirmation email with order details and tracking information.
        </p>


        <div className="mt-10">
          <button
            onClick={() => setCurrentPage("home")}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-teal-500 hover:bg-teal-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}


// Footer Component
function Footer() {
  const { setCurrentPage, scrollToSection, homeRef, categoriesRef, dealsRef, aboutRef } = useAppContext()


  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)


  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      setIsSubscribed(true)
      setEmail("")


      // Reset subscription status after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false)
      }, 5000)
    }
  }


  return (
    <footer className="bg-white mt-16 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">EcoShop</h3>
            <p className="text-gray-600">Your one-stop shop for quality products at affordable prices.</p>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage("home")
                    scrollToSection(homeRef)
                  }}
                  className="text-gray-600 hover:text-teal-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage("home")
                    scrollToSection(categoriesRef)
                  }}
                  className="text-gray-600 hover:text-teal-600 transition-colors"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage("home")
                    scrollToSection(dealsRef)
                  }}
                  className="text-gray-600 hover:text-teal-600 transition-colors"
                >
                  Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage("home")
                    scrollToSection(aboutRef)
                  }}
                  className="text-gray-600 hover:text-teal-600 transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Connected</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for updates and exclusive offers.</p>
            {isSubscribed ? (
              <div className="bg-green-100 text-green-700 px-4 py-3 rounded-md mb-4 animate-fadeIn">
                <p className="font-medium">Subscribed!</p>
                <p className="text-sm">Thank you for subscribing to our newsletter.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-2 w-full border border-gray-300 rounded-l-md focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                />
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-r-md transition-colors shadow-md"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>


        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">&copy; {new Date().getFullYear()} EcoShop. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors" aria-label="Facebook">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 transition-colors duration-300 transform hover:scale-110"
              aria-label="Instagram"
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.044.976.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.684.566 1.15.748.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.044-.976-.207-1.504-.344-1.857a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors" aria-label="Twitter">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}






