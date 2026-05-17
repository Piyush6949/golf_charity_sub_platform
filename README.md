# Golf Charity Platform ⛳🏆

A full-stack platform that enables users to participate in subscription-based prize draws while contributing to charitable causes.

The system implements dynamic financial calculations, secure payment workflows, and role-based access control to manage users, charities, and monthly draw outcomes.

🔗 Live Demo: https://golf-charity-sub-platform-814hh2chh-piyush6949s-projects.vercel.app/

---

## Key Highlights

- Designed dynamic jackpot system with real-time financial calculations based on user contributions
- Integrated Razorpay payment workflows with webhook verification for secure subscriptions
- Implemented role-based dashboards with protected admin APIs and winner verification flows
- Built secure authentication using JWT-based HttpOnly cookie sessions and RBAC

---

## 🌟 Key Features

### 1. Dynamic Prize Pools & Jackpots

The prize pool scales dynamically as more users subscribe. The platform automatically calculates the total jackpot based on users' selected charity contributions.

- **Calculation Rule**:
  ```txt
  ((50% - User Charity Contribution %) * Subscription Amount)
  ```

- **Prize Tiers**:
  - 👑 5-Number Match: **40%** (Rolls over to next month if no winner)
  - 🏆 4-Number Match: **35%** (Distributed equally among winners)
  - ⭐ 3-Number Match: **25%** (Distributed equally among winners)

---

### 2. Flexible Charity Contributions

- Users decide what percentage of their subscription goes directly to their chosen charity (capped up to 50%)
- Real-time updates display exactly how much money goes to charity vs the prize pool
- Users can choose from a constantly updating list of partner charities:
  - Environment
  - Education
  - Healthcare

---

### 3. Secure Subscriptions (Razorpay)

- Fully integrated with the **Razorpay API** for managing secure recurring yearly subscriptions (₹8,999/year)
- Webhook-ready endpoints and signature verification processes ensure safe access to the Pro dashboard

---

### 4. User & Admin Dashboards

#### User Dashboard
Users can:
- Enter up to five Stableford scores
- Track lifetime winnings
- See upcoming draws
- Download action-required notifications if they win
- Upload scorecards for manual payout verification via the `Winnings & Draws` section

#### Admin Panel
Strict route-guarded admin APIs allow the team to:
- Manage subscriptions
- Verify uploaded proof images for winners
- Run monthly RNG draws
- Manage payouts

---

### 5. Advanced Admin Control Center

The platform includes a dedicated admin dashboard built for secure operational management and draw supervision.

#### 🔐 Admin Authentication
- Protected admin-only routes with strict RBAC validation
- Secure JWT-based HttpOnly cookie session handling
- Unauthorized access prevention through server-side role verification

#### ⚙️ Admin Functionalities
- Manage all active subscriptions and participant records
- Trigger and manage monthly RNG-based prize draws
- View live jackpot growth and contribution analytics
- Verify uploaded winner proof images manually before payout approval
- Approve or reject payout requests with status tracking
- Manage partnered charities and monitor total funds raised
- Monitor user participation and draw statistics in real time

#### 📊 Draw & Winner Management
- Automated draw result generation with persistent historical storage
- Tier-based winner calculation logic for 3, 4, and 5 number matches
- Rollover jackpot handling when no 5-number winner exists
- Centralized winner verification workflow before fund release

#### 🛡️ Security & Governance
- All admin APIs (`/api/admin/*`) are server-protected and role-validated
- Sensitive user information hidden from public analytics endpoints
- Payment verification and subscription integrity handled through secure webhook validation

#### 🧪 Demo Admin Credentials

```txt
Email: c@gmail.com
Password: c
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with custom Tailwind-like utility classes and variables
- **Database ORM**: Prisma
- **Database**: PostgreSQL
- **Payments Processing**: Razorpay
- **Security**: JWT-based secure HttpOnly cookie session management and RBAC

---

## 🚀 Getting Started

### Prerequisites

- Node.js (`v18+`)
- PostgreSQL Database
- Razorpay Test/Live Account (API Keys)

---

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your_postgresql_connection_string"

JWT_SECRET="your_secure_jwt_secret"

RAZORPAY_KEY_ID="rzp_test_YOUR_KEY"

RAZORPAY_KEY_SECRET="YOUR_SECRET"
```

---

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Push the Prisma Schema to your database:

```bash
npx prisma db push
```

OR

```bash
pnpm dlx prisma db push
```

3. (Optional) Run the database seeders for charities:

```bash
npx tsx seed_charities.ts
```

4. Start the development server:

```bash
pnpm dev
```

5. Open:

```txt
http://localhost:3000
```

---

## 🗄️ Database Schema & Models

- **`User`**
  - Tracks authentication
  - Role (`USER` vs `ADMIN`)
  - Charity selections
  - Subscription metadata

- **`Charity`**
  - Tracks partner organizations
  - Total raised amount

- **`Score`**
  - Tracks Stableford inputs entered by users for the current draw

- **`Draw`**
  - Tracks historical monthly lottery outcomes and drawn numbers

- **`Winner`**
  - Tracks:
    - Winning user
    - Match tier
    - Prize amount
    - Uploaded proof snippet
    - Payment status (`pending`, `approved`, `paid`)

---

## 🛡️ Security Posture

- All interactions with user-specific mutations require a verified HTTP-only session cookie
- Admin APIs explicitly verify `role === "ADMIN"` during every request
- PII is obfuscated from all public statistic endpoints (`/api/stats`, `/api/jackpot`)

---

*Built to empower golfers to change lives while competing for the ultimate prize.* 🏌️‍♂️
