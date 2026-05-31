# Firebase Analytics Setup Guide

## Overview

I've set up Firebase Analytics for your Aviation 676 website to track:

- **Website visits** (sessions/page views)
- **Product clicks** (when users view/click products)
- **Custom events** (button clicks, form submissions, etc.)

## What's Been Implemented

### 1. **Analytics Service** (`app/(site)/service/analytics.service.ts`)

A new analytics service with multiple tracking functions:

```typescript
// Track when users visit a page
trackPageView(pageName, pagePath);

// Track product clicks/views
trackProductClick(productId, productTitle, price);

// Track session starts (website visits)
trackSessionStart(source);

// Track button clicks
trackButtonClick(buttonName, buttonLocation);

// Track custom events
trackCustomEvent(eventName, eventData);
```

### 2. **Active Analytics Tracking**

#### Session/Visit Tracking

- Automatically tracks when users open your website
- Location: `app/layout.tsx` (Root layout component)

#### Product Click Tracking

- Tracks when users click on products
- Location: `app/component/productTiles/productTiles.tsx`
- Logs: Product ID, title, and price

#### Page View Tracking

- Tracks when users visit the products page
- Location: `app/(site)/products/page.tsx`

## How to Use

### View Analytics in Firebase Console

1. **Go to Firebase Console**
   - Visit https://console.firebase.google.com
   - Select your project

2. **Navigate to Analytics**
   - Click on "Analytics" in the left sidebar
   - You'll see real-time data after users interact with your site

3. **Key Metrics to Check**
   - **Realtime**: See active users and events happening now
   - **Dashboard**: Overall analytics overview
   - **Events**: Custom events like `view_item`, `button_click`, `session_start`
   - **Audiences**: Segment users

### Add More Analytics Tracking

To track additional events or pages, import and use the analytics service:

```typescript
import {
  trackPageView,
  trackProductClick,
  trackButtonClick,
} from "@/app/(site)/service/analytics.service";

// In your component
useEffect(() => {
  trackPageView("My Page", "/my-page");
}, []);

// On button click
const handleClick = () => {
  trackButtonClick("Submit Button", "Contact Form");
  // ... rest of your logic
};
```

### Track Custom Events

For other actions, use `trackCustomEvent`:

```typescript
import { trackCustomEvent } from "@/app/(site)/service/analytics.service";

// Example: Track form submission
const handleSubmit = (data) => {
  trackCustomEvent("form_submitted", {
    form_name: "contact_form",
    fields_count: Object.keys(data).length,
  });
};
```

## Firebase Console Reports

Once data is collected, you can view:

### 1. **Realtime Report**

- Active users in last 30 minutes
- Current events being triggered
- Traffic sources

### 2. **Lifecycle Reports**

- **Acquisition**: How users find your site
- **Engagement**: How often they return
- **Monetization**: (if applicable) Revenue tracking
- **Retention**: User retention over time

### 3. **Custom Events**

Filter and view specific events like:

- `view_item` (product clicks)
- `page_view` (page visits)
- `session_start` (website visits)
- `button_click` (button interactions)

### 4. **Audiences**

Create audiences based on:

- User behavior
- Event patterns
- Demographics (if configured)

## Data Collection Requirements

Analytics automatically collects:

- User sessions
- Event timestamps
- Event parameters (product info, page details, etc.)
- Device information
- Browser info

## Console Debug View (Optional)

To see analytics events in real-time in your browser:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run: `firebase debug:browser`
3. Open your app and perform actions
4. Events will appear in the debug console

## Best Practices

1. **Always use meaningful event names** - Use lowercase with underscores
2. **Add relevant parameters** - Include product IDs, prices, page names
3. **Test before deploying** - Verify events in Firebase Console
4. **Monitor performance** - Check that analytics doesn't slow down your site
5. **Respect privacy** - Don't track sensitive user data

## Troubleshooting

### Analytics Not Showing Data?

- ✅ Ensure Firebase credentials are correct in `.env.local`
- ✅ Check browser console for errors
- ✅ Wait 24 hours for initial data to appear in Firebase Console
- ✅ Use Firebase Debug View for real-time verification

### Events Not Being Tracked?

- ✅ Check browser console for "📊 Tracked" or error messages
- ✅ Verify `analytics` object is initialized in `clientApp.ts`
- ✅ Ensure tracking functions are called with valid data

## Next Steps

1. **Deploy to production** to collect real user data
2. **Wait 24 hours** for initial analytics to populate in console
3. **Monitor key metrics** (visits, product clicks)
4. **Add more tracking** as needed for your business goals
5. **Create dashboards** in Firebase for visualization

## Additional Resources

- [Firebase Analytics Documentation](https://firebase.google.com/docs/analytics)
- [Firebase Console](https://console.firebase.google.com)
- [Analytics Events Reference](https://support.google.com/analytics/answer/9234069)
