# ODIVA (ଓଡ଼ିଭା) – Complete Full-Stack Odisha Grocery E-Commerce Platform

> **Brand tagline: Your Odisha. Your Taste. Your Store.**

ODIVA is a production-grade, full-stack grocery e-commerce and quick-commerce platform celebrating Odisha's culinary culture, local farmers, native rices, GI-tagged sweets, and heritage recipes.

---

## 🌟 Key Features

1. **Multicoloured Odia Design System**:
   - Palette inspired by Odisha textile arts (Sambalpuri Ikat) and festivals: Forest Green (`#174B35`), Fresh Green (`#42A66C`), Turmeric Yellow (`#F3C84B`), Warm Orange (`#F28C45`), Traditional Red (`#C94742`), Cream (`#FFF8EA`), Soft Peach, Light Lavender, and Sky Blue.
   - Clean, mobile-first responsive layout with no horizontal overflow, micro-interactions, and accessible typography.

2. **Full Dual-Language Support (English / ଓଡ଼ିଆ)**:
   - Complete Unicode Odia translations across the entire experience: Navigation, categories, product cards, recipe ingredient multipliers, checkout, order tracking, and administration.
   - Preserves state and active basket when switching languages seamlessly.

3. **Curated 100+ Product Grocery Catalogue**:
   - Spans 8 core categories:
     - **Rice & Grains**: Arua, Usuna, Sona Masoori, Basmati, Brown Rice, Baripada Mudhi, Chuda, Mandia (Ragi), Rice Flour.
     - **Pulses & Lentils**: Desi Moong Dal, Washed Biri (Urad) Dal, Toor Dal, Masoor Dal, Chana Dal, Ganjam Kulthi Dal, Ghuguni White Peas, Rajma.
     - **Fresh Vegetables**: Red Soil Potato (Aloo), Pink Onion (Piyaja), Desi Tomato, Kantabada Brinjal, Pumpkin (Kakharu), Tender Sajana Chhuin (Drumsticks), Raw Banana (Kancha Kadali), Potala (Pointed Gourd), Ridge Gourd (Jhanhi), Colocasia (Saru), Palanga Saga & Kosala Saga.
     - **Fresh Fruits**: Champa Kadali, Patakapura Banana, Apples, Oranges, Daspalla Mango, Amrutabhanda (Papaya), Puri Coconut.
     - **Spices & Essentials**: Cold-Pressed Kachi Ghani Mustard Oil, Odisha Panch Phutana, GI Kandhamal Haladi (Turmeric), Keonjhar Phula Badi, Sun-Dried Ambula, Pure Sugarcane Guda (Jaggery).
     - **Dairy & Essentials**: Farm Fresh Milk, Thick Odia Dahi, Handmade Soft Chhena, Desi Gua Ghaee (Cow Ghee), Malai Paneer, Free-Range Country Eggs.
     - **Odia Sweets & Snacks**: GI Nayagarh Chhena Poda, GI Pahala Rasagola, Nimapada Chhena Jhili, Puri Bada Danda Pheni Khaja, Arisa Pitha, Manda Pitha, Kakara Pitha, Chakuli Pitha Batter, Enduri Pitha, Raja Poda Pitha, Cuttack Matar Ghuguni, Kendrapara Rasabali.
     - **Household Essentials**: Bhimseni Camphor, Puri Chandan Agarbatti, Handmade Clay Diyas, Sambalpuri Jute Bags.

4. **"Aji Kana Randa Haba?" (Ama Odisha Kitchen)**:
   - 16+ traditional Odia recipes (Moong Dalma, Dahi Pakhala Bhata, Besara, Santula, Aloo Potala Rasa, Dahi Bara Aloo Dum, Poda Pitha, Arisa Pitha, Chhena Poda, etc.).
   - Interactive serving scaler (2, 4, 6, 8 people) dynamically recomputes gram/milliliter portions.
   - 1-click **"Add All Ingredients to Cart"** that connects recipe requirements to actual catalogue products.

5. **"Budget Hata" (Smart Budget Basket)**:
   - Set spending limits: ₹300, ₹400, ₹500, or custom amount.
   - Custom family size (1, 2, 4, 6) and duration (3, 5, 7 days).
   - Deterministic algorithm generates a balanced Odisha pantry bag within budget and enables 1-click addition to cart.

6. **"Save Before Waste" (Clearance Corner)**:
   - Discounted near-expiry products (up to 50-60% off) verified for safety.
   - Real-time countdown of remaining days and limited stock warnings.

