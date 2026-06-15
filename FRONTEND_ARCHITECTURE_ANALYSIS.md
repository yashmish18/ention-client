# Frontend Architecture Analysis

This document outlines the architecture, design system, and technical patterns found in the Ention frontend repository. The goal is to provide a comprehensive baseline understanding to support the implementation of a reusable inquiry and form system.

---

## 1. Technology Stack

- **Framework**: Next.js 16.2.2 (App Router)
- **Language**: TypeScript (`^5`)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`) combined with global CSS variables.
- **State Management**: `zustand` (v5) used for global state (`useAuth.ts`, `useCart.ts`).
- **Form Libraries**: None used currently. Forms are managed manually via React's `useState` and native DOM events. No validation libraries (like Zod or Yup) are present.
- **API Libraries**: Native `fetch` is used exclusively. All API calls are centralized in a robust `lib/api.ts` module that handles request formatting, token injection, error handling, and response envelopes.
- **Animation Libraries**: 
  - `framer-motion` (v12) for page transitions, modals, and complex element animations.
  - `gsap` (v3) for scroll and timeline animations.
  - `@react-three/fiber` & `@react-three/drei` for 3D rendering.
  - `lenis` for smooth scrolling capabilities.

---

## 2. Folder Structure

```text
d:\ention-client\
├── app/                  # Next.js App Router pages and layouts
│   ├── about/
│   ├── admin/
│   ├── brand/
│   ├── checkout/
│   ├── collaborate/
│   ├── dashboard/
│   ├── login/
│   ├── orders/
│   ├── products/
│   ├── signup/
│   ├── solutions/
│   └── support/
├── components/           # UI Components
│   ├── auth/             # Authentication specific components
│   ├── forms/            # Existing manual forms
│   ├── products/         # Product display components
│   ├── v2/               # Next-gen layout sections
│   └── ...               # Shared layout blocks (Navbar, Footer, Modals)
├── data/                 # Static data and configurations
├── lib/                  # Utilities and API functions
│   ├── api.ts            # Centralized fetch wrapper
│   └── utils.ts          # Helper functions (e.g., clsx + twMerge)
├── store/                # Zustand state hooks
│   ├── useAuth.ts
│   └── useCart.ts
└── public/               # Static assets
```

**Observation on Reusable UI**: Currently, there is **no dedicated folder** for reusable atomic UI primitives (like `<Input />`, `<Button />`, `<Label />`). Styling is applied inline using Tailwind utility classes within complex components or specific form files.

---

## 3. Design System

The design aesthetic is highly modern, brutalist, and typographic-driven.

- **Typography System**:
  - **Sans-serif (Base)**: `Inter` (`--font-inter`, mapped to `font-sans`). Used for body text and general UI.
  - **Serif (Headings)**: `Libre Baskerville` (`--font-serif`, mapped to `font-serif`). Used exclusively for `h1, h2, h3, h4` and stylized input text.
  - **Monospace (Accents)**: `JetBrains Mono` (`--font-mono`, mapped to `font-mono`). Heavily used for small labels, tags, and uppercase tracking text.
- **Button System**: Buttons use stark contrasts, thick padding, uppercase monospace fonts with wide tracking, e.g., `bg-ink text-bg py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-accent`.
- **Input System**: High-contrast, brutalist inputs featuring soft off-white backgrounds, thin borders, and serif typography for user input, e.g., `bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif focus:border-accent`. Labels are strictly uppercase, miniature, and wide-tracked.
- **Card / Badge System**: Cards utilize the `card-hover` custom class (in `globals.css`) which applies a background/text color inversion on hover. Badges are generally constructed using the mono font with slight borders.

---

## 4. Theme System

The global theme is defined in `app/globals.css` using CSS variables mapped to Tailwind configuration:

- **Primary Colors**:
  - Background (`--color-bg`): `#E4E3E0` (Warm Off-White/Beige)
  - Ink (`--color-ink`): `#141414` (Near Black, used for text and primary solid buttons)
