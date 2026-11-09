// Contact details and the "ring on a phone, scroll to the contact section otherwise" behaviour.
// Change the number or address here and every button on the site follows.

export const PHONE_DISPLAY = "01326 231 357";
export const PHONE_TEL = "tel:+441326231357";

// The Contact section at the bottom of the Location page
export const CONTACT_LINK = "/st-anthony-helford-river#contact";

// True on mobile phones (not tablets or computers)
export function isPhone() {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPod|Android.*Mobile|Windows Phone/i.test(navigator.userAgent);
}

// Use as a link's onClick: on a phone it dials, anywhere else the link works as normal
export function callIfPhone(e) {
  if (isPhone()) {
    e.preventDefault();
    window.location.href = PHONE_TEL;
  }
}
