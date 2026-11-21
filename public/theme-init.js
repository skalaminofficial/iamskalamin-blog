(function () {
  try {
    var root = document.documentElement;
    var theme = localStorage.getItem('theme');
    if (theme === 'light' || theme === 'dark') root.setAttribute('data-theme', theme);
    var accent = localStorage.getItem('accent');
    if (accent && accent !== 'blue') root.setAttribute('data-accent', accent);
  } catch (e) {}
})();
