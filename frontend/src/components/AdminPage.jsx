import React, { useState } from 'react';
import { useProductsStore, INITIAL_PRODUCTS } from '../data/products';
import PageLoader from './PageLoader';

export default function AdminPage({ onNavigate }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Admin View State: 'list' | 'edit' | 'add'
  const [currentView, setCurrentView] = useState('list');
  const [editingProductId, setEditingProductId] = useState(null);

  // Live Products & Categories Store
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
  } = useProductsStore();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal States
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Toast State
  const [toastMessage, setToastMessage] = useState('');

  // Form State for Product Add / Edit (Supports Min 1, Max 5 Images)
  const initialFormState = {
    name: '',
    id: '',
    price: '',
    originalPrice: '',
    stock: '10',
    category: 'Polki & Kundan',
    subcategory: 'Necklaces',
    description: '',
    materials: '',
    care: '',
    image: '',
    images: [],
    specs: {
      Gold: '',
      Polki: '',
      'Colour stones': '',
      Pearls: '',
      Size: '18"',
    },
  };
  const [formData, setFormData] = useState(initialFormState);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Rajat@Ghadsiram';

    if (passwordInput === correctPassword) {
      setAuthError('');
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsAuthenticated(true);
      }, 2000);
    } else {
      setAuthError('Invalid Admin Password. Access Denied.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Number(val) || 0);

  // Navigate to Dedicated Add Product Page
  const handleOpenAddPage = () => {
    setEditingProductId(null);
    const defaultImg = INITIAL_PRODUCTS[0].image;
    setFormData({
      ...initialFormState,
      subcategory: categories[0] || 'Necklaces',
      materials: 'Handcrafted in 24K gold finish with uncut polki diamonds, vivid meenakari enamel, and cultured pearls.',
      care: 'Store separately in the suede pouch provided. Avoid contact with perfume and lotions. Clean gently with a soft cloth.',
      image: defaultImg,
      images: [defaultImg],
    });
    setSelectedPreviewImage(defaultImg);
    setCurrentView('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Dedicated Edit Product Page
  const handleOpenEditPage = (prod) => {
    setEditingProductId(prod.id);
    const existingImages = prod.images && prod.images.length > 0 
      ? prod.images 
      : (prod.image ? [prod.image] : [INITIAL_PRODUCTS[0].image]);

    setFormData({
      name: prod.name || '',
      id: prod.id || '',
      price: prod.price || '',
      originalPrice: prod.originalPrice || '',
      stock: prod.stock || '10',
      category: prod.category || 'Polki & Kundan',
      subcategory: prod.subcategory || 'Necklaces',
      description: prod.description || '',
      materials: prod.materials || '',
      care: prod.care || '',
      image: existingImages[0] || '',
      images: existingImages.slice(0, 5),
      specs: {
        Gold: prod.specs?.Gold || '',
        Polki: prod.specs?.Polki || '',
        'Colour stones': prod.specs?.['Colour stones'] || prod.specs?.Stones || '',
        Pearls: prod.specs?.Pearls || '',
        Size: prod.specs?.Size || (prod.subcategory === 'Bracelets' ? 'Free Size (Adjustable)' : '18"'),
      },
    });
    setSelectedPreviewImage(existingImages[0] || '');
    setCurrentView('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Multi-Image Upload (Min 1, Max 5 Images Limit)
  const handleMultipleImagesUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const currentCount = (formData.images || []).length;
    const availableSlots = 5 - currentCount;

    if (availableSlots <= 0) {
      showToast('Maximum 5 images reached. Delete an image first.');
      return;
    }

    const filesToProcess = files.slice(0, availableSlots);
    const promises = filesToProcess.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((newBase64s) => {
      setFormData((prev) => {
        const merged = [...(prev.images || []), ...newBase64s].slice(0, 5);
        return {
          ...prev,
          images: merged,
          image: merged[0] || prev.image,
        };
      });
      setSelectedPreviewImage(newBase64s[0] || formData.images[0]);
      showToast(`Added ${filesToProcess.length} image(s). (${Math.min(5, currentCount + filesToProcess.length)}/5)`);
    });
  };

  // Set Cover / Primary Image
  const handleSetCover = (index) => {
    setFormData((prev) => {
      const list = [...(prev.images || [])];
      const [selected] = list.splice(index, 1);
      list.unshift(selected);
      return {
        ...prev,
        images: list,
        image: list[0],
      };
    });
    setSelectedPreviewImage(formData.images[index]);
    showToast('Cover / Primary image updated!');
  };

  // Delete Individual Image from Gallery
  const handleDeleteImage = (index) => {
    if ((formData.images || []).length <= 1) {
      showToast('At least 1 image is required for a product.');
      return;
    }
    setFormData((prev) => {
      const list = (prev.images || []).filter((_, i) => i !== index);
      return {
        ...prev,
        images: list,
        image: list[0] || '',
      };
    });
    setSelectedPreviewImage(formData.images[0]);
    showToast('Image removed from gallery.');
  };

  // Save Product (Create or Update)
  const handleSaveProduct = (e) => {
    if (e) e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      alert('Please fill product name and selling price.');
      return;
    }

    const slugId =
      formData.id.trim() ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const cleanSpecs = {};
    if (formData.specs.Gold) cleanSpecs['Gold'] = formData.specs.Gold;
    if (formData.specs.Polki) cleanSpecs['Polki'] = formData.specs.Polki;
    if (formData.specs['Colour stones']) cleanSpecs['Colour stones'] = formData.specs['Colour stones'];
    if (formData.specs.Pearls) cleanSpecs['Pearls'] = formData.specs.Pearls;
    if (formData.specs.Size) cleanSpecs['Size'] = formData.specs.Size;

    const finalImages = (formData.images && formData.images.length > 0)
      ? formData.images.slice(0, 5)
      : (formData.image ? [formData.image] : [INITIAL_PRODUCTS[0].image]);

    const productPayload = {
      id: slugId,
      name: formData.name.trim(),
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      stock: Number(formData.stock) || 10,
      category: formData.category || 'Polki & Kundan',
      subcategory: formData.subcategory || 'Necklaces',
      description:
        formData.description ||
        `Exquisite handcrafted ${formData.name} in fine gold and gemstones.`,
      materials: formData.materials || '',
      care: formData.care || '',
      image: finalImages[0],
      images: finalImages,
      specs: cleanSpecs,
    };

    if (currentView === 'edit') {
      updateProduct(productPayload);
      showToast(`Product "${productPayload.name}" updated successfully!`);
    } else {
      addProduct(productPayload);
      showToast(`Product "${productPayload.name}" added to catalog!`);
    }

    setCurrentView('list');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Product Action
  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      showToast(`Product "${productToDelete.name}" deleted from catalog.`);
      setProductToDelete(null);
      setIsDeleteConfirmOpen(false);
    }
  };

  // Add New Category Action
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      showToast(`Category "${newCategoryName.trim()}" added!`);
      setNewCategoryName('');
      setIsAddCategoryOpen(false);
    }
  };

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subcategory || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (categoryFilter === 'All') return matchesSearch;
    return matchesSearch && (p.subcategory || '').toLowerCase() === categoryFilter.toLowerCase();
  });

  const totalCatalogValue = products.reduce(
    (acc, p) => acc + (Number(p.price) || 0) * (Number(p.stock) || 10),
    0
  );

  // 1. Password Lock Gate (Prompted on reload/initial entry)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0806] text-[#FAF4EE] flex items-center justify-center p-4 font-sans selection:bg-[#C9AA6B]/30 selection:text-[#FAF4EE] relative overflow-hidden">
        <PageLoader isVisible={isLoading} />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C9AA6B]/5 rounded-full blur-[140px] pointer-events-none" />

        <div
          className={`w-full max-w-[430px] p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#16120F] to-[#0E0B09] border border-[#2E231A] shadow-2xl relative z-10 transition-transform ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#1F1914] border border-[#C9AA6B]/30 flex items-center justify-center shadow-inner">
              <svg className="w-6 h-6 text-[#C9AA6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <p className="font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-[#C9AA6B] uppercase mb-1">
              Admin Portal
            </p>
            <h1 className="font-cormorant text-2xl sm:text-3xl text-[#FAF4EE] m-0 font-light tracking-wide">
              Ghadsiram Banwarilal
            </h1>
            <p className="text-xs text-[#8A7968] font-light mt-1">
              Enter admin password to access control panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (authError) setAuthError('');
                }}
                placeholder="Enter Admin Password"
                autoFocus
                className="w-full px-4 py-3.5 pr-11 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-sm text-[#FAF4EE] placeholder-[#665545] outline-none focus:border-[#C9AA6B] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A6A58] hover:text-[#C9AA6B] transition-colors bg-transparent border-none cursor-pointer p-0 text-xs"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {authError && (
              <p className="text-xs text-[#E57373] bg-[#E57373]/10 border border-[#E57373]/20 py-2 px-3 rounded-lg m-0 text-center font-light">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#C9AA6B] hover:bg-[#d8bc7e] text-[#0D0A08] text-xs font-semibold uppercase tracking-[0.16em] transition-all cursor-pointer shadow-md mt-1"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('home')}
              className="text-xs text-[#8A7968] hover:text-[#C9AA6B] transition-colors bg-transparent border-none cursor-pointer tracking-wider"
            >
              ← Back to Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: DEDICATED FULL EDIT / ADD PRODUCT PAGE (With Multi-Image Gallery Max 5)
  // =========================================================================
  if (currentView === 'edit' || currentView === 'add') {
    const isEditMode = currentView === 'edit';
    const galleryImages = formData.images || [];

    return (
      <div className="min-h-screen bg-[#0D0A08] text-[#FAF4EE] font-sans selection:bg-[#C9AA6B]/30 selection:text-[#FAF4EE] flex flex-col justify-between">
        <PageLoader isVisible={isLoading} />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl bg-[#1C1612] border border-[#C9AA6B] text-[#FAF4EE] text-xs shadow-2xl flex items-center gap-2.5 animate-fade-in">
            <span className="text-[#C9AA6B] font-bold">✓</span>
            <span>{toastMessage}</span>
          </div>
        )}

        <div>
          {/* Top Sticky Action Header */}
          <header className="border-b border-[#2E231A] bg-[#140F0C]/90 backdrop-blur-md sticky top-0 z-40 px-6 sm:px-10 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setCurrentView('list')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#2E231A] text-xs text-[#D9C8B4] hover:text-[#C9AA6B] hover:border-[#C9AA6B]/50 bg-[#0D0A08] transition-colors cursor-pointer"
              >
                <span>←</span>
                <span>Back to Products</span>
              </button>
              <div className="hidden sm:block w-[1px] h-5 bg-[#2E231A]" />
              <div>
                <h1 className="text-sm sm:text-base font-semibold text-[#FAF4EE] m-0 tracking-wide">
                  {isEditMode ? `Edit Product: ${formData.name || 'Untitled Piece'}` : 'Add New Royal Piece to Catalog'}
                </h1>
                <p className="text-[0.7rem] text-[#8A7968] m-0 font-light">
                  {isEditMode ? `ID: ${formData.id} • Live Catalog Sync` : 'Create and publish directly to live storefront'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentView('list')}
                className="px-4 py-2 rounded-xl border border-[#2E231A] text-xs text-[#8A7968] hover:text-[#FAF4EE] bg-transparent cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProduct}
                className="px-5 py-2 rounded-xl bg-[#C9AA6B] hover:bg-[#d8bc7e] text-[#0D0A08] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                {isEditMode ? 'Save & Update' : 'Publish Product'}
              </button>
            </div>
          </header>

          {/* Main Full Page Form */}
          <main className="max-w-[1280px] mx-auto px-5 sm:px-8 py-8">
            <form onSubmit={handleSaveProduct} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* LEFT COLUMN: PRODUCT SPECIFICATIONS & DETAILS (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Section 1: Basic Information */}
                <div className="p-6 sm:p-7 rounded-3xl bg-[#140F0C] border border-[#2E231A]">
                  <h2 className="font-cormorant text-xl text-[#FAF4EE] m-0 mb-4 font-light tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C9AA6B]" />
                    General Information
                  </h2>

                  <div className="flex flex-col gap-4">
                    {/* Product Name */}
                    <div>
                      <label className="block text-[#C9AA6B] uppercase tracking-wider text-[0.68rem] font-semibold mb-1.5">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Royal Chandrika Necklace"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-sm text-[#FAF4EE] outline-none focus:border-[#C9AA6B]"
                      />
                    </div>

                    {/* Slug & Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#8A7968] uppercase tracking-wider text-[0.68rem] font-semibold mb-1.5">
                          Product Slug / Unique ID
                        </label>
                        <input
                          type="text"
                          value={formData.id}
                          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                          placeholder="auto-generated-from-name"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs font-mono text-[#D9C8B4] outline-none focus:border-[#C9AA6B]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#C9AA6B] uppercase tracking-wider text-[0.68rem] font-semibold mb-1.5">
                          Category *
                        </label>
                        <div className="relative">
                          <select
                            value={formData.subcategory}
                            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                            className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs text-[#FAF4EE] outline-none focus:border-[#C9AA6B] cursor-pointer"
                          >
                            {categories.map((cat) => (
                              <option key={cat} value={cat} className="bg-[#140F0C] text-[#FAF4EE]">
                                {cat}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#C9AA6B]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Stock */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div>
                        <label className="block text-[#C9AA6B] uppercase tracking-wider text-[0.68rem] font-semibold mb-1.5">
                          Selling Price (₹ INR) *
                        </label>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="65000"
                          required
                          className="w-full px-4 py-2.5 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs text-[#FAF4EE] outline-none focus:border-[#C9AA6B]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#8A7968] uppercase tracking-wider text-[0.68rem] font-semibold mb-1.5">
                          Original / MRP Price (₹)
                        </label>
                        <input
                          type="number"
                          value={formData.originalPrice}
                          onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                          placeholder="85000"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs text-[#FAF4EE] outline-none focus:border-[#C9AA6B]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#C9AA6B] uppercase tracking-wider text-[0.68rem] font-semibold mb-1.5">
                          Vault Stock Count
                        </label>
                        <input
                          type="number"
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                          placeholder="10"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs text-[#FAF4EE] outline-none focus:border-[#C9AA6B]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Jewellery Craft Specifications */}
                <div className="p-6 sm:p-7 rounded-3xl bg-[#140F0C] border border-[#2E231A]">
                  <h2 className="font-cormorant text-xl text-[#FAF4EE] m-0 mb-4 font-light tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C9AA6B]" />
                    Jewellery Craft Specifications
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <span className="block text-[0.68rem] text-[#8A7968] uppercase tracking-wider font-semibold mb-1">
                        Gold Weight
                      </span>
                      <input
                        type="text"
                        value={formData.specs.Gold}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specs: { ...formData.specs, Gold: e.target.value },
                          })
                        }
                        placeholder="2.5 gram (approx)"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs text-[#FAF4EE] outline-none focus:border-[#C9AA6B]"
                      />
                    </div>

                    <div>
                      <span className="block text-[0.68rem] text-[#8A7968] uppercase tracking-wider font-semibold mb-1">
                        Polki Diamonds
                      </span>
                      <input
                        type="text"
                        value={formData.specs.Polki}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specs: { ...formData.specs, Polki: e.target.value },
                          })
                        }
                        placeholder="3.5 carats"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs text-[#FAF4EE] outline-none focus:border-[#C9AA6B]"
                      />
                    </div>

                    <div>
                      <span className="block text-[0.68rem] text-[#8A7968] uppercase tracking-wider font-semibold mb-1">
                        Colour Gemstones
                      </span>
                      <input
                        type="text"
                        value={formData.specs['Colour stones']}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specs: { ...formData.specs, 'Colour stones': e.target.value },
                          })
                        }
                        placeholder="35 carats"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs text-[#FAF4EE] outline-none focus:border-[#C9AA6B]"
                      />
                    </div>

                    <div>
                      <span className="block text-[0.68rem] text-[#8A7968] uppercase tracking-wider font-semibold mb-1">
                        Pearls
                      </span>
                      <input
                        type="text"
                        value={formData.specs.Pearls}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specs: { ...formData.specs, Pearls: e.target.value },
                          })
                        }
                        placeholder="25 carats"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs text-[#FAF4EE] outline-none focus:border-[#C9AA6B]"
                      />
                    </div>

                    {/* Size / Length Dropdown with Custom Gold Arrow */}
                    <div className="sm:col-span-2">
                      <span className="block text-[0.68rem] text-[#8A7968] uppercase tracking-wider font-semibold mb-1">
                        Size / Length
                      </span>
                      <div className="relative">
                        <select
                          value={formData.specs.Size}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              specs: { ...formData.specs, Size: e.target.value },
                            })
                          }
                          className="w-full appearance-none px-3.5 py-2 pr-10 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs text-[#FAF4EE] outline-none cursor-pointer focus:border-[#C9AA6B]"
                        >
                          <option value='14"' className="bg-[#140F0C]">14" (Choker Length)</option>
                          <option value='16"' className="bg-[#140F0C]">16" (Princess Length)</option>
                          <option value='18"' className="bg-[#140F0C]">18" (Standard Matinee Length)</option>
                          <option value='20"' className="bg-[#140F0C]">20" (Matinee Length)</option>
                          <option value='22"' className="bg-[#140F0C]">22" (Opera Length)</option>
                          <option value='24"' className="bg-[#140F0C]">24" (Rope Length)</option>
                          <option value="6.0" className="bg-[#140F0C]">6.0" (Small Wrist)</option>
                          <option value="6.5" className="bg-[#140F0C]">6.5" (Standard Wrist)</option>
                          <option value="7.0" className="bg-[#140F0C]">7.0" (Medium Wrist)</option>
                          <option value="7.5" className="bg-[#140F0C]">7.5" (Large Wrist)</option>
                          <option value="8.0" className="bg-[#140F0C]">8.0" (X-Large Wrist)</option>
                          <option value="Free Size (Adjustable)" className="bg-[#140F0C]">Free Size (Adjustable Dori)</option>
                          <option value="Standard / One Size" className="bg-[#140F0C]">Standard / One Size</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#C9AA6B]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Materials, Care & Description */}
                <div className="p-6 sm:p-7 rounded-3xl bg-[#140F0C] border border-[#2E231A]">
                  <h2 className="font-cormorant text-xl text-[#FAF4EE] m-0 mb-4 font-light tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C9AA6B]" />
                    Materials, Care &amp; Story
                  </h2>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-[#C9AA6B] uppercase tracking-wider text-[0.68rem] font-semibold mb-1.5">
                        Materials &amp; Craft Details
                      </label>
                      <textarea
                        rows="2"
                        value={formData.materials}
                        onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                        placeholder="e.g. Handcrafted in 24K gold finish with uncut polki diamonds, vivid meenakari enamel, and cultured pearls."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs text-[#FAF4EE] outline-none focus:border-[#C9AA6B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#C9AA6B] uppercase tracking-wider text-[0.68rem] font-semibold mb-1.5">
                        Care Instructions
                      </label>
                      <textarea
                        rows="2"
                        value={formData.care}
                        onChange={(e) => setFormData({ ...formData, care: e.target.value })}
                        placeholder="e.g. Store separately in the suede pouch provided. Avoid contact with perfume and lotions. Clean gently with a soft cloth."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs text-[#FAF4EE] outline-none focus:border-[#C9AA6B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#C9AA6B] uppercase tracking-wider text-[0.68rem] font-semibold mb-1.5">
                        Product Story &amp; Description
                      </label>
                      <textarea
                        rows="3"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the craft, gemstones, and heritage of this piece..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs text-[#FAF4EE] outline-none focus:border-[#C9AA6B]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: MULTI-IMAGE GALLERY (MIN 1, MAX 5) & LIVE PREVIEW (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Product Multi-Image Gallery Manager */}
                <div className="p-6 rounded-3xl bg-[#140F0C] border border-[#2E231A]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-cormorant text-lg text-[#FAF4EE] m-0 font-light">
                      Product Gallery ({galleryImages.length}/5 Images)
                    </h3>
                    <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-[#C9AA6B]/15 text-[#C9AA6B] font-medium">
                      Min 1 • Max 5
                    </span>
                  </div>

                  {/* Main Active Selected Preview */}
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#0D0A08] border border-[#2E231A] flex items-center justify-center relative mb-4 shadow-inner">
                    {selectedPreviewImage || galleryImages[0] ? (
                      <img
                        src={selectedPreviewImage || galleryImages[0]}
                        alt="Active Preview"
                        className="w-full h-full object-cover transition-all"
                      />
                    ) : (
                      <span className="text-xs text-[#7A6A58]">No Image Selected</span>
                    )}

                    <div className="absolute top-3 left-3 bg-[#0D0A08]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#2E231A] text-[0.65rem] text-[#C9AA6B] font-semibold">
                      {(selectedPreviewImage || galleryImages[0]) === galleryImages[0] ? 'Cover Image' : 'Gallery Angle'}
                    </div>
                  </div>

                  {/* Thumbnail Row & Management */}
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-5 gap-2">
                      {galleryImages.map((img, idx) => {
                        const isCover = idx === 0;
                        const isSelected = (selectedPreviewImage || galleryImages[0]) === img;

                        return (
                          <div
                            key={idx}
                            className={`relative aspect-square rounded-xl overflow-hidden bg-[#0D0A08] border-2 group transition-all ${
                              isSelected ? 'border-[#C9AA6B]' : 'border-[#2E231A] opacity-75 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Angle ${idx + 1}`}
                              onClick={() => setSelectedPreviewImage(img)}
                              className="w-full h-full object-cover cursor-pointer"
                            />

                            {/* Cover Badge */}
                            {isCover && (
                              <div className="absolute bottom-0 inset-x-0 bg-[#C9AA6B] text-[#0D0A08] text-[0.55rem] font-bold text-center py-0.5 uppercase tracking-wider">
                                Cover
                              </div>
                            )}

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(idx)}
                              title="Delete photo"
                              className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#0D0A08]/90 text-[#E57373] hover:bg-[#E57373] hover:text-white flex items-center justify-center text-[0.6rem] font-bold border border-[#E57373]/40 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ✕
                            </button>

                            {/* Make Cover Button */}
                            {!isCover && (
                              <button
                                type="button"
                                onClick={() => handleSetCover(idx)}
                                title="Set as Cover photo"
                                className="absolute bottom-1 inset-x-1 bg-[#140F0C]/90 hover:bg-[#C9AA6B] text-[#C9AA6B] hover:text-[#0D0A08] text-[0.55rem] font-semibold py-0.5 rounded border border-[#C9AA6B]/40 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity text-center truncate"
                              >
                                Set Cover
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Upload Controls */}
                    {galleryImages.length < 5 ? (
                      <div className="mt-1">
                        <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-dashed border-[#C9AA6B]/50 hover:border-[#C9AA6B] bg-[#1F1812]/50 hover:bg-[#1F1812] text-xs text-[#C9AA6B] font-medium transition-colors cursor-pointer text-center">
                          <span>+ Upload Images ({galleryImages.length}/5)</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleMultipleImagesUpload}
                            className="hidden"
                          />
                        </label>
                        <span className="block text-[0.65rem] text-[#7A6A58] text-center mt-1.5">
                          Select up to {5 - galleryImages.length} more angle(s). Click thumbnail to preview or set cover.
                        </span>
                      </div>
                    ) : (
                      <div className="py-2 px-3 rounded-xl bg-[#C9AA6B]/10 border border-[#C9AA6B]/30 text-center text-[0.68rem] text-[#C9AA6B]">
                        ✓ Maximum 5 gallery photos reached
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Card Snapshot */}
                <div className="p-5 rounded-3xl bg-[#140F0C]/60 border border-[#2E231A]">
                  <span className="text-[0.68rem] text-[#8A7968] uppercase tracking-wider font-semibold block mb-2">
                    Storefront Snapshot Preview
                  </span>
                  <div className="p-3.5 rounded-2xl bg-[#0D0A08] border border-[#2E231A]">
                    <div className="text-[0.65rem] text-[#C9AA6B] font-semibold uppercase tracking-wider mb-1">
                      {formData.subcategory}
                    </div>
                    <div className="font-serif font-bold text-sm text-[#FAF4EE] mb-1 truncate">
                      {formData.name || 'Product Title'}
                    </div>
                    <div className="text-xs text-[#C9AA6B] font-medium">
                      {formatCurrency(formData.price || 0)}
                      {formData.originalPrice && (
                        <span className="ml-2 text-[0.68rem] text-[#7A6A58] line-through">
                          {formatCurrency(formData.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Final Action Box */}
                <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1F1812] to-[#140F0C] border border-[#C9AA6B]/30 flex flex-col gap-3 shadow-xl">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#C9AA6B] hover:bg-[#d8bc7e] text-[#0D0A08] font-semibold uppercase tracking-wider text-xs transition-all cursor-pointer shadow-md"
                  >
                    {isEditMode ? '✓ Save & Update Product' : '✓ Publish Product to Store'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentView('list')}
                    className="w-full py-2.5 rounded-xl border border-[#2E231A] text-xs text-[#8A7968] hover:text-[#FAF4EE] bg-transparent cursor-pointer transition-colors"
                  >
                    Discard Changes
                  </button>
                </div>
              </div>
            </form>
          </main>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#2E231A] py-4 px-6 text-center text-xs text-[#5A4C3D] font-light">
          Ghadsiram Banwarilal &amp; Sons © 2026 • Product Catalog Control Center
        </footer>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: MAIN PRODUCTS TABLE LIST
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0D0A08] text-[#FAF4EE] font-sans selection:bg-[#C9AA6B]/30 selection:text-[#FAF4EE] flex flex-col justify-between">
      <PageLoader isVisible={isLoading} />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl bg-[#1C1612] border border-[#C9AA6B] text-[#FAF4EE] text-xs shadow-2xl flex items-center gap-2.5 animate-fade-in">
          <span className="text-[#C9AA6B] font-bold">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        {/* Top Admin Header Bar */}
        <header className="border-b border-[#2E231A] bg-[#140F0C]/90 backdrop-blur-md sticky top-0 z-40 px-6 sm:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C9AA6B]/20 border border-[#C9AA6B]/40 flex items-center justify-center text-[#C9AA6B] font-bold text-xs">
              GB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-[#FAF4EE] m-0 tracking-wide">
                  Ghadsiram Admin Panel
                </h1>
                <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-[#81C784]/20 text-[#81C784] font-medium uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="text-[0.72rem] text-[#8A7968] m-0 font-light">
                Product Catalog &amp; Category Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleOpenAddPage}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C9AA6B] hover:bg-[#d8bc7e] text-[#0D0A08] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <span>+ Add Product</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#2E231A] text-xs text-[#D9C8B4] hover:text-[#FAF4EE] hover:border-[#C9AA6B]/50 transition-colors bg-transparent cursor-pointer"
            >
              <span>View Store</span>
              <span>↗</span>
            </button>
          </div>
        </header>

        {/* Main Content Dashboard */}
        <main className="max-w-[1340px] mx-auto px-5 sm:px-8 py-8">
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-[#140F0C] border border-[#2E231A]">
              <span className="text-[0.7rem] uppercase tracking-wider text-[#8A7968] font-semibold">
                Total Active Products
              </span>
              <p className="text-3xl font-cormorant font-light text-[#FAF4EE] mt-1 m-0">
                {products.length} Items
              </p>
              <span className="text-[0.72rem] text-[#C9AA6B] font-light">Live across storefront</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#140F0C] border border-[#2E231A]">
              <span className="text-[0.7rem] uppercase tracking-wider text-[#8A7968] font-semibold">
                Active Categories
              </span>
              <p className="text-3xl font-cormorant font-light text-[#FAF4EE] mt-1 m-0">
                {categories.length} Categories
              </p>
              <span className="text-[0.72rem] text-[#81C784] font-light">
                {categories.join(' & ')}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#140F0C] border border-[#2E231A]">
              <span className="text-[0.7rem] uppercase tracking-wider text-[#8A7968] font-semibold">
                Total Inventory Valuation
              </span>
              <p className="text-3xl font-cormorant font-light text-[#FAF4EE] mt-1 m-0">
                {formatCurrency(totalCatalogValue)}
              </p>
              <span className="text-[0.72rem] text-[#D9C8B4] font-light">Combined vault stock</span>
            </div>
          </div>

          {/* Search, Filter & Add Category Controls */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search Bar */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name, ID, or specifications..."
                className="px-4 py-2.5 rounded-xl bg-[#140F0C] border border-[#2E231A] text-xs text-[#FAF4EE] placeholder-[#665545] outline-none focus:border-[#C9AA6B] w-full sm:w-80"
              />

              {/* Add Category Button */}
              <button
                type="button"
                onClick={() => setIsAddCategoryOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#1F1812] border border-[#3A2E24] hover:border-[#C9AA6B] text-xs text-[#C9AA6B] font-medium transition-colors cursor-pointer shrink-0"
              >
                + New Category
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                type="button"
                onClick={() => setCategoryFilter('All')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer border shrink-0 ${
                  categoryFilter === 'All'
                    ? 'bg-[#C9AA6B] text-[#0D0A08] border-[#C9AA6B]'
                    : 'bg-[#140F0C] text-[#8A7968] border-[#2E231A] hover:text-[#D9C8B4]'
                }`}
              >
                All ({products.length})
              </button>

              {categories.map((cat) => {
                const count = products.filter(
                  (p) => (p.subcategory || '').toLowerCase() === cat.toLowerCase()
                ).length;

                return (
                  <div key={cat} className="flex items-center shrink-0">
                    <button
                      type="button"
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
                        categoryFilter.toLowerCase() === cat.toLowerCase()
                          ? 'bg-[#C9AA6B] text-[#0D0A08] border-[#C9AA6B]'
                          : 'bg-[#140F0C] text-[#8A7968] border-[#2E231A] hover:text-[#D9C8B4]'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#2E231A] bg-[#140F0C]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#2E231A] bg-[#191410] text-[#C9AA6B] uppercase tracking-wider text-[0.68rem]">
                  <th className="py-3.5 px-4 font-semibold">Image</th>
                  <th className="py-3.5 px-4 font-semibold">Title &amp; Slug</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Price</th>
                  <th className="py-3.5 px-4 font-semibold">Specifications</th>
                  <th className="py-3.5 px-4 font-semibold">Stock</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2E231A]/60 text-[#D9C8B4]">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-[#7A6A58]">
                      No products found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="w-12 h-14 rounded-lg overflow-hidden bg-[#0D0A08] border border-[#2E231A] flex items-center justify-center">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-serif font-bold text-sm text-[#FAF4EE] m-0">{prod.name}</p>
                        <span className="font-mono text-[0.68rem] text-[#7A6A58]">{prod.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-[#261E17] text-[#C9AA6B] text-[0.68rem] font-medium">
                          {prod.subcategory || prod.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-[#FAF4EE]">
                        {formatCurrency(prod.price)}
                        {prod.originalPrice && (
                          <span className="block text-[0.68rem] text-[#7A6A58] line-through">
                            {formatCurrency(prod.originalPrice)}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[0.72rem] text-[#A69584] leading-snug">
                        {prod.specs?.Gold && <div>Gold: {prod.specs.Gold}</div>}
                        {prod.specs?.Polki && <div>Polki: {prod.specs.Polki}</div>}
                        {prod.specs?.['Colour stones'] && <div>Stones: {prod.specs['Colour stones']}</div>}
                        {prod.specs?.Pearls && <div>Pearls: {prod.specs.Pearls}</div>}
                        {prod.specs?.Size && <div>Size: {prod.specs.Size}</div>}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#81C784]/15 text-[#81C784] text-[0.68rem] font-medium">
                          {prod.stock || 10} in stock
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditPage(prod)}
                            className="px-3 py-1.5 rounded-lg border border-[#3A2E24] hover:border-[#C9AA6B] text-xs text-[#C9AA6B] bg-[#140F0C] hover:bg-[#C9AA6B]/10 cursor-pointer transition-colors font-medium"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setProductToDelete(prod);
                              setIsDeleteConfirmOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg border border-[#3A2E24] hover:border-[#E57373] text-xs text-[#E57373] bg-[#140F0C] hover:bg-[#E57373]/10 cursor-pointer transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* MODAL: ADD CATEGORY */}
      {isAddCategoryOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[400px] rounded-3xl bg-[#140F0C] border border-[#2E231A] p-6 shadow-2xl animate-fade-in">
            <h3 className="font-cormorant text-xl text-[#FAF4EE] m-0 mb-3 font-light">
              Add New Category
            </h3>
            <p className="text-xs text-[#8A7968] mb-4">
              Enter the name of the new jewellery category.
            </p>
            <form onSubmit={handleAddCategory} className="flex flex-col gap-3">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category Name"
                autoFocus
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D0A08] border border-[#2E231A] text-xs text-[#FAF4EE] outline-none focus:border-[#C9AA6B]"
              />
              <div className="flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsAddCategoryOpen(false)}
                  className="px-3 py-1.5 rounded-xl border border-[#2E231A] text-xs text-[#8A7968] bg-transparent cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#C9AA6B] text-[#0D0A08] text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE CONFIRMATION */}
      {isDeleteConfirmOpen && productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[420px] rounded-3xl bg-[#140F0C] border border-[#2E231A] p-6 text-center shadow-2xl animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#E57373]/10 border border-[#E57373]/30 text-[#E57373] flex items-center justify-center mx-auto mb-3 text-lg font-bold">
              !
            </div>
            <h3 className="text-sm font-semibold text-[#FAF4EE] m-0 mb-1">
              Delete Product from Catalog?
            </h3>
            <p className="text-xs text-[#8A7968] m-0 mb-5 leading-relaxed">
              Are you sure you want to remove <strong className="text-[#FAF4EE]">"{productToDelete.name}"</strong>? It will immediately disappear from the live store.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setProductToDelete(null);
                  setIsDeleteConfirmOpen(false);
                }}
                className="px-4 py-2 rounded-xl border border-[#2E231A] text-xs text-[#D9C8B4] bg-transparent cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-[#E57373] hover:bg-[#ef5350] text-[#0D0A08] text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#2E231A] py-4 px-6 text-center text-xs text-[#5A4C3D] font-light">
        Ghadsiram Banwarilal &amp; Sons © 2026 • Product Catalog Control Center
      </footer>
    </div>
  );
}