7. **"Ama Farmers" (Verified Local Producers)**:
   - Showcases grassroots cooperatives in Kandhamal, Keonjhar, Koraput, Nayagarh, Bargarh, and Puri.
   - Verified district tags and producer profiles.

8. **Odisha Festival Collections**:
   - Raja Parba, Rath Yatra, Nuakhai, Kumar Purnima, Kartika Purnima, Diwali.
   - 1-click purchase of curated festive hampers.

9. **Fast Full-Text & Transliteration Search**:
   - Supports English names, Odia Unicode, and natural transliterations (e.g. `aloo` ↔ `potato`, `piyaja` ↔ `onion`, `chuda` ↔ `poha`, `mudhi` ↔ `puffed rice`, `ambula` ↔ `dried mango`, `pakhala` ↔ `pakhala bhata`).

10. **Delivery Pincode Serviceability Engine**:
    - Pre-configured for 12 major Odisha hubs: Bhubaneswar, Cuttack, Puri, Berhampur, Sambalpur, Rourkela, Balasore, Angul, Jharsuguda, Jajpur, Bhadrak, and Koraput.
    - Prevents checkout to unserviceable pincodes with "Coming Soon" notifications.

11. **Server-Side Cart & Checkout**:
    - Never trusts client-side prices or stock counts.
    - Recalculates subtotal, coupons (`ODIVA100`, `AMAODISHA`, `FIRST50`), free delivery thresholds (₹299), and final totals on the server.
    - Supports Cash on Delivery and server-verified Razorpay.

12. **Live Order Tracker**:
    - Interactive visual progress: `Confirmed` → `Processing` → `Packed` → `Out for Delivery` → `Delivered`.
    - Live updates feed with timestamped log.

13. **ODIVA Sangathi (AI Shopping & Culinary Assistant)**:
    - Powered by the official xAI API (`grok-2-latest`) when configured, with a smart rule-based Odia culinary intelligence fallback.
    - Suggests meal plans, answers recipe queries, recommends budget baskets, and attaches 1-click grocery product cards.

14. **Dedicated Admin Dashboard**:
    - Revenue metrics, sales chart, pending orders, and low-stock alerts.
    - Full CRUD product catalogue management (add new products, update prices, manage stock, discount, pack size).
    - Order status management (transition from confirmed to out for delivery / delivered).

---

## 🏗️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Odisha color tokens
- **Icons**: Lucide React
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS) policies
- **Server Validation**: Zod & Next.js Server Actions / API Route handlers
- **AI Integration**: xAI API (`grok-2-latest`) with server-side validation and fallback rule engine
- **Payments**: Cash on Delivery + Razorpay API integration ready

---

## 📁 Project Structure