- **Accent Colors**:
  - Accent (`--color-accent`): `#F27D26` (Vibrant Orange, used for highlights, focus states, and selection)
- **Border Styles**:
  - Line (`--color-line`): `rgba(20, 20, 20, 0.1)` (Used for subtle dividers and input borders)
- **Shadow Styles**: Soft, massive ambient shadows for overlays, e.g., `shadow-[0_50px_100px_rgba(0,0,0,0.3)]` used in modals.
- **Radius System**: Strictly minimal. `rounded-sm` is the maximum radius applied, keeping the brutalist sharp-edge aesthetic intact.

---

## 5. Layout System

- **Container Widths**: Relies heavily on full-width sections combined with internal max-width constraints (e.g., `max-w-7xl`, `max-w-2xl` for modals).
- **Section Spacing**: Generous padding blocks are utilized heavily (`p-8`, `p-12`, `space-y-10`).
- **Grid System**: Tailwind's CSS grid is used for form layouts (`grid-cols-1 md:grid-cols-2` or `md:grid-cols-3`).
- **Responsive Breakpoints**: Standard Tailwind breakpoints (`sm`, `md`, `lg`, `xl`) are used seamlessly to transition from stacked mobile layouts to multi-column desktop grids.

---

## 6. Existing Form Infrastructure

**Current Implementation**:
- **Libraries**: No specialized libraries used. Forms are entirely native.
- **Components**: Found under `components/forms/` (`SmartSupportForm.tsx`, `LeadSalesForm.tsx`, `ProgramApplicationForm.tsx`, `QuickCallbackForm.tsx`).
- **State Handling**: Each form maintains a localized `useState` object (e.g., `const [formData, setFormData] = useState(...)`). Submission intercepts `e.preventDefault()` and calls the centralized `lib/api.ts` functions.
- **Validation**: Minimal to none. Relies entirely on HTML5 `required` and `type="email"` attributes.
- **Styling**: Significant code duplication. The complex markup for labels (`text-[9px] uppercase font-black tracking-widest`) and inputs (`bg-[#FAF9F6] border border-black/10 p-4`) is repeated across every form file.

---

## 7. Existing Modal / Dialog Infrastructure

- **Component**: `components/FormModal.tsx`.
- **Implementation**: Uses `framer-motion` (`AnimatePresence` and `motion.div`) for smooth fade-in and scale-up transitions.
- **Behavior**: Manages body scroll locking natively via a `useEffect` hook (`document.body.style.overflow = "hidden"`).
- **Styling**: Features a dark backdrop (`bg-black/60 backdrop-blur-md`) and a centered white card with the signature soft shadow (`shadow-[0_50px_100px_rgba(0,0,0,0.3)]`). A fixed `X` (from `lucide-react`) is used for the close action.

---

## 8. Existing API Integration Pattern

- **Architecture**: Centralized in `lib/api.ts`. There are no hardcoded URLs inside individual components.
- **Library**: Native `fetch` with Next.js specific extensions (like `revalidate`).
- **Envelopes**: Handles standard backend response envelopes: `{ success, message, data, pagination? }`.
- **Authentication**: Manages token extraction (`localStorage.getItem('ention_token')`) and injects it as a `Bearer` token in the `Authorization` header. It also handles 401 Unauthorized responses by clearing local storage and redirecting to `/login`.

---

## 9. Existing Upload System

- **Upload Capabilities**: Currently, **none exist**. A thorough search across the repository for file inputs (`type="file"`) yielded no results. There is no existing reusable upload UI, drag-and-drop capability, or API endpoint documented in the frontend for handling file attachments (e.g., for support tickets).

---

## 10. Existing Animations

- **Framer Motion**: The primary driver for component mount/unmount animations, modal transitions, and route changes.
- **CSS Keyframes**: Utilized for infinitely scrolling marquee elements (e.g., `.ticker` class in `globals.css`).
- **Scroll & 3D**: `Lenis` provides smooth scrolling globally, while `gsap` handles scroll-triggered timeline animations (mostly in the landing and product showcase sections). `React Three Fiber` handles interactive 3D elements.
- **Hover Transitions**: Utilizes Tailwind's `transition-all duration-300` coupled with `group-hover` for micro-interactions on cards and buttons.

