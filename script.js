// Interactive CV script
document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroContent = document.getElementById('heroContent');

  // templates
  const tpl = {
    info: document.getElementById('tpl-info').content,
    career: document.getElementById('tpl-career').content,
    skills: document.getElementById('tpl-skills').content,
    projects: document.getElementById('tpl-projects').content,
    contact: document.getElementById('tpl-contact').content
  };

  // initial state
  let current = 'info';
  function setContent(key) {
    if(!tpl[key]) return;

    // update active menu UI
    menuItems.forEach(mi => mi.classList.toggle('active', mi.dataset.target === key));

    // smooth fade out, replace content, fade in
    heroContent.classList.add('fade-out');
    heroContent.classList.remove('fade-in');

    setTimeout(() => {
      // clear
      heroContent.innerHTML = '';
      // clone template nodes
      const clone = tpl[key].cloneNode(true);
      heroContent.appendChild(clone);

      // special title/subtitle updates for some sections
      if(key === 'info') {
        heroTitle.textContent = 'Nguyễn Công Thành';
      } else if(key === 'career') {
        heroTitle.textContent = 'Mục tiêu nghề nghiệp';
        heroSubtitle.textContent = '';
      } else if(key === 'skills') {
        heroTitle.textContent = 'Kỹ năng';
      } else if(key === 'projects') {
        heroTitle.textContent = 'Dự án';
      } else if(key === 'contact') {
        heroTitle.textContent = 'Liên hệ';
      }

      // animate fills for skill bars (if present)
      document.querySelectorAll('.skill-fill').forEach(el => {
        const w = getComputedStyle(el).getPropertyValue('--w') || el.style.getPropertyValue('--w') || el.getAttribute('style') || '80%';
        // support --w inline style
        const varW = el.style.getPropertyValue('--w') || el.getAttribute('style') || '';
        let width = el.style.getPropertyValue('--w') || el.getAttribute('style') || '';
        // simpler: read --w from style attribute
        const style = el.getAttribute('style') || '';
        const match = style.match(/--w\s*:\s*([0-9]+%)/);
        const finalW = match ? match[1] : (el.dataset.width || '80%');
        // set actual width
        el.style.width = finalW;
      });

      // fade in
      heroContent.classList.remove('fade-out');
      heroContent.classList.add('fade-in');

    }, 220);
  }

  // click handlers
  menuItems.forEach(mi => {
    mi.addEventListener('click', (e) => {
      const key = mi.dataset.target;
      if(key === current) return;
      current = key;
      setContent(key);
    });
  });

  // initial render
  setContent(current);

  // THEME toggle: simple localStorage-based toggle between dark and lighter variant
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  }
  );
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.progress').forEach(el => {
    const pct = (el.dataset.percent || el.textContent.trim()).replace('%','').trim();
    if(!pct) return;
    // delay nhỏ để thấy animation
    setTimeout(() => { el.style.width = pct + '%'; }, 120);
  });
});
