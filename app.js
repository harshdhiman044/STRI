// =============================================
// STRI — App Controller
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    const D = window.STRI_DATA;
    renderAspects(D.aspects);
    renderTimeSafety(D.timeSafety, D.timeSafetyExplanation);
    renderDashboardInsight(D.aiInsight);
    renderReviewIntelligence(D.reviews.slice(0, 5));
    renderBreakdown('breakdownBars', D.indexBreakdown);
    renderBreakdown('insightBreakdown', D.indexBreakdown);
    renderMapHotspots(D.hotspots);
    renderHotspotGrid(D.hotspots);
    renderAllReviews(D.reviews);
    renderInsightsPage(D.aiInsight);
    animateScoreOnView();
    updateGreeting();
}

// =============================================
// Navigation
// =============================================

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');

    document.querySelectorAll('.nav-item[data-page]').forEach(n => n.classList.remove('active'));
    document.querySelectorAll(`.nav-item[data-page="${page}"]`).forEach(n => n.classList.add('active'));

    document.querySelectorAll('.mobile-nav-item[data-page]').forEach(n => n.classList.remove('active'));
    document.querySelectorAll(`.mobile-nav-item[data-page="${page}"]`).forEach(n => n.classList.add('active'));

    document.getElementById('mainContent').scrollTop = 0;

    // Re-trigger animations
    const activePage = document.getElementById('page-' + page);
    activePage.querySelectorAll('.animate-slide-up, .animate-fade-in').forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // trigger reflow
        el.style.animation = '';
    });
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('sidebar-open');
}

// =============================================
// Greeting
// =============================================

function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good morning 👋';
    if (hour >= 12 && hour < 17) greeting = 'Good afternoon 👋';
    else if (hour >= 17 && hour < 21) greeting = 'Good evening 👋';
    else if (hour >= 21 || hour < 5) greeting = 'Good night 👋';
    document.querySelector('.greeting').textContent = greeting;
}

// =============================================
// Safety Aspects
// =============================================

function renderAspects(aspects) {
    const grid = document.getElementById('aspectsGrid');
    grid.innerHTML = aspects.map(a => `
        <div class="aspect-card aspect-${a.sentiment}" onclick="filterReviews('${a.id}'); navigateTo('community');">
            <div class="aspect-icon">${a.icon}</div>
            <h4 class="aspect-name">${a.name}</h4>
            <span class="badge badge-${a.sentiment}">${capitalize(a.sentiment)}</span>
            <p class="aspect-mentions">${a.mentions} mentions</p>
        </div>
    `).join('');
}

// =============================================
// Time-Based Safety
// =============================================

function renderTimeSafety(times, explanation) {
    const grid = document.getElementById('timeGrid');
    grid.innerHTML = times.map(t => `
        <div class="time-card time-${t.sentiment}">
            <div class="time-icon">${t.icon}</div>
            <h4 class="time-period">${t.period}</h4>
            <p class="time-range">${t.time}</p>
            <div class="time-score time-score-${t.sentiment}">
                <span class="time-score-value">${t.score}</span>
                <span class="time-score-max">/ 100</span>
            </div>
            <p class="time-description">${t.description}</p>
        </div>
    `).join('');
    document.getElementById('timeExplanationText').textContent = explanation;
}

// =============================================
// Dashboard AI Insight
// =============================================

function renderDashboardInsight(insight) {
    document.getElementById('insightSummary').textContent = insight.summary;
    document.getElementById('insightConcerns').innerHTML = insight.concerns.slice(0, 3).map(c => `<li>${c}</li>`).join('');
    document.getElementById('insightPositives').innerHTML = insight.positives.slice(0, 3).map(p => `<li>${p}</li>`).join('');
}

// =============================================
// Review Intelligence (Analyze page)
// =============================================

function renderReviewIntelligence(reviews) {
    const container = document.getElementById('reviewIntelligence');
    container.innerHTML = reviews.map((r, i) => `
        <div class="review-intel-card animate-slide-up stagger-${i + 1}">
            <div class="review-intel-header">
                <span class="review-number">REVIEW ${String(i + 1).padStart(2, '0')}</span>
                <span class="badge badge-${r.sentiment}">${capitalize(r.sentiment)}</span>
            </div>
            <blockquote class="review-text">"${r.text}"</blockquote>
            <div class="review-aspects">
                <span class="review-aspects-label">AI detected:</span>
                ${r.aspects.map(a => `
                    <span class="aspect-tag aspect-tag-${a.sentiment}">
                        ${a.name} — ${capitalize(a.sentiment)}
                    </span>
                `).join('')}
            </div>
            <div class="review-meta">
                <span class="review-confidence">AI Confidence: <strong>${r.confidence}%</strong></span>
            </div>
        </div>
    `).join('');
}

