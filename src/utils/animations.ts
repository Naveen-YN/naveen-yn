export const observeElements = (selector: string, threshold = 0.1) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold }
  );

  const elements = document.querySelectorAll(selector);
  elements.forEach(element => observer.observe(element));

  return () => {
    elements.forEach(element => observer.unobserve(element));
  };
};