```
ODIVA/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai-assistant/route.ts  # xAI & culinary assistant endpoint
│   │   │   ├── cart/route.ts          # Server-side cart calculation
│   │   │   ├── orders/route.ts        # Order creation & retrieval
│   │   │   ├── orders/[id]/route.ts   # Order details & status updates
│   │   │   ├── products/route.ts      # Product filtering & admin creation
│   │   │   └── products/[id]/route.ts # Product CRUD
│   │   ├── about/page.tsx             # About ODIVA story & vision
│   │   ├── account/page.tsx           # Customer dashboard & address book
│   │   ├── admin/page.tsx             # Protected Admin Operations Portal
│   │   ├── ama-farmers/page.tsx       # Verified Odisha producers showcase
│   │   ├── budget-hata/page.tsx       # Smart Budget Basket planner
│   │   ├── checkout/page.tsx          # Pincode check, address & payment
│   │   ├── contact/page.tsx           # Customer care & hub information
│   │   ├── delivery/page.tsx          # Serviceable cities & speed policies
│   │   ├── festivals/page.tsx         # Festival collections index
│   │   ├── festivals/[slug]/page.tsx  # Festival hamper 1-click purchase
│   │   ├── odisha-specials/page.tsx   # GI tagged native delicacies
│   │   ├── orders/[id]/page.tsx       # Visual step order tracking page
│   │   ├── privacy/page.tsx           # Privacy Policy
│   │   ├── product/[slug]/page.tsx    # Product details & related recipes
│   │   ├── recipes/page.tsx           # "Aji Kana Randa Haba?" directory
│   │   ├── recipes/[slug]/page.tsx    # Interactive recipe & servings scaler
│   │   ├── save-before-waste/page.tsx # Near-expiry clearance corner
│   │   ├── shop/page.tsx              # Full catalogue with filters & sort
│   │   ├── terms/page.tsx             # Terms & Conditions
│   │   ├── wishlist/page.tsx          # Customer saved items
│   │   ├── globals.css                # Custom scrollbars & styling
│   │   ├── layout.tsx                 # Root layout with context providers
│   │   └── page.tsx                   # Homepage (13 required sections)
│   ├── components/
│   │   ├── Header.tsx                 # Logo, search, language, city, cart
│   │   ├── Footer.tsx                 # Brand pillars, links, newsletter
│   │   ├── ProductCard.tsx            # Multi-colored category-styled card
│   │   ├── CartDrawer.tsx             # Slide-over cart with free delivery bar
│   │   ├── QuickViewModal.tsx         # Fast product modal
│   │   ├── LocationModal.tsx          # City selector & PIN check
│   │   ├── AuthModal.tsx              # Login / Register / Demo 1-click buttons
│   │   └── AiAssistantModal.tsx       # ODIVA Sangathi AI floating assistant
│   ├── context/
│   │   ├── AuthContext.tsx            # Session & Role management
│   │   ├── CartContext.tsx            # Persistent cart, coupons, totals
│   │   ├── LanguageContext.tsx        # English / ଓଡ଼ିଆ switcher
│   │   ├── LocationContext.tsx        # City & Pincode serviceability
│   │   └── WishlistContext.tsx        # Saved items
│   ├── data/
│   │   ├── categories.ts              # 8 vibrant grocery categories
│   │   ├── products.ts                # 112 realistic seed grocery items
│   │   ├── recipes.ts                 # 14 traditional Odia recipes
│   │   ├── festivals.ts               # 6 major Odisha festival collections
│   │   ├── farmers.ts                 # 6 verified Odisha cooperatives
│   │   ├── deliveryZones.ts           # 12 cities & 25+ verified PIN codes
│   │   └── wasteOffers.ts             # Save Before Waste clearance items
│   ├── lib/
│   │   ├── i18n.ts                    # Full dual-language dictionary
│   │   ├── store.ts                   # In-memory mutable server store & logic
│   │   ├── supabase.ts                # Supabase client wrapper
│   │   └── utils.ts                   # Price formatter & classnames helper
│   └── types/
│       └── index.ts                   # TypeScript interfaces
├── supabase/
│   ├── migrations/
│   │   └── 20261123000000_initial_schema.sql  # 20 relational tables + RLS
│   └── seed.sql                       # Seed data SQL script
├── .env.example
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or Node.js 20+
- npm or yarn

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ODIVA.git
cd ODIVA

# Install dependencies
npm install
```

### 2. Environment Variables

Create `.env.local` based on `.env.example`:

```bash
cp .env.example .env.local
```

Configure your credentials:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# xAI API Key (Optional: for ODIVA Sangathi Grok AI Assistant)
XAI_API_KEY=your-xai-api-key

# Razorpay Integration (Optional: Defaults to Cash on Delivery)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Application URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note**: Even without external API keys, ODIVA runs with full functionality out-of-the-box using its built-in server database store and smart culinary assistant!

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 🛡️ Database Setup (Supabase)

1. Create a new project in [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Paste the contents of `supabase/migrations/20261123000000_initial_schema.sql` and run it. This creates the 20 tables with indexes, foreign keys, and Row Level Security policies.
4. Paste the contents of `supabase/seed.sql` and run it to populate initial categories, farmers, and coupons.
5. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your environment variables.

---

## 🔑 Demo Logins & Role Testing

The website includes instant one-click login buttons in the Auth Modal:

- **Customer Demo**:
  - Name: Soumya Ranjan Dash
  - City: Saheed Nagar, Bhubaneswar
  - Full access to shopping, wishlist, cart, and live order tracking.
- **Admin Portal**:
  - Name: ODIVA Head Admin (Bhubaneswar Hub)
  - Full access to `/admin` dashboard with product inventory editing, stock replenishment, and order fulfillment status updates.

---

## 🚢 Deployment to Vercel

1. Push your repository to GitHub.
2. In [Vercel](https://vercel.com), click **Add New Project** and import the ODIVA repository.
3. Under **Environment Variables**, add the variables from `.env.example`.
4. Click **Deploy**. Vercel will automatically build the Next.js App Router application and issue a public production URL.

---

## 📜 License

MIT License. Designed and developed with pride for Odisha.
**Your Odisha. Your Taste. Your Store.**