// =============================================
// Breakdown Bars
// =============================================

function renderBreakdown(containerId, breakdown) {
    const container = document.getElementById(containerId);
    container.innerHTML = breakdown.map(b => {
        const isPositive = b.impact > 0;
        const width = Math.abs(b.impact) * 3;
        return `
            <div class="breakdown-row">
                <span class="breakdown-factor">${b.factor}</span>
                <div class="breakdown-bar-container">
                    <div class="breakdown-bar ${isPositive ? 'bar-positive' : 'bar-negative'}" style="width: ${width}%"></div>
                </div>
                <span class="breakdown-impact ${isPositive ? 'text-positive' : 'text-negative'}">${isPositive ? '+' : ''}${b.impact}</span>
            </div>
        `;
    }).join('');
}

// =============================================
// Map
// =============================================

function renderMapHotspots(hotspots) {
    const svg = document.getElementById('mapSvg');

    // Map coordinates: position hotspots on the SVG
    const positions = [
        { x: 280, y: 150 },   // Main Market
        { x: 440, y: 220 },   // College Road
        { x: 560, y: 280 },   // Bus Stand Crossing
        { x: 360, y: 350 },   // Residential Road
    ];

    hotspots.forEach((h, i) => {
        const pos = positions[i];
        const color = h.sentiment === 'positive' ? '#10b981' : h.sentiment === 'negative' ? '#ef4444' : '#f59e0b';

        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'map-hotspot-group');
        group.setAttribute('cursor', 'pointer');
        group.setAttribute('onclick', `showHotspot('${h.id}')`);

        // Pulse ring
        const pulseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pulseCircle.setAttribute('cx', pos.x);
        pulseCircle.setAttribute('cy', pos.y);
        pulseCircle.setAttribute('r', '18');
        pulseCircle.setAttribute('fill', color);
        pulseCircle.setAttribute('opacity', '0.2');
        pulseCircle.innerHTML = `<animate attributeName="r" values="18;28;18" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.3;0.05;0.3" dur="2s" repeatCount="indefinite"/>`;

        // Main dot
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('r', '10');
        circle.setAttribute('fill', color);
        circle.setAttribute('filter', 'url(#glow)');

        // Score text
        const scoreText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        scoreText.setAttribute('x', pos.x);
        scoreText.setAttribute('y', pos.y + 4);
        scoreText.setAttribute('text-anchor', 'middle');
        scoreText.setAttribute('fill', 'white');
        scoreText.setAttribute('font-size', '9');
        scoreText.setAttribute('font-weight', '700');
        scoreText.setAttribute('font-family', 'Inter');
        scoreText.textContent = h.score;

        // Label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', pos.x);
        label.setAttribute('y', pos.y + 28);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('fill', '#1e293b');
        label.setAttribute('font-size', '11');
        label.setAttribute('font-weight', '600');
        label.setAttribute('font-family', 'Inter');
        label.textContent = h.name;

        group.appendChild(pulseCircle);
        group.appendChild(circle);
        group.appendChild(scoreText);
        group.appendChild(label);
        svg.appendChild(group);
    });
}

function showHotspot(id) {
    const D = window.STRI_DATA;
    const h = D.hotspots.find(x => x.id === id);
    if (!h) return;

    const detail = document.getElementById('hotspotDetail');
    detail.style.display = 'block';

    document.getElementById('hotspotName').textContent = h.name;
    document.getElementById('hotspotScore').textContent = h.score;
    document.getElementById('hotspotOpinions').textContent = h.opinions + ' opinions analyzed';
    document.getElementById('hotspotDescription').textContent = h.description;

    const badge = document.getElementById('hotspotBadge');
    badge.textContent = h.sentiment === 'positive' ? '🟢' : h.sentiment === 'negative' ? '🔴' : '🟡';
    badge.className = `badge badge-${h.sentiment}`;

    document.getElementById('hotspotConcerns').innerHTML = h.concerns.length ? `
        <h4 class="mt-2 text-negative">Main concerns</h4>
        <ul class="hotspot-list">${h.concerns.map(c => `<li>🔴 ${c}</li>`).join('')}</ul>
    ` : '';

    document.getElementById('hotspotPositives').innerHTML = h.positives.length ? `
        <h4 class="mt-2 text-positive">Positive signals</h4>
        <ul class="hotspot-list">${h.positives.map(p => `<li>🟢 ${p}</li>`).join('')}</ul>
    ` : '';

    detail.classList.add('animate-slide-up');
}

