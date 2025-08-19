/* Lightweight gtag helpers for Google Ads/Analytics events.
 * If you have a Google Ads conversion label, set ADS_CONVERSION_LABEL below
 * in the format "AW-17486244338/XXXXXXXXXXX" to report conversions.
 */

// Set your Google Ads conversion label here when available
const ADS_CONVERSION_LABEL: string | undefined = undefined;

// Basic safe wrapper
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  try {
    // @ts-ignore - gtag is attached globally by index.html
    window.gtag?.('event', eventName, params);
  } catch {
    // no-op
  }
}

// Common events
export function trackStartEligibility(context: string): void {
  trackEvent('start_eligibility', { context });
}

export function trackEligibilitySuccess(amount?: number): void {
  trackEvent('eligibility_success', { amount });
}

export function trackProceedToClaim(): void {
  trackEvent('proceed_to_claim');
}

export function trackSubmitClaim(): void {
  // If you provide a conversion label, this will report to Google Ads
  if (ADS_CONVERSION_LABEL) {
    trackEvent('conversion', { send_to: ADS_CONVERSION_LABEL });
  }
  // Always send an analytics event as well
  trackEvent('submit_claim');
}

export function trackWithdrawalAttempt(amount?: number): void {
  trackEvent('withdrawal_attempt', { amount });
}

export function trackFinishRegistrationClick(): void {
  trackEvent('finish_registration_click');
}
