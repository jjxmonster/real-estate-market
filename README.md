# Real Estate Market App

Real Estate Market is a Next.js fullstack application where users can create accounts, add/edit property offer, and browse offers posted by other users. The application incorporates pagination for smooth browsing experience. Additionally, users have the option to buy promotion for their offers, with payments processed through Stripe. The latest feature is chat, powered by Supabase Realtime Database, if user is interested with some offer, he can write directly to an owner

<img src="https://www.tarabasz.dev/img/real-estate1.png" alt="img1" width="500" height="300">
<br>
<img src="https://www.tarabasz.dev/img/real-estate2.png" alt="img1" width="500" height="300">

## Live

https://real-estate-market-delta.vercel.app/

## Environment Variables

```bash
AIRTABLE_API_KEY=
AIRTABLE_BASE=

NEXTAUTH_SECRET=
NEXT_PUBLIC_STRIPE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_CLOUDINARY_NAME=
NEXT_PUBLIC_CLOUDINARY_KEY=
CLOUDINARY_SECRET=

NEXT_PUBLIC_SUPABASE_API=
SUPABASE_SERVICE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
```

## Run locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Tech stack

- Next.js
- Typescript
- Airtable
- Recoil
- Tailwind
- next-auth
- Stripe
- Supabase