function closeHotspot() {
    document.getElementById('hotspotDetail').style.display = 'none';
}

function renderHotspotGrid(hotspots) {
    const grid = document.getElementById('hotspotGrid');
    grid.innerHTML = hotspots.map(h => {
        const color = h.sentiment === 'positive' ? 'positive' : h.sentiment === 'negative' ? 'negative' : 'mixed';
        return `
            <div class="card hotspot-card hotspot-card-${color}" onclick="showHotspot('${h.id}'); document.getElementById('mapContainer').scrollIntoView({behavior:'smooth'})">
                <div class="hotspot-card-header">
                    <h4>${h.name}</h4>
                    <div class="hotspot-card-score score-${color}">${h.score} <span class="text-secondary">/ 100</span></div>
                </div>
                <p class="text-secondary">${h.description}</p>
                <span class="badge badge-${color}">${h.opinions} opinions</span>
            </div>
        `;
    }).join('');
}

// =============================================
// Community Reviews
// =============================================

const ASPECT_FILTER_MAP = {
    lighting: ['Street Lighting'],
    night: ['Night Safety', 'Night Activity', 'Daytime Safety'],
    traffic: ['Traffic'],
    crowd: ['Crowd Density'],
    walkability: ['Walkability'],
    crossing: ['Crossing Safety'],
    road: ['Road Condition'],
    activity: ['Public Activity']
};

function renderAllReviews(reviews, filter = 'all') {
    const feed = document.getElementById('reviewsFeed');
    let filtered = reviews;

    if (filter === 'positive' || filter === 'negative' || filter === 'neutral' || filter === 'mixed') {
        filtered = reviews.filter(r => r.sentiment === filter);
    } else if (ASPECT_FILTER_MAP[filter]) {
        const aspectNames = ASPECT_FILTER_MAP[filter];
        filtered = reviews.filter(r => r.aspects.some(a => aspectNames.some(name => a.name.toLowerCase().includes(name.toLowerCase()))));
    }

    if (filtered.length === 0) {
        feed.innerHTML = '<div class="card"><p class="text-secondary text-center">No reviews match this filter.</p></div>';
        return;
    }

    feed.innerHTML = filtered.map((r, i) => `
        <div class="review-card animate-slide-up" style="animation-delay: ${i * 0.05}s">
            <div class="review-card-header">
                <div class="review-member">
                    <div class="member-avatar">${getInitials(r.memberId)}</div>
                    <div>
                        <span class="member-name">Community Member #${r.memberId}</span>
                        <span class="review-meta-info">${r.timePeriod} · ${r.area}</span>
                    </div>
                </div>
                <span class="badge badge-${r.sentiment}">${capitalize(r.sentiment)}</span>
            </div>
            <blockquote class="review-text">"${r.text}"</blockquote>
            <div class="review-aspects">
                ${r.aspects.map(a => `
                    <span class="aspect-tag aspect-tag-${a.sentiment}">
                        ${a.name} — ${capitalize(a.sentiment)}
                    </span>
                `).join('')}
            </div>
            <div class="review-footer">
                <span class="review-confidence">AI Confidence: <strong>${r.confidence}%</strong></span>
            </div>
        </div>
    `).join('');
}

function filterReviews(filter) {
    // Update active chip
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    const chip = document.querySelector(`.filter-chip[data-filter="${filter}"]`);
    if (chip) chip.classList.add('active');

    renderAllReviews(window.STRI_DATA.reviews, filter);
}

// =============================================
// Insights Page
// =============================================

