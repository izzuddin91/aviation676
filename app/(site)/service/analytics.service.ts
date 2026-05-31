"use client";
import { logEvent, Analytics } from 'firebase/analytics';
import { analytics as firebaseAnalytics } from '@/app/clientApp';

const analytics = firebaseAnalytics as Analytics | null;

/**
 * Track page views
 */
export const trackPageView = (pageName: string, pagePath: string) => {
    if (!analytics) return;

    try {
        (logEvent as any)(analytics, 'page_view', {
            page_title: pageName,
            page_path: pagePath,
            timestamp: new Date().toISOString(),
        });
        console.log(`📊 Page view tracked: ${pageName} (${pagePath})`);
    } catch (error) {
        console.error('Error tracking page view:', error);
    }
};

/**
 * Track product clicks/views
 */
export const trackProductClick = (productId: number, productTitle: string, price: number) => {
    if (!analytics) return;

    try {
        (logEvent as any)(analytics, 'view_item', {
            items: [
                {
                    item_id: productId.toString(),
                    item_name: productTitle,
                    price: price,
                    timestamp: new Date().toISOString(),
                }
            ],
            value: price,
            currency: 'MYR',
        });
        console.log(`🛍️ Product clicked: ${productTitle} (ID: ${productId})`);
    } catch (error) {
        console.error('Error tracking product click:', error);
    }
};

/**
 * Track custom events
 */
export const trackCustomEvent = (eventName: string, eventData: Record<string, any>) => {
    if (!analytics) return;

    try {
        (logEvent as any)(analytics, eventName, eventData);
        console.log(`📈 Custom event tracked: ${eventName}`, eventData);
    } catch (error) {
        console.error('Error tracking custom event:', error);
    }
};

/**
 * Track website visits (session start)
 */
export const trackSessionStart = (source: string = 'direct') => {
    if (!analytics) return;

    try {
        (logEvent as any)(analytics, 'session_start', {
            source: source,
            timestamp: new Date().toISOString(),
        });
        console.log(`👤 Session started from: ${source}`);
    } catch (error) {
        console.error('Error tracking session start:', error);
    }
};

/**
 * Track button/link clicks
 */
export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
    if (!analytics) return;

    try {
        (logEvent as any)(analytics, 'button_click', {
            button_name: buttonName,
            location: buttonLocation,
            timestamp: new Date().toISOString(),
        });
        console.log(`🔘 Button clicked: ${buttonName} (${buttonLocation})`);
    } catch (error) {
        console.error('Error tracking button click:', error);
    }
};
