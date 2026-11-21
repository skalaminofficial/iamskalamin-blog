(function () {
  var lang = (navigator.language || 'en').toLowerCase();
  location.replace(lang.indexOf('bn') === 0 ? '/bn/' : '/en/');
})();
