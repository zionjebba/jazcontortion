# Jaz Contortion Platform

This is the full-stack web application for Jaz Contortion, built to handle course sales, secure video streaming, and user management.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** NextAuth.js
- **Video Hosting:** Mux (with signed URLs & webhooks)
- **Image Hosting:** Cloudinary
- **Payments:** Paystack
- **Emails:** Resend
- **Styling:** Tailwind CSS & shadcn/ui

## Local Setup

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd jaz
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env` (or just create `.env`) and fill in the required keys. The app uses a strict validator on startup, so it will complain if you miss critical ones. 

   Required keys:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET` & `NEXTAUTH_URL`
   - `MUX_TOKEN_ID`, `MUX_TOKEN_SECRET`, `MUX_WEBHOOK_SECRET`
   - `MUX_SIGNING_KEY`, `MUX_SIGNING_PRIVATE_KEY`
   - `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_API_KEY`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `PAYSTACK_SECRET_KEY`, `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
   - `RESEND_API_KEY`

3. **Database Setup**
   Ensure you have a local Postgres instance running, then sync the schema:
   ```bash
   npx prisma migrate dev
   ```

4. **Run the Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Webhooks

The app relies heavily on webhooks to keep external services in sync:
- **Mux (`/api/mux/webhook`)**: Handles video processing states (`video.asset.ready`, etc.). We use a `WebhookEvent` table for idempotency to prevent duplicate processing.
- **Paystack (`/api/payments/webhook`)**: Validates successful charges and fulfills course entitlements via atomic Prisma transactions.

## Admin Access

To access the `/admin` dashboard locally:
1. Sign up for a normal account on the frontend.
2. Open Prisma Studio (`npx prisma studio`).
3. Find your user record and change the `role` from `USER` to `ADMIN`.
4. Refresh the app.
