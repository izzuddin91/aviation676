# Drone Service Implementation Guide

## New Drone Service Pages Created

### 1. **Drone Service Showcase Page** 
- **Route:** `/drone`
- **File:** `app/(site)/drone/page.tsx`
- **Features:**
  - Hero section with call-to-action
  - 4 professional drone services displayed:
    - Aerial Photography
    - Aerial Videography
    - Surveying & Mapping
    - Inspection Services
  - Service details with features and pricing
  - "Why Choose Us" section
  - Call-to-action buttons throughout

### 2. **Drone Service Request Form**
- **Route:** `/drone-request`
- **File:** `app/(site)/drone-request/page.tsx`
- **Form Fields:**
  - Full Name (required)
  - Email (required)
  - Phone Number
  - Type of Service (dropdown - required)
  - Preferred Date (required)
  - Project Location
  - Project Description
  - Budget Range
- **Features:**
  - Authentication check (redirects to sign-in if not authenticated)
  - Form validation
  - Loading state
  - Success notification with redirect
  - Professional styling with backdrop blur

### 3. **Firebase Backend Function**
- **File:** `app/(site)/service/firebase.service.ts`
- **Function:** `submitDroneRequest()`
- **Database Collection:** `drone_requests`
- **Fields Stored:**
  - User information (name, email, phone)
  - Service details (type, location, description, budget)
  - Status: "pending" (for tracking)
  - createdAt: Server timestamp

### 4. **Navigation Update**
- **File:** `app/component/Navbar.tsx`
- **Change:** Added "Drone Services" link in the navigation menu between "Planespotting Competition" and "To Sell"

## How to Use

### For Users:
1. Click on "Drone Services" in the navbar
2. Browse the available drone services
3. Click "Request a Service" or "Book This Service"
4. Fill out the service request form
5. Submit and wait for confirmation contact within 24-48 hours

### For Admin:
1. Monitor incoming drone requests in Firebase Console under `drone_requests` collection
2. Status will be "pending" initially
3. Can be updated to "approved", "completed", etc.

## Database Structure

**Collection: `drone_requests`**
```
{
  name: string,
  email: string,
  phone: string (optional),
  serviceType: string,
  preferredDate: string,
  location: string (optional),
  description: string (optional),
  budget: string (optional),
  status: string ("pending"),
  createdAt: timestamp
}
```

## Customization Options

### To Add More Services:
Edit `/app/(site)/drone/page.tsx` and add to the `droneServices` array:
```typescript
{
  id: "service-id",
  title: "Service Name",
  description: "Service description",
  price: "RM X - RM Y",
  features: ["feature1", "feature2"],
  icon: "🎯"
}
```

### To Change Pricing:
The pricing is hardcoded in the `droneServices` array. Update accordingly or consider moving to Firebase for dynamic pricing.

### To Customize Styling:
Both pages use Tailwind CSS with a blue-green gradient theme that matches your site's aesthetic.

## Next Steps (Optional Enhancements)

1. **Email Notifications:** Set up Firebase Cloud Functions to send email confirmations
2. **Payment Integration:** Add Stripe or PayPal for online booking payments
3. **Portfolio Gallery:** Create a gallery page showcasing past drone projects
4. **Reviews/Testimonials:** Add customer reviews for completed drone services
5. **Booking Calendar:** Integrate a calendar system for availability management
6. **Admin Dashboard:** Create an admin panel to manage drone service requests
