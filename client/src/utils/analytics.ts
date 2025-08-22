export function trackEvent(event: string, data?: Record<string, any>) {
  // Example: send to backend or analytics provider
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, ...data, timestamp: Date.now() })
  });
} 