function renderInsightsPage(insight) {
    document.getElementById('topConcerns').innerHTML = insight.concerns.map((c, i) => `
        <div class="numbered-item">
            <span class="item-number">${i + 1}</span>
            <span>${c}</span>
        </div>
    `).join('');

    document.getElementById('positiveSignals').innerHTML = insight.positives.map((p, i) => `
        <div class="numbered-item">
            <span class="item-number item-number-positive">${i + 1}</span>
            <span>${p}</span>
        </div>
    `).join('');

    document.getElementById('emergingTrend').textContent = insight.emergingTrend;
    document.getElementById('aiRecommendation').textContent = insight.recommendation;
}

// =============================================
// Analysis Animation
// =============================================

function startAnalysis() {
    const location = document.getElementById('locationInput').value || 'Mullana → Ambala Cantt';
    document.getElementById('analyzeLocation').textContent = location;

    navigateTo('analyze');

    // Show processing, hide results
    const processing = document.getElementById('aiProcessing');
    const status = document.getElementById('analysisStatus');
    processing.style.display = 'block';
    status.style.display = 'none';

    // Reset steps
    processing.querySelectorAll('.processing-step').forEach(step => {
        step.classList.remove('step-done');
        step.querySelector('.step-icon').textContent = '⏳';
    });

    // Animate steps
    const steps = processing.querySelectorAll('.processing-step');
    steps.forEach((step, i) => {
        setTimeout(() => {
            step.classList.add('step-done');
            step.querySelector('.step-icon').textContent = '✓';
        }, 600 + i * 500);
    });

    // Complete
    setTimeout(() => {
        processing.style.display = 'none';
        status.style.display = 'block';
        status.classList.add('animate-fade-in');
    }, 600 + steps.length * 500 + 400);
}

// =============================================
// Score Animation
// =============================================

function animateScoreOnView() {
    const scoreEl = document.getElementById('scoreValue');
    if (!scoreEl) return;
    let current = 0;
    const target = 72;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        scoreEl.textContent = Math.round(current);
    }, 16);
}

// =============================================
// Journey Mode
// =============================================

let journeyTimer = null;

function startJourney() {
    document.getElementById('journeyInactive').style.display = 'none';
    document.getElementById('journeyActive').style.display = 'block';
    document.getElementById('journeyEmergency').style.display = 'none';

    let seconds = 299; // 4:59
    const countdown = document.getElementById('journeyCountdown');
    journeyTimer = setInterval(() => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        countdown.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        seconds--;
        if (seconds < 0) {
            clearInterval(journeyTimer);
            showToast('Check-in time! Are you safe?', 'info');
        }
    }, 1000);

    showToast('Safe journey started. Check-in reminder in 5 minutes.', 'success');
}

function confirmSafe() {
    clearInterval(journeyTimer);
    showToast('Great! Stay safe. Next check-in in 5 minutes.', 'success');
    startJourney(); // restart timer
}

function triggerEmergency() {
    clearInterval(journeyTimer);
    document.getElementById('journeyActive').style.display = 'none';
    document.getElementById('journeyEmergency').style.display = 'block';
}

function resetJourney() {
    clearInterval(journeyTimer);
    document.getElementById('journeyInactive').style.display = 'block';
    document.getElementById('journeyActive').style.display = 'none';
    document.getElementById('journeyEmergency').style.display = 'none';
}

// =============================================
// Report Modal
// =============================================

function openReportModal() {
    document.getElementById('reportModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeReportModal(e) {
    if (e && e.target !== document.getElementById('reportModal')) return;
    document.getElementById('reportModal').style.display = 'none';
    document.body.style.overflow = '';
}

function submitReport() {
    const loc = document.getElementById('reportLocation').value;
    const cat = document.getElementById('reportCategory').value;
    const desc = document.getElementById('reportDescription').value;

    if (!loc || !cat || !desc) {
        showToast('Please fill in all fields.', 'info');
        return;
    }

    closeReportModal();
    showToast('✓ Community report added. Thank you for contributing to safer roads.', 'success');

    // Clear form
    document.getElementById('reportLocation').value = '';
    document.getElementById('reportCategory').value = '';
    document.getElementById('reportDescription').value = '';
}

// =============================================
// Toast Notifications
// =============================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// =============================================
// Utilities
// =============================================

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getInitials(id) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[id % 26] + letters[(id * 7 + 3) % 26];
}
