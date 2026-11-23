-- ==============================================================================
-- ODIVA (ଓଡ଼ିଭା) SEED DATA SCRIPT
-- Seeds categories, producers, products, recipes, festivals, pincodes, coupons
-- ==============================================================================

-- 1. SEED CATEGORIES
INSERT INTO categories (id, name, odia_name, slug, icon_name, accent_color, card_bg, description, display_order)
VALUES
('rice-grains', 'Rice & Grains', 'ଚାଉଳ ଓ ଖାଦ୍ୟଶସ୍ୟ', 'rice-grains', 'Wheat', '#F3C84B', 'from-amber-50 to-yellow-100', 'Heritage Odia Arua, Usuna, aromatic Basmati, Mandia (Ragi), Chuda & Mudhi', 1),
('pulses-lentils', 'Pulses & Dal', 'ଡାଲି ଓ କୋଳଥ', 'pulses-lentils', 'Bean', '#F28C45', 'from-orange-50 to-amber-100', 'Farm polished Moong, traditional Biri (Urad), Toor, Kulthi & Chana dal', 2),
('fresh-vegetables', 'Fresh Vegetables', 'ତାଜା ପନିପରିବା', 'fresh-vegetables', 'Carrot', '#42A66C', 'from-emerald-50 to-green-100', 'Native Potala, Sajana Chhuin, Baigana, Kancha Kadali, Saru & crisp greens', 3),
('fruits', 'Fresh Fruits', 'ତାଜା ଫଳମୂଳ', 'fruits', 'Apple', '#C94742', 'from-rose-50 to-red-100', 'Champa Kadali, ripe Papaya, sweet Guavas, fresh Coconuts & seasonal fruits', 4),
('spices-cooking', 'Spices & Essentials', 'ମସଲା ଓ ରନ୍ଧନ ସାମଗ୍ରୀ', 'spices-cooking', 'Flame', '#174B35', 'from-teal-50 to-emerald-100', 'Pure Mustard Oil, Panch Phutana, sun-dried Ambula, Keonjhar Phula Badi', 5),
('dairy-essentials', 'Dairy & Eggs', 'ଦୁଗ୍ଧ ଓ ଅଣ୍ଡା', 'dairy-essentials', 'Milk', '#DCEFFA', 'from-sky-50 to-blue-100', 'Fresh Cow Milk, thick Odia Dahi, handmade Chhena, Desi Ghee & Farm Eggs', 6),
('odia-sweets-snacks', 'Odia Sweets & Snacks', 'ଓଡ଼ିଆ ମିଠା ଓ ଜଳଖିଆ', 'odia-sweets-snacks', 'Cookie', '#C94742', 'from-red-50 to-orange-100', 'GI Nayagarh Chhena Poda, Pahala Rasagola, Puri Khaja, Arisa & Kakara Pitha', 7),
('household-essentials', 'Household Essentials', 'ଘରୋଇ ସାମଗ୍ରୀ', 'household-essentials', 'Sparkles', '#EAE4FA', 'from-purple-50 to-indigo-100', 'Puja camphor, earthen diyas, organic detergents, eco broomsticks & cleaners', 8)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED PRODUCERS
INSERT INTO producers (id, name, district, village, specialty, photo_url, bio, cooperative_name, verified_since)
VALUES
('producer-kandhamal-organic', 'Kandhamal Apex Spices Association', 'Kandhamal', 'Phulbani', 'GI Certified High-Curcumin Organic Turmeric & Forest Ginger', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', 'A cooperative network of over 1,200 tribal farmers in Kandhamal hills growing traditional organic turmeric without chemical fertilizers since generations.', 'Kandhamal Agro Producer Co.', '2019'),
('producer-keonjhar-badi-shg', 'Maa Tarini Mahila Vikas Samiti', 'Keonjhar', 'Ghatagaon', 'Hand-Shaped Sun-Dried Phula Badi with Posta (Poppy Seeds)', 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80', 'Women-led Self Help Group preserving the ancient artisan craft of light, crunchy Keonjhar Phula Badi shaped like delicate blooming jasmine flowers.', 'Keonjhar Women Artisan Federation', '2020'),
('producer-koraput-millet-collective', 'Koraput Tribal Millet Producers Union', 'Koraput', 'Semiliguda', 'Indigenous Mandia (Finger Millet / Ragi) & Suan', 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=600&q=80', 'Supported by the Odisha Millet Mission, cultivating climate-resilient native millets in nutrient-rich red laterite soils of the Eastern Ghats.', 'Koraput Organic Millets Society', '2021'),
('producer-nayagarh-dairy', 'Daspalla Chhena & Milk Cooperative', 'Nayagarh', 'Daspalla', 'Pure Cow Chhena & Traditional Baked Chhena Poda', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=600&q=80', 'Grassroots dairy farmer cooperative with over 450 indigenous cow herders supplying unadulterated fresh cow milk and chhena across Nayagarh.', 'Nayagarh Dugdha Utpadaka Sangha', '2018'),
('producer-bargarh-paddy', 'Mahanadi Basin Paddy Growers Union', 'Bargarh', 'Attabira', 'Traditional Odia Arua & Usuna Rice Varieties', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', 'From the rice bowl of Odisha, multi-generation farmers practicing sustainable canal-irrigated cultivation of aromatic native rices.', 'Bargarh Krishak Kalyan Samiti', '2017'),
('producer-puri-coastal-palms', 'Brahmagiri Coconut & Palm Collective', 'Puri', 'Brahmagiri', 'Fresh Coastal Coconuts & Earthen Terracotta Diyas', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', 'Coastal agro-artisans harvesting sweet water coconuts and handcrafting natural earthen pottery for pilgrimage and festivals.', 'Chilika Coastal Farmer Trust', '2020')
ON CONFLICT (id) DO NOTHING;

-- 3. SEED COUPONS
INSERT INTO coupons (code, discount_type, discount_value, min_order_value, max_discount, is_active)
VALUES
('ODIVA100', 'flat', 100.00, 499.00, NULL, TRUE),
('AMAODISHA', 'percentage', 15.00, 399.00, 150.00, TRUE),
('FIRST50', 'flat', 50.00, 299.00, NULL, TRUE)
ON CONFLICT (code) DO NOTHING;
