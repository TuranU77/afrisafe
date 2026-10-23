// Reload starts at the top, including when an in-page anchor is in the URL.
if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
  const resetScroll = () => window.scrollTo({top: 0, left: 0, behavior: 'instant'});
  resetScroll();
  window.addEventListener('pageshow', resetScroll, {once: true});
}
