import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { categories, brands } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import type { FilterOptions } from '../types';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

  const [filters, setFilters] = useState<FilterOptions>({
    categories: searchParams.get('category') ? [searchParams.get('category')!] : [],
    subcategories: searchParams.get('subcategory') ? [searchParams.get('subcategory')!] : [],
    brands: searchParams.get('brand') ? [searchParams.get('brand')!] : [],
    priceRange: [0, 999999],
    rating: 0,
    inStock: false,
    onSale: false,
    sortBy: 'name'
  });

  // Sync URL params → state whenever the URL changes (e.g. clicking nav links)
  useEffect(() => {
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const brand = searchParams.get('brand');
    const query = searchParams.get('query') || '';
    setSearchQuery(query);
    setFilters(prev => ({
      ...prev,
      categories: category ? [category] : [],
      subcategories: subcategory ? [subcategory] : [],
      brands: brand ? [brand] : [],
      priceRange: [0, 999999],
    }));
  }, [searchParams]);

  // Brands available for the current category/search — shown in sidebar
  const availableBrands = useMemo(() => {
    let base = [...products];
    if (searchQuery) {
      base = base.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.categories.length > 0) {
      base = base.filter(p => filters.categories.includes(p.category));
    }
    if (filters.subcategories.length > 0) {
      base = base.filter(p => filters.subcategories.includes(p.subcategory));
    }
    const seen = new Set<string>();
    return base.map(p => p.brand).filter(b => { if (seen.has(b)) return false; seen.add(b); return true; }).sort();
  }, [products, searchQuery, filters.categories, filters.subcategories]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Subcategory filter
    if (filters.subcategories.length > 0) {
      filtered = filtered.filter(product =>
        filters.subcategories.includes(product.subcategory)
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product =>
        filters.brands.includes(product.brand)
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // On sale filter
    if (filters.onSale) {
      filtered = filtered.filter(product => product.isOnSale);
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [products, searchQuery, filters]);

  const handleFilterChange = (filterType: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleBrandChange = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      subcategories: [],
      brands: [],
      priceRange: [0, 100000],
      rating: 0,
      inStock: false,
      onSale: false,
      sortBy: 'name'
    });
    setSearchParams({});
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    }
  };

  const ProductCard: React.FC<{ product: any }> = ({ product }) => (
    <Link to={`/products/${product.id}`} className="group bg-white hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
      <div className="relative h-52 flex items-center justify-center overflow-hidden p-3 bg-white">
        <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300" />
        {product.isOnSale && (
          <span className="absolute top-2 left-2 bg-[#388e3c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{product.discountPercentage}% off</span>
        )}
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-[#ff6161] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1 border-t border-gray-100">
        <p className="text-sm text-gray-800 font-medium line-clamp-2 mb-1">{product.name}</p>
        <p className="text-xs text-gray-500 line-clamp-1 mb-2">{product.brand}</p>
        <div className="flex items-center gap-1.5 mb-2">
          <span className="bg-[#388e3c] text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5 font-semibold">
            {product.rating > 0 ? product.rating.toFixed(1) : '4.0'} ★
          </span>
          <span className="text-xs text-gray-400">({product.reviewCount || 0})</span>
          {product.inStock
            ? <span className="ml-auto text-xs text-[#388e3c] font-medium">In Stock</span>
            : <span className="ml-auto text-xs text-red-500 font-medium">Out of Stock</span>}
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-bold text-gray-900">Rs.{product.price.toLocaleString()}</span>
          {product.originalPrice && <span className="text-xs text-gray-400 line-through">Rs.{product.originalPrice.toLocaleString()}</span>}
          {product.isOnSale && <span className="text-xs text-[#388e3c] font-semibold">{product.discountPercentage}% off</span>}
        </div>
        <button
          onClick={e => { e.preventDefault(); addToCart(product, 1); }}
          disabled={!product.inStock}
          className="mt-auto w-full bg-[#ff9f00] hover:bg-[#f59000] disabled:bg-gray-200 disabled:text-gray-400 text-white text-xs font-bold py-2 rounded transition-colors"
        >
          ADD TO CART
        </button>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 py-3">
        <div className="flex flex-col lg:flex-row gap-3">

          {showFilters && (
            <button
              type="button"
              aria-label="Close filters"
              onClick={() => setShowFilters(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/50"
            />
          )}

          {/* ── LEFT FILTER SIDEBAR (Flipkart exact) ── */}
          <div className={`${showFilters ? 'fixed inset-y-0 left-0 z-50 bg-white overflow-y-auto' : 'hidden'} lg:block lg:static lg:z-auto w-full max-w-[320px] lg:w-64 flex-shrink-0`}>
            <div className="bg-white shadow-sm lg:sticky lg:top-[104px]">

              {/* Filters header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <FunnelIcon className="h-4 w-4 text-gray-700" />
                  <span className="font-bold text-gray-900 text-base">Filters</span>
                </div>
                {(filters.categories.length > 0 || filters.brands.length > 0 || filters.inStock || filters.onSale) && (
                  <button onClick={clearFilters} className="text-xs text-[#2874f0] font-semibold hover:underline">CLEAR ALL</button>
                )}
                <button onClick={() => setShowFilters(false)} className="lg:hidden ml-auto text-gray-500">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Category */}
              <div className="border-b border-gray-200">
                <div className="px-4 py-3">
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Category</p>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {categories.map(cat => (
                      <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(cat.id)}
                          onChange={() => handleCategoryChange(cat.id)}
                          className="w-3.5 h-3.5 accent-[#2874f0] cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-[#2874f0]">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="border-b border-gray-200">
                <div className="px-4 py-3">
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Price</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Under Rs.5,000', min: 0, max: 5000 },
                      { label: 'Rs.5,000 – Rs.20,000', min: 5000, max: 20000 },
                      { label: 'Rs.20,000 – Rs.50,000', min: 20000, max: 50000 },
                      { label: 'Rs.50,000 – Rs.1,00,000', min: 50000, max: 100000 },
                      { label: 'Rs.1,00,000 – Rs.2,00,000', min: 100000, max: 200000 },
                      { label: 'Above Rs.2,00,000', min: 200000, max: 999999 },
                    ].map(r => (
                      <label key={r.label} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.priceRange[0] === r.min && filters.priceRange[1] === r.max}
                          onChange={() => handleFilterChange('priceRange', [r.min, r.max])}
                          className="w-3.5 h-3.5 accent-[#2874f0] cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-[#2874f0]">{r.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Brand */}
              <div className="border-b border-gray-200">
                <div className="px-4 py-3">
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Brand</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {availableBrands.map(brand => (
                      <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="w-3.5 h-3.5 accent-[#2874f0] cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-[#2874f0]">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="border-b border-gray-200">
                <div className="px-4 py-3">
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Availability</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="checkbox" checked={filters.inStock} onChange={e => handleFilterChange('inStock', e.target.checked)} className="w-3.5 h-3.5 accent-[#2874f0]" />
                      <span className="text-sm text-gray-700 group-hover:text-[#2874f0]">In Stock</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="checkbox" checked={filters.onSale} onChange={e => handleFilterChange('onSale', e.target.checked)} className="w-3.5 h-3.5 accent-[#2874f0]" />
                      <span className="text-sm text-gray-700 group-hover:text-[#2874f0]">On Sale</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="px-4 py-3">
                <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Customer Ratings</p>
                <div className="space-y-2">
                  {[4, 3, 2].map(r => (
                    <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.rating === r}
                        onChange={() => handleFilterChange('rating', filters.rating === r ? 0 : r)}
                        className="w-3.5 h-3.5 accent-[#2874f0]"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-[#2874f0] flex items-center gap-1">
                        {r}★ & above
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Sort bar + Product Grid ── */}
          <div className="flex-1 min-w-0">

            {/* Sort bar (Flipkart exact) */}
            <div className="bg-white shadow-sm mb-0.5 px-4 py-2.5 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500 mr-1">Sort By</span>
              {[
                { key: 'name', label: 'Relevance' },
                { key: 'price_low', label: 'Price -- Low to High' },
                { key: 'price_high', label: 'Price -- High to Low' },
                { key: 'rating', label: 'Rating' },
                { key: 'newest', label: 'Newest First' },
              ].map(s => (
                <button
                  key={s.key}
                  onClick={() => handleFilterChange('sortBy', s.key)}
                  className={`text-sm px-3 py-1.5 border-b-2 transition-colors whitespace-nowrap ${
                    filters.sortBy === s.key
                      ? 'border-[#2874f0] text-[#2874f0] font-semibold'
                      : 'border-transparent text-gray-600 hover:text-[#2874f0]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
              <button onClick={() => setShowFilters(true)} className="lg:hidden ml-auto flex items-center gap-1 text-sm text-gray-600 border border-gray-300 px-3 py-1.5 rounded">
                <AdjustmentsHorizontalIcon className="h-4 w-4" /> Filter
              </button>
              <span className="ml-auto text-xs text-gray-400 hidden lg:block">{filteredProducts.length} results</span>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white shadow-sm text-center py-20">
                <FunnelIcon className="h-16 w-16 mx-auto text-gray-200 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No results found</h3>
                <p className="text-gray-400 mb-6 text-sm">Try adjusting or clearing your filters</p>
                <button onClick={clearFilters} className="bg-[#2874f0] text-white px-8 py-2.5 rounded text-sm font-bold hover:bg-[#1a65de]">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 bg-white shadow-sm">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
