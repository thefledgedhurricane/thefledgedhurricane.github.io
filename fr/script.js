// Reserved for progressive enhancements. The site works without JavaScript.

document.querySelectorAll('[data-viz-bar]').forEach((bar) => {
	const value = Number.parseInt(bar.dataset.value || '0', 10);
	const fill = bar.querySelector('.bar-fill');

	if (!fill || Number.isNaN(value)) {
		return;
	}

	fill.style.width = `${Math.max(0, Math.min(value, 100))}%`;
});
