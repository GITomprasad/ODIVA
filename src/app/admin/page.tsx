"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Check,
  Search,
  Filter,
  Eye,
  RefreshCw,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { dataStore } from "@/lib/store";
import { PRODUCTS } from "@/data/products";
import { Product, Order, OrderStatus } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { user, isAdmin, login } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders">("overview");
  const [productSearch, setProductSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // State for products and orders
  const [productsList, setProductsList] = useState<Product[]>(dataStore.getProducts());
  const [ordersList, setOrdersList] = useState<Order[]>(dataStore.getOrders());

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Form inputs for new product
  const [newProdName, setNewProdName] = useState("");
  const [newProdOdiaName, setNewProdOdiaName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("rice-grains");
  const [newProdPrice, setNewProdPrice] = useState(80);
  const [newProdStock, setNewProdStock] = useState(50);
  const [newProdPack, setNewProdPack] = useState("1 kg");
  const [newProdImage, setNewProdImage] = useState("");
  const [newProdDistrict, setNewProdDistrict] = useState("Khordha");

  // If not logged in as admin, show secure login prompt with one-click admin sign-in
  if (!user || user.role !== "admin") {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-odiva-dark">ODIVA Admin Portal</h1>
        <p className="text-xs text-gray-500">
          This area is restricted to authorized fulfillment and store managers in Odisha.
        </p>
        <button
          onClick={() => login("admin@odiva.in", "admin", "ODIVA Head Admin (BBSR)")}
          className="px-6 py-3 bg-odiva-forest hover:bg-emerald-800 text-white rounded-full text-xs font-bold shadow-md transition"
        >
          Sign In as Verified Admin (Bhubaneswar Hub)
        </button>
      </div>
    );
  }

  // Dashboard Metrics
  const totalSales = ordersList.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = ordersList.filter((o) => o.status === "pending" || o.status === "confirmed").length;
  const lowStockCount = productsList.filter((p) => p.stock < 25).length;

  // Handle Order Status Update
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = dataStore.updateOrderStatus(orderId, newStatus);
    if (updated) {
      setOrdersList([...dataStore.getOrders()]);
    }
  };

  // Handle Product Save / Update
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      dataStore.updateProduct(editingProduct.id, editingProduct);
      setProductsList([...dataStore.getProducts()]);
      setEditingProduct(null);
    }
  };

  // Handle Add Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const added = dataStore.addProduct({
      id: `odiva-${Date.now()}`,
      name: newProdName,
      odiaName: newProdOdiaName || newProdName,
      slug: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: newProdCategory as any,
      description: "Fresh authentic Odia staple harvested and packaged under ODIVA quality seals.",
      price: Number(newProdPrice),
      packSize: newProdPack,
      stock: Number(newProdStock),
      isAvailable: true,
      imageUrl:
        newProdImage ||
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
      rating: 5.0,
      reviewCount: 0,
      districtOrigin: newProdDistrict,
    });

    setProductsList([...dataStore.getProducts()]);
    setIsAddProductOpen(false);
    setNewProdName("");
    setNewProdOdiaName("");
  };

  // Filtered Products
  const filteredProducts = productsList.filter((p) => {
    const q = productSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.odiaName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-odiva-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-black text-odiva-dark tracking-tight">
              ODIVA Operations Console
            </h1>
            <span className="bg-odiva-turmeric text-odiva-dark px-2 py-0.5 rounded text-[10px] font-black uppercase">
              Bhubaneswar Control Hub
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Real-time inventory, live delivery fleet tracking & product catalogue manager
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-odiva-cream p-1.5 rounded-2xl border border-odiva-border text-xs font-bold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === "overview"
                ? "bg-odiva-forest text-white shadow-2xs"
                : "text-gray-600 hover:text-odiva-forest"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === "products"
                ? "bg-odiva-forest text-white shadow-2xs"
                : "text-gray-600 hover:text-odiva-forest"
            }`}
          >
            Products ({productsList.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === "orders"
                ? "bg-odiva-forest text-white shadow-2xs"
                : "text-gray-600 hover:text-odiva-forest"
            }`}
          >
            Orders ({ordersList.length})
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: OVERVIEW METRICS */}
      {/* ========================================================= */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-5 border border-odiva-border shadow-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Total Revenue
              </span>
              <span className="text-2xl font-black text-odiva-forest mt-1 block">
                {formatPrice(totalSales)}
              </span>
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+18.4% this week</span>
              </span>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-odiva-border shadow-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Total Orders Placed
              </span>
              <span className="text-2xl font-black text-odiva-dark mt-1 block">
                {ordersList.length}
              </span>
              <span className="text-[11px] text-odiva-orange font-bold mt-1 block">
                {pendingOrders} awaiting fulfillment
              </span>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-odiva-border shadow-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Active Catalogue Items
              </span>
              <span className="text-2xl font-black text-odiva-dark mt-1 block">
                {productsList.length}
              </span>
              <span className="text-[11px] text-gray-500 font-medium mt-1 block">
                Across 8 grocery categories
              </span>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-odiva-border shadow-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Low Stock Alerts (&lt;25)
              </span>
              <span className="text-2xl font-black text-red-600 mt-1 block">
                {lowStockCount}
              </span>
              <span className="text-[11px] text-red-500 font-bold mt-1 block">
                Auto-replenishing from farms
              </span>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white rounded-3xl p-6 border border-odiva-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-lg text-odiva-dark">Recent Customer Orders</h2>
              <button
                onClick={() => setActiveTab("orders")}
                className="text-xs font-bold text-odiva-forest hover:underline"
              >
                Manage All Orders →
              </button>
            </div>

            <div className="space-y-3">
              {ordersList.slice(0, 4).map((order) => (
                <div
                  key={order.id}
                  className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-black text-sm text-odiva-dark block">
                      {order.orderNumber} • {order.customerName}
                    </span>
                    <span className="text-gray-500">
                      📍 {order.shippingAddress.city} • {order.items.length} items •{" "}
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm text-odiva-forest">
                      {formatPrice(order.total)}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-odiva-cream text-odiva-forest">
                      {order.status.replace(/_/g, " ")}
                    </span>
                    <Link
                      href={`/orders/${order.orderNumber}`}
                      className="px-3 py-1 bg-white border border-gray-200 hover:border-odiva-forest text-odiva-dark rounded-xl font-bold text-xs"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: PRODUCT MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === "products" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by English or Odia name..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:border-odiva-forest"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-4 py-2 bg-odiva-forest text-white rounded-xl font-bold text-xs shadow-xs hover:bg-emerald-800 transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-3xl border border-odiva-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 uppercase text-[10px] font-extrabold tracking-wider">
                  <tr>
                    <th className="p-4">Product Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Origin District</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-odiva-cream/30 transition">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-10 h-10 rounded-xl object-cover border bg-gray-50 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-gray-900 block truncate">{p.name}</span>
                          <span className="text-[11px] text-odiva-orange font-semibold block truncate">
                            {p.odiaName}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                          {p.category.replace("-", " ")}
                        </span>
                      </td>

                      <td className="p-4 font-black text-odiva-forest">
                        {formatPrice(p.price)}
                      </td>

                      <td className="p-4">
                        <span
                          className={`font-bold text-xs ${
                            p.stock < 25 ? "text-red-600" : "text-emerald-700"
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>

                      <td className="p-4 font-medium text-gray-600">
                        {p.districtOrigin ? `📍 ${p.districtOrigin}` : "—"}
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 text-gray-500 hover:text-odiva-forest rounded-lg hover:bg-gray-100 transition"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: ORDER MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-lg text-odiva-dark">All Customer Orders</h2>
            <button
              onClick={() => setOrdersList([...dataStore.getOrders()])}
              className="text-xs font-bold text-odiva-forest flex items-center gap-1 hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="space-y-4">
            {ordersList.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-6 border border-odiva-border shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-odiva-dark">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">
                        • {order.customerName} ({order.customerPhone})
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400">
                      Address: {order.shippingAddress.street}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-black text-base text-odiva-forest">
                      {formatPrice(order.total)}
                    </span>

                    {/* Change Status Dropdown */}
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                      }
                      className="px-3 py-1 bg-odiva-cream border border-odiva-border text-odiva-forest rounded-xl font-bold text-xs outline-none cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="packed">Packed</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-2"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div className="truncate">
                        <span className="font-bold text-gray-800 truncate block">
                          {item.productName}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {item.quantity} × {formatPrice(item.unitPrice)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setEditingProduct(null)}
          />

          <form
            onSubmit={handleSaveProduct}
            className="relative bg-white rounded-3xl p-6 shadow-2xl max-w-lg w-full z-10 space-y-4 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-black text-base">Edit Product: {editingProduct.name}</h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Stock Units</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Pack Size</label>
                <input
                  type="text"
                  value={editingProduct.packSize}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, packSize: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Discount %</label>
                <input
                  type="number"
                  value={editingProduct.discountPercent || 0}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      discountPercent: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-odiva-forest text-white rounded-xl text-xs font-bold shadow hover:bg-emerald-800 transition"
            >
              Save Product Updates
            </button>
          </form>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsAddProductOpen(false)}
          />

          <form
            onSubmit={handleCreateProduct}
            className="relative bg-white rounded-3xl p-6 shadow-2xl max-w-lg w-full z-10 space-y-4 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-black text-base">Add New Catalogue Item</h3>
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Product Name (English)</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Sambalpur Black Rice"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Odia Unicode Name</label>
                <input
                  type="text"
                  value={newProdOdiaName}
                  onChange={(e) => setNewProdOdiaName(e.target.value)}
                  placeholder="e.g. ସମ୍ବଲପୁରୀ କଳା ଚାଉଳ"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Pack Size</label>
                  <input
                    type="text"
                    required
                    value={newProdPack}
                    onChange={(e) => setNewProdPack(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Origin District</label>
                <input
                  type="text"
                  value={newProdDistrict}
                  onChange={(e) => setNewProdDistrict(e.target.value)}
                  placeholder="e.g. Sambalpur"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-odiva-forest text-white rounded-xl text-xs font-bold shadow hover:bg-emerald-800 transition"
            >
              Publish to Store
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