---

## 11. Page Inventory

- **`/`** - Home Page (Landing & Showcases)
- **`/about`** - Company information and Experience Programs
- **`/admin`** - Internal admin dashboard/tools
- **`/brand`** - Brand assets and story
- **`/checkout`** - Cart checkout flow
- **`/collaborate`** - Partnership and collaboration forms
- **`/dashboard`** - Customer portal (Orders, Profile)
- **`/login`** - Authentication (Login)
- **`/signup`** - Authentication (Registration)
- **`/orders`** - Order tracking and history
- **`/products`** - Product listings and individual details (e.g., Workbook, Swapbook)
- **`/solutions`** - B2B/Enterprise use cases and solutions
- **`/support`** - Customer support, ticketing, and contact

---

## 12. Form Placement Analysis

Based on the page inventory and current business logic, here are the optimal placements for the primary form types:

- **Lead Form (B2B / Enterprise Sales)**
  - **File Path**: `app/solutions/page.tsx` or `app/products/[slug]/page.tsx`
  - **Component Path**: Rendered inside `components/v2/WhyChooseSection.tsx` or a dedicated CTA block.
  - **Trigger**: "Request Enterprise Quote" or "Contact Sales" buttons.
- **Program Form (Partnerships / Applications)**
  - **File Path**: `app/about/page.tsx` or `app/collaborate/page.tsx`
  - **Component Path**: Rendered inside `components/ExperienceProgram.tsx`.
  - **Trigger**: "Apply for Program" or "Join the Beta" buttons.
- **Support Form (Customer Issues)**
  - **File Path**: `app/support/page.tsx`
  - **Component Path**: Embedded directly on the page.
  - **Trigger**: Standalone section, no modal needed, but could be triggered via a "Create Ticket" button in the `app/dashboard/page.tsx`.
- **Callback Form (Quick Contact)**
  - **File Path**: Global layout or `app/page.tsx`.
  - **Component Path**: `components/FloatingTalkToUs.tsx` or `components/Footer.tsx`.
  - **Trigger**: Floating action button (FAB) or Footer "Talk to an Expert" link. Rendered inside `FormModal.tsx`.

---

## 13. Reusable Form System Strategy

To move away from duplicated, fragile manual forms toward a robust, scalable system, the following architectural strategy is recommended:

**1. Create Atomic UI Primitives**
Extract the heavily repeated Tailwind markup into a `components/ui/` directory.
- `Label.tsx`: Handles the tiny, mono, uppercase styling.
- `Input.tsx` / `Textarea.tsx` / `Select.tsx`: Handles the off-white backgrounds, borders, and serif fonts, with built-in error state styling (`border-red-500`).
- `Button.tsx`: Centralizes the brutalist button styles and loading spinner states.

**2. Adopt a Form Library & Schema Validation**
- Introduce **`react-hook-form`** to handle state management without re-rendering the entire component on every keystroke.
- Introduce **`zod`** for schema validation. This allows strict type-safety and declarative error messages (e.g., enforcing valid emails or required descriptions).

**3. Build a "Form Engine" Component**
Create a master `DynamicForm` component that accepts a generic Zod schema, an array of field configurations (type, label, placeholder), and a submit handler. This ensures all forms across the site behave identically and share the exact same UI structure.

**4. Modal Integration**
Wrap the `DynamicForm` inside the existing `FormModal.tsx` for contexts like the Quick Callback or Lead generation forms, ensuring the system is highly portable and seamlessly integrates with the current global state (e.g., closing the modal on success).

**5. Seamless API Hooks**
Map the submit handlers directly to the existing robust functions in `lib/api.ts` (e.g., `submitLead`, `createSupportTicket`), leveraging the existing `.then()`/`.catch()` flows for consistent success and error states.
