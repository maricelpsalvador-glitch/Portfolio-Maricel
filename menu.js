// JavaScript Document

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('floating-menu');

toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Helpers
const qs = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function openModalById(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  // Focus first field
  const firstField = qs('input, textarea, button', overlay);
  firstField && firstField.focus();

  // Close on Escape
  const onKey = (e) => {
    if (e.key === 'Escape') closeModalById(id);
  };
  document.addEventListener('keydown', onKey, { once: true });

  // Close when clicking backdrop
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModalById(id);
  }, { once: true });
}

function closeModalById(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.addEventListener('DOMContentLoaded', () => {
  // Open buttons
  qsa('[data-open]').forEach(btn => {
    btn.addEventListener('click', () => openModalById(btn.dataset.open));
  });

  // Close buttons
  qsa('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.modal-overlay');
      if (overlay) closeModalById(overlay.id);
    });
  });

  // Basic submit handling
  const form = qs('#contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      name: qs('#name').value.trim(),
      email: qs('#email').value.trim(),
      message: qs('#message').value.trim()
    };
    alert(`Thanks, your message was captured:\nName: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`);
    closeModalById('contactModal');
    form.reset();
  });
});