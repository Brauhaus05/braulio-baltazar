/**
 * main.js — Replaces jQuery + webflow.js (~266 KB)
 * 1. Scroll-reveal animations via IntersectionObserver
 * 2. Lazy-load background videos on scroll
 */

(function () {
  'use strict';

  /* ── Scroll-reveal for elements with .scroll-reveal ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  /* ── Lazy-load background videos ── */
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const container = entry.target;
        const video = container.querySelector('video');
        if (!video) return;

        const mp4 = video.dataset.srcMp4;
        const webm = video.dataset.srcWebm;

        if (webm) {
          const srcWebm = document.createElement('source');
          srcWebm.src = webm;
          srcWebm.type = 'video/webm';
          video.appendChild(srcWebm);
        }
        if (mp4) {
          const srcMp4 = document.createElement('source');
          srcMp4.src = mp4;
          srcMp4.type = 'video/mp4';
          video.appendChild(srcMp4);
        }

        video.load();
        video.play().catch(() => {});
        videoObserver.unobserve(container);
      });
    },
    { rootMargin: '200px' }
  );

  document.querySelectorAll('.w-background-video').forEach((el) => {
    videoObserver.observe(el);
  });
})();
