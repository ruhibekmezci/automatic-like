// OTOMATİK BEĞENİ (Chrome Console)
// Kullanım: konsola yapıştır ve çalıştır.
// Durdurmak için konsola: window.stopAutoLike = true

(async function autoLike({
	selectorHints = [
		'button[aria-label*="Like"]',
		'button[aria-label*="Beğen"]',
		'button[class*="like"]',
		'button[class*="Like"]',
		'button[class*="reaction"]',
		'.like-button',
		'.btn-like',
		'.reaction-like',
		'a[aria-label*="Like"]',
		'div[role="button"][aria-pressed="false"]' // riskli genel seçici — dikkat
	],
	maxClicks = 30,
	minDelayMs = 700,
	maxDelayMs = 1800,
	clickVisibleOnly = true
} = {}) {

	window.stopAutoLike = false;
	const sleep = ms => new Promise(r => setTimeout(r, ms));
	const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

	// toplayıcı: hint'lere göre butonları bul
	const gatherButtons = () => {
		const set = new Set();
		selectorHints.forEach(sel => {
			try {
				document.querySelectorAll(sel).forEach(el => set.add(el));
			} catch (e) {}
		});
		// filtre: görünür ve tıklanabilir
		return Array.from(set).filter(el => {
			if (!el) return false;
			if (clickVisibleOnly) {
				const rect = el.getBoundingClientRect();
				if (rect.width === 0 && rect.height === 0) return false;
				if (getComputedStyle(el).visibility === 'hidden') return false;
			}
			return true;
		});
	};

	let buttons = gatherButtons();
	if (!buttons.length) {
		console.warn('Hiç beğeni butonu bulunamadı. selectorHints dizisini güncelle.');
		console.log('Öneri: sayfada beğen düğmesinin CSS sınıfını veya aria-label değerini tespit edip selectorHints içine ekle.');
		return;
	}

	console.log('Bulunan olası buton sayısı:', buttons.length);
	let clicks = 0;

	for (let i = 0; i < buttons.length && clicks < maxClicks; i++) {
		if (window.stopAutoLike) {
			console.log('Kullanıcı tarafından durduruldu.');
			break;
		}
		const btn = buttons[i];
		try {
			// ekstra kontrol: buton hâli hazırda "liked" değilse tıkla (basit heuristik)
			const ariaPressed = btn.getAttribute && btn.getAttribute('aria-pressed');
			if (ariaPressed === 'true') {
				console.log(`Atlandı (zaten beğenilmiş):`, btn);
				continue;
			}
			// tıklama
			btn.scrollIntoView({
				block: 'center',
				inline: 'center'
			});
			await sleep(rand(120, 350)); // küçük bekleme -> daha doğal
			btn.click();
			clicks++;
			console.log(`Tıklandı #${clicks}:`, btn);
		} catch (e) {
			console.error('Tıklama hatası:', e, btn);
		}
		await sleep(rand(minDelayMs, maxDelayMs));
		// istersen buton listesini yenileyebilirsin:
		// buttons = gatherButtons();
	}

	console.log('Bitti. Toplam tıklama:', clicks);
	// temizleme
	delete window.stopAutoLike;
})();