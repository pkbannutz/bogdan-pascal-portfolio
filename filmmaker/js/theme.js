const savedTheme = localStorage.getItem('bp-preview-theme');
document.documentElement.dataset.theme = savedTheme || 'dark';
