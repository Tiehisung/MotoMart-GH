# 🏍️ MotoMartGH

> Ghana's Trusted Motorbike Marketplace — Buy & Sell Safely in Upper West

MotoMartGH is a full-stack web application that connects motorbike buyers and sellers across Ghana's Upper West Region. With verified sellers, physical inspections, and secure payment integration, it's the safest way to trade motorbikes in Wa, Lawra, Tumu, and beyond.

---

## 📸 Screenshots

| Landing Page | Browse Listings | Listing Detail |
|:---:|:---:|:---:|
| *Dark-themed hero with search* | *Filterable grid with badges* | *Gallery, specs, request call* |

| Dashboard | Admin Panel | Payment Modal |
|:---:|:---:|:---:|
| *Seller leads & listings* | *Full platform management* | *Paystack MoMo integration* |

---

## ✨ Features

### For Buyers
- 🔍 **Browse & Search** — Filter by brand, location, price, condition, listing type
- 🛡️ **Verified Listings** — Only see bikes that have been physically inspected
- 📞 **Request a Call** — One-click SMS to seller (no phone numbers exposed)
- 📱 **Responsive** — Works on any device, PWA-ready
- 🌓 **Dark/Light Mode** — Full theme support

### For Sellers
- 📝 **Create Listings** — Multi-step form with image upload
- ⭐ **Premium Listings** — Get featured at the top of search results
- 🚀 **Boosts** — Push your listing to the absolute top
- 📊 **Dashboard** — Track views, inquiries, and leads
- 💰 **Dynamic Pricing** — Admin-controlled listing fees
- 📩 **Lead Management** — See who requested a call, mark as contacted

### For Admins
- 👥 **User Management** — Verify identities, ban users, view activity
- 🏍️ **Listing Approval** — Review and approve/reject listings
- 🔍 **Inspections** — Manage physical verification requests
- 💳 **Payment Tracking** — View all transactions
- 📬 **Contact Messages** — Manage inquiries from contact form
- 🏷️ **Brand Management** — Add/edit/disable motorbike brands
- 📍 **Location Management** — Manage towns and regions
- 💲 **Dynamic Pricing** — Update fees without code changes

### Platform
- 🔐 **JWT Authentication** — Secure login with role-based access
- 💳 **Paystack Integration** — Mobile Money payments (MTN, Vodafone, AirtelTigo)
- 📱 **SMS Notifications** — Africa's Talking integration for lead alerts
- 📧 **Email Notifications** — Nodemailer for contact form + lead alerts
- ☁️ **Cloudinary** — Image upload and optimization
- 🔒 **Rate Limiting** — Protection against brute force attacks
- 📄 **TypeScript** — Full type safety across the stack

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Shadcn/ui | Component primitives |
| Redux Toolkit | State management |
| RTK Query | API caching & fetching |
| React Hook Form | Form handling |
| Zod | Schema validation |
| React Router v6 | Routing |
| Sonner | Toast notifications |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express.js | HTTP framework |
| TypeScript | Type safety |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Multer | File uploads |
| Nodemailer | Email sending |
| Express Rate Limit | Rate limiting |

### External Services
| Service | Purpose |
|---------|---------|
| Cloudinary | Image hosting & optimization |
| Paystack | Mobile Money payments |
| Africa's Talking | SMS notifications |
| SMTP (Gmail/SendGrid) | Email delivery |

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB 6+ (local or Atlas)
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/motomartgh.git
cd motomartgh

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install