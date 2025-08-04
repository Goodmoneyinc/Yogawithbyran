import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Eco-Friendly Yoga Mat",
    price: "$20",
    rating: 4.9,
    reviews: 234,
    image: "https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Equipment",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Meditation Cushion Set",
    price: "$20",
    rating: 4.8,
    reviews: 156,
    image: "https://images.pexels.com/photos/6551240/pexels-photo-6551240.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Accessories"
  },
  {
    id: 3,
    name: "Organic Cotton Yoga Blocks",
    price: "$20",
    rating: 4.7,
    reviews: 89,
    image: "https://images.pexels.com/photos/6975464/pexels-photo-6975464.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Equipment"
  },
  {
    id: 4,
    name: "Yoga with Bryan T-Shirt",
    price: "$20",
    rating: 4.9,
    reviews: 312,
    image: "https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Apparel",
    badge: "New"
  },
  {
    id: 5,
    name: "Yoga Strap & Band Set",
    price: "$20",
    rating: 4.6,
    reviews: 67,
    image: "https://images.pexels.com/photos/6975466/pexels-photo-6975466.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Equipment"
  },
  {
    id: 6,
    name: "Essential Oils Collection",
    price: "$20",
    rating: 4.8,
    reviews: 198,
    image: "https://images.pexels.com/photos/5946041/pexels-photo-5946041.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Wellness"
  },
  {
    id: 7,
    name: "Bamboo Water Bottle",
    price: "$20",
    rating: 4.7,
    reviews: 124,
    image: "https://images.pexels.com/photos/6621178/pexels-photo-6621178.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Accessories"
  },
  {
    id: 8,
    name: "Yoga Leggings - Premium",
    price: "$20",
    rating: 4.9,
    reviews: 445,
    image: "https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Apparel",
    badge: "Sale"
  }
];

const categories = ["All", "Equipment", "Apparel", "Accessories", "Wellness"];

export default function Merchandise() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section id="shop" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Yoga Essentials Shop</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enhance your practice with our carefully curated collection of premium yoga equipment, 
            comfortable apparel, and wellness accessories.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                    product.badge === 'Sale' ? 'bg-red-100 text-red-800' :
                    product.badge === 'New' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {product.badge}
                  </div>
                )}
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <button className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Offer */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Free Shipping on All Orders + 2 Week Trial</h3>
          <p className="text-emerald-100 mb-6">
            Get free shipping on everything plus a 2-week free trial when you subscribe
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg text-gray-900 w-full sm:w-80"
            />
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}