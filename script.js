/*
 * Contact helpers. The "Contact us" link already opens Gmail on its own (plain link,
 * target="_blank"), so it works even if this file fails to load. This script only adds
 * copying the address to the clipboard. It never blocks or delays the navigation.
 */
(function () {
  "use strict";

  var EMAIL = "Bart@warsawwp.com";
  var button = document.getElementById("contact-button");
  var copyBtn = document.getElementById("copy-email");
  var status = document.getElementById("copy-status");
  var timer = null;

  function legacyCopy(text) {
    // Fallback for browsers without the async Clipboard API (older iOS Safari, non-secure contexts)
    var ok = false;
    var area = document.createElement("textarea");
    try {
      area.value = text;
      area.setAttribute("readonly", "");
      area.setAttribute("aria-hidden", "true");
      area.className = "clip-buffer";
      document.body.appendChild(area);
      area.focus();
      area.select();
      area.setSelectionRange(0, text.length);
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    if (area.parentNode) area.parentNode.removeChild(area);
    return ok;
  }

  // Resolves true/false; never rejects and never throws.
  function copyText(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
        return navigator.clipboard.writeText(text).then(
          function () { return true; },
          function () { return legacyCopy(text); }
        );
      }
    } catch (e) { /* fall through */ }
    return Promise.resolve(legacyCopy(text));
  }

  function showCopied() {
    if (!status) return;
    status.textContent = "Email copied!";
    if (copyBtn) copyBtn.classList.add("is-copied");
    clearTimeout(timer);
    timer = setTimeout(function () {
      status.textContent = "";
      if (copyBtn) copyBtn.classList.remove("is-copied");
    }, 2600);
  }

  function copyAndConfirm() {
    copyText(EMAIL).then(function (ok) { if (ok) showCopied(); });
  }

  // Contact button: copy in the same click; the link's own navigation opens Gmail.
  if (button) button.addEventListener("click", copyAndConfirm);

  // Copy icon next to the visible address.
  if (copyBtn) copyBtn.addEventListener("click", copyAndConfirm);
})();
