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
    initAmbalaLeafletMap();
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

    if (page === 'map') {
        setTimeout(() => {
            if (ambalaMap) {
                ambalaMap.invalidateSize();
            }
        }, 200);
    }
}

// =============================================
// Interactive Leaflet & GPS System (Haryana State)
// =============================================

let ambalaMap = null;
let userGpsMarker = null;
let userGpsAccuracyCircle = null;
let leafletMarkers = {};

const HARYANA_CITIES_COORDS = {
    'Ambala': [30.3600, 76.8100],
    'Panchkula': [30.6942, 76.8606],
    'Kurukshetra': [29.9695, 76.8344],
    'Karnal': [29.6857, 76.9905],
    'Panipat': [29.3909, 76.9635],
    'Sonipat': [28.9931, 77.0151],
    'Gurugram': [28.4897, 77.0890],
    'Faridabad': [28.3970, 77.3100],
    'Rohtak': [28.8955, 76.6066],
    'Hisar': [29.1492, 75.7217]
};

function initAmbalaLeafletMap() {
    if (typeof L === 'undefined') return;
    const mapElement = document.getElementById('ambalaLeafletMap');
    if (!mapElement || ambalaMap) return;

    const D = window.STRI_DATA;
    const bounds = D.haryanaBounds;

    const southWest = L.latLng(bounds.bounds[0][0], bounds.bounds[0][1]);
    const northEast = L.latLng(bounds.bounds[1][0], bounds.bounds[1][1]);
    const haryanaStateBounds = L.latLngBounds(southWest, northEast);

    ambalaMap = L.map('ambalaLeafletMap', {
        center: bounds.center,
        zoom: bounds.zoom,
        minZoom: bounds.minZoom,
        maxZoom: bounds.maxZoom,
        maxBounds: haryanaStateBounds,
        maxBoundsViscosity: 0.9,
        attributionControl: true
    });

    // Clean modern vector tile layer (CartoDB Voyager) with OSM fallback
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(ambalaMap);

    // Haryana State boundary highlight polygon
    const haryanaBoundaryPolygon = L.polygon([
        [30.9000, 76.8500], // Panchkula / Kalka
        [30.5000, 77.4000], // Yamunanagar
        [29.7000, 77.1500], // Karnal Yamuna border
        [28.8000, 77.2500], // Delhi border North
        [28.3000, 77.5000], // Faridabad/Palwal
        [27.7000, 77.3000], // Nuh / Mewat South
        [27.9000, 76.1000], // Mahendragarh/Narnaul
        [28.6000, 75.8000], // Bhiwani/Charkhi Dadri
        [29.4000, 74.8000], // Sirsa West
        [30.0000, 75.3000], // Fatehabad
        [30.5000, 76.4000]  // Ambala / Punjab border
    ], {
        color: '#6366f1',
        weight: 2.5,
        dashArray: '6, 8',
        fillColor: '#6366f1',
        fillOpacity: 0.04
    }).addTo(ambalaMap);

    haryanaBoundaryPolygon.bindTooltip('Haryana State Safety Grid (22 Districts)', { permanent: false, direction: 'center' });

    // Render each hotspot as a custom sentiment pin
    D.hotspots.forEach(h => {
        const sentimentClass = h.sentiment === 'positive' ? 'stri-marker-positive' : h.sentiment === 'negative' ? 'stri-marker-negative' : 'stri-marker-mixed';
        
        const customIcon = L.divIcon({
            className: 'stri-leaflet-marker',
            html: `
                <div class="stri-marker-badge ${sentimentClass}">
                    <span>${h.score}</span>
                </div>
                <div class="stri-marker-tip"></div>
            `,
            iconSize: [38, 32],
            iconAnchor: [19, 32],
            popupAnchor: [0, -30]
        });

        const marker = L.marker([h.lat, h.lng], { icon: customIcon }).addTo(ambalaMap);
        leafletMarkers[h.id] = marker;

        const popupContent = `
            <div style="font-family: Inter, sans-serif; min-width: 200px; padding: 4px;">
                <div style="font-size: 10px; font-weight: 700; color: #6366f1; text-transform: uppercase;">${h.city || 'Haryana'} District</div>
                <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 2px;">${h.name}</div>
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                    <span style="font-weight: 800; font-size: 15px; color: ${h.sentiment === 'positive' ? '#10b981' : h.sentiment === 'negative' ? '#ef4444' : '#f59e0b'};">${h.score}/100</span>
                    <span style="font-size: 11px; color: #64748b;">${h.opinions} opinions</span>
                </div>
                <div style="font-size: 11px; color: #475569; margin-bottom: 8px;">${h.description}</div>
                <div style="display:flex; gap: 4px;">
                    <button onclick="showHotspot('${h.id}')" style="background:#6366f1; color:white; border:none; padding:5px 9px; border-radius:6px; font-size:10px; font-weight:700; cursor:pointer;">Inspect Details</button>
                    <a href="https://www.google.com/maps/search/?api=1&query=${h.lat},${h.lng}" target="_blank" style="background:#0f172a; color:white; text-decoration:none; padding:5px 9px; border-radius:6px; font-size:10px; font-weight:700;">Google Maps ↗</a>
                </div>
            </div>
        `;

        marker.bindPopup(popupContent);

        marker.on('click', () => {
            showHotspot(h.id);
        });

        // Pulsing safety radius circle
        const circleColor = h.sentiment === 'positive' ? '#10b981' : h.sentiment === 'negative' ? '#ef4444' : '#f59e0b';
        L.circle([h.lat, h.lng], {
            color: circleColor,
            fillColor: circleColor,
            fillOpacity: 0.12,
            radius: 600
        }).addTo(ambalaMap);
    });
}

function focusHaryanaCity(city) {
    document.querySelectorAll('.city-pill').forEach(p => p.classList.remove('active'));
    const targetPill = event && event.target ? event.target : document.querySelector(`.city-pill[onclick*="${city}"]`);
    if (targetPill) targetPill.classList.add('active');

    if (!ambalaMap) {
        initAmbalaLeafletMap();
    }
    if (!ambalaMap) return;

    const D = window.STRI_DATA;

    if (city === 'all') {
        ambalaMap.setView(D.haryanaBounds.center, D.haryanaBounds.zoom, { animate: true });
        showToast('Viewing full Haryana State GPS Safety Grid.', 'info');
    } else if (HARYANA_CITIES_COORDS[city]) {
        const coords = HARYANA_CITIES_COORDS[city];
        ambalaMap.setView(coords, 13, { animate: true });

        // Find the hotspot in that city and open it
        const cityHotspot = D.hotspots.find(h => h.city === city);
        if (cityHotspot && leafletMarkers[cityHotspot.id]) {
            setTimeout(() => {
                leafletMarkers[cityHotspot.id].openPopup();
                showHotspot(cityHotspot.id);
            }, 300);
        }
        showToast(`📍 Focused on ${city}, Haryana.`, 'info');
    }
}

function getUserLiveLocation() {
    const locateBtn = document.getElementById('gpsLocateBtn');
    const btnText = document.getElementById('gpsBtnText');
    const statusText = document.getElementById('gpsStatusText');

    if (!navigator.geolocation) {
        showToast('Geolocation is not supported by your browser.', 'info');
        return;
    }

    btnText.textContent = 'Acquiring GPS...';
    statusText.textContent = 'Locating in Haryana...';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const accuracy = Math.round(position.coords.accuracy || 8);

            btnText.textContent = 'Live GPS Active';
            statusText.textContent = `Haryana GPS: ±${accuracy}m accuracy`;

            // Update emergency panel coordinates
            const emergencyCoords = document.getElementById('emergencyCoords');
            if (emergencyCoords) {
                emergencyCoords.textContent = `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`;
            }

            if (!ambalaMap) {
                initAmbalaLeafletMap();
            }

            if (ambalaMap) {
                if (userGpsMarker) {
                    ambalaMap.removeLayer(userGpsMarker);
                }
                if (userGpsAccuracyCircle) {
                    ambalaMap.removeLayer(userGpsAccuracyCircle);
                }

                // Add live user GPS marker
                const userIcon = L.divIcon({
                    className: 'stri-gps-user-wrapper',
                    html: '<div class="stri-gps-user-marker"></div>',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                });

                userGpsMarker = L.marker([lat, lng], { icon: userIcon }).addTo(ambalaMap);
                userGpsMarker.bindPopup(`
                    <div style="font-family: Inter, sans-serif; font-size: 12px; padding: 4px;">
                        <strong style="color: #3b82f6;">📍 Your Current Live Location</strong><br>
                        <span>Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}</span><br>
                        <span style="font-size: 10px; color: #64748b;">GPS Accuracy: ±${accuracy}m</span>
                    </div>
                `).openPopup();

                userGpsAccuracyCircle = L.circle([lat, lng], {
                    radius: accuracy,
                    color: '#3b82f6',
                    fillColor: '#3b82f6',
                    fillOpacity: 0.15,
                    weight: 1.5
                }).addTo(ambalaMap);

                // Find nearest hotspot in Haryana
                const D = window.STRI_DATA;
                let nearestHotspot = null;
                let minDistance = Infinity;

                D.hotspots.forEach(h => {
                    const dist = calculateDistanceKm(lat, lng, h.lat, h.lng);
                    if (dist < minDistance) {
                        minDistance = dist;
                        nearestHotspot = h;
                    }
                });

                // Pan smoothly to user location
                ambalaMap.setView([lat, lng], 14, { animate: true });

                if (nearestHotspot) {
                    showToast(`📍 Live GPS pinned! Nearest STRI Hub: ${nearestHotspot.name} (${minDistance} km away).`, 'success');
                } else {
                    showToast(`📍 Live GPS pinned successfully in Haryana (±${accuracy}m accuracy).`, 'success');
                }
            }
        },
        (error) => {
            console.warn('GPS Error:', error);
            btnText.textContent = 'Track Live GPS';
            statusText.textContent = 'Simulated Haryana GPS';
            showToast('Simulated GPS Active: Centered across Haryana State.', 'info');

            if (ambalaMap) {
                ambalaMap.setView([29.4500, 76.7500], 8);
            }
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
}

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
}

function switchMapView(mode) {
    const streetContainer = document.getElementById('interactiveMapContainer');
    const radarContainer = document.getElementById('vectorMapContainer');
    const btnStreet = document.getElementById('btnStreetView');
    const btnRadar = document.getElementById('btnRadarView');

    if (mode === 'street') {
        streetContainer.style.display = 'block';
        radarContainer.style.display = 'none';
        btnStreet.classList.add('active');
        btnRadar.classList.remove('active');

        if (!ambalaMap) {
            initAmbalaLeafletMap();
        } else {
            setTimeout(() => ambalaMap.invalidateSize(), 150);
        }
    } else {
        streetContainer.style.display = 'none';
        radarContainer.style.display = 'block';
        btnStreet.classList.remove('active');
        btnRadar.classList.add('active');
    }
}

// =============================================
// Map
// =============================================

function renderMapHotspots(hotspots) {
    const svg = document.getElementById('mapSvg');
    if (!svg) return;

    hotspots.forEach((h) => {
        const posX = h.x;
        const posY = h.y;
        const color = h.sentiment === 'positive' ? '#10b981' : h.sentiment === 'negative' ? '#ef4444' : '#f59e0b';

        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'map-hotspot-group');
        group.setAttribute('cursor', 'pointer');
        group.setAttribute('onclick', `showHotspot('${h.id}')`);

        // Pulse ring
        const pulseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pulseCircle.setAttribute('cx', posX);
        pulseCircle.setAttribute('cy', posY);
        pulseCircle.setAttribute('r', '18');
        pulseCircle.setAttribute('fill', color);
        pulseCircle.setAttribute('opacity', '0.2');
        pulseCircle.innerHTML = `<animate attributeName="r" values="18;28;18" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.3;0.05;0.3" dur="2s" repeatCount="indefinite"/>`;

        // Main dot
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', posX);
        circle.setAttribute('cy', posY);
        circle.setAttribute('r', '11');
        circle.setAttribute('fill', color);
        circle.setAttribute('filter', 'url(#glow)');

        // Score text
        const scoreText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        scoreText.setAttribute('x', posX);
        scoreText.setAttribute('y', posY + 4);
        scoreText.setAttribute('text-anchor', 'middle');
        scoreText.setAttribute('fill', 'white');
        scoreText.setAttribute('font-size', '9');
        scoreText.setAttribute('font-weight', '700');
        scoreText.setAttribute('font-family', 'Inter');
        scoreText.textContent = h.score;

        // Label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', posX);
        label.setAttribute('y', posY + 26);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('fill', '#0f172a');
        label.setAttribute('font-size', '10.5');
        label.setAttribute('font-weight', '700');
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

    const gmapsLink = document.getElementById('gmapsLink');
    if (gmapsLink) {
        gmapsLink.href = `https://www.google.com/maps/search/?api=1&query=${h.lat},${h.lng}`;
    }

    if (ambalaMap && h.lat && h.lng) {
        ambalaMap.setView([h.lat, h.lng], 14, { animate: true });
        if (leafletMarkers[h.id]) {
            leafletMarkers[h.id].openPopup();
        }
    }

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
    const location = document.getElementById('locationInput').value || 'Ambala (Cantt & City Hubs)';
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

// =============================================
// Emergency Assistance & SOS System
// =============================================

let sirenAudioContext = null;
let sirenOscillator = null;
let sirenGain = null;
let sirenInterval = null;
let isSirenPlaying = false;

function openEmergencyModal() {
    document.getElementById('emergencyModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeEmergencyModal(e) {
    if (e && e.target !== document.getElementById('emergencyModal')) return;
    if (isSirenPlaying) {
        stopSiren();
    }
    document.getElementById('emergencyModal').style.display = 'none';
    document.body.style.overflow = '';
}

function toggleSiren() {
    if (isSirenPlaying) {
        stopSiren();
    } else {
        startSiren();
    }
}

function startSiren() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) {
            showToast('Audio siren started (visual mode)', 'info');
            document.getElementById('sirenBanner').style.display = 'flex';
            isSirenPlaying = true;
            return;
        }

        sirenAudioContext = new AudioCtx();
        sirenOscillator = sirenAudioContext.createOscillator();
        sirenGain = sirenAudioContext.createGain();

        sirenOscillator.type = 'sawtooth';
        sirenOscillator.frequency.setValueAtTime(750, sirenAudioContext.currentTime);

        sirenGain.gain.setValueAtTime(0.2, sirenAudioContext.currentTime);

        sirenOscillator.connect(sirenGain);
        sirenGain.connect(sirenAudioContext.destination);

        sirenOscillator.start();

        let isHigh = false;
        sirenInterval = setInterval(() => {
            if (!sirenAudioContext || sirenAudioContext.state === 'closed') return;
            const targetFreq = isHigh ? 750 : 1200;
            sirenOscillator.frequency.setTargetAtTime(targetFreq, sirenAudioContext.currentTime, 0.08);
            isHigh = !isHigh;
        }, 350);

        isSirenPlaying = true;
        document.getElementById('sirenBanner').style.display = 'flex';
        document.getElementById('sirenBtn').textContent = 'Stop Siren';
        document.getElementById('sirenStatusText').textContent = '⚠️ Siren sounding loudly';
        document.getElementById('sirenIcon').textContent = '🚨';
        showToast('🚨 Loud Safety Siren Activated', 'info');
    } catch (err) {
        console.warn('AudioContext error:', err);
        isSirenPlaying = true;
        document.getElementById('sirenBanner').style.display = 'flex';
        document.getElementById('sirenBtn').textContent = 'Stop Siren';
    }
}

function stopSiren() {
    if (sirenInterval) {
        clearInterval(sirenInterval);
        sirenInterval = null;
    }
    if (sirenOscillator) {
        try {
            sirenOscillator.stop();
            sirenOscillator.disconnect();
        } catch (e) {}
        sirenOscillator = null;
    }
    if (sirenAudioContext) {
        try {
            sirenAudioContext.close();
        } catch (e) {}
        sirenAudioContext = null;
    }

    isSirenPlaying = false;
    document.getElementById('sirenBanner').style.display = 'none';
    const sirenBtn = document.getElementById('sirenBtn');
    if (sirenBtn) sirenBtn.textContent = 'Start Siren';
    const statusText = document.getElementById('sirenStatusText');
    if (statusText) statusText.textContent = 'Synthesize deterrent alarm audio tone';
    const icon = document.getElementById('sirenIcon');
    if (icon) icon.textContent = '📢';
    showToast('Siren stopped', 'info');
}

function triggerBroadcastAlert() {
    const broadcastBtn = document.getElementById('broadcastBtn');
    broadcastBtn.textContent = 'Dispatching...';
    broadcastBtn.disabled = true;

    setTimeout(() => {
        const contact1 = document.getElementById('statusContact1');
        const contact2 = document.getElementById('statusContact2');
        const contact3 = document.getElementById('statusContact3');

        if (contact1) {
            contact1.textContent = '🟢 Dispatched (SMS)';
            contact1.className = 'contact-status status-notified';
        }
        if (contact2) {
            contact2.textContent = '🟢 Dispatched (SMS)';
            contact2.className = 'contact-status status-notified';
        }
        if (contact3) {
            contact3.textContent = '🟢 Dispatched (Auto-Call)';
            contact3.className = 'contact-status status-notified';
        }

        broadcastBtn.textContent = '✓ Alert Dispatched';
        broadcastBtn.className = 'btn btn-sm btn-primary action-btn';

        showToast('🚨 Simulated Emergency Alert sent to 3 contacts with live GPS coordinates.', 'success');
    }, 900);
}

function copyEmergencyLocation() {
    const coords = '30.2445° N, 77.0421° E';
    const emergencyMsg = `🚨 EMERGENCY DISTRESS ALERT 🚨\nI need immediate assistance at:\nLocation: Mullana → Ambala Cantt Highway\nCoordinates: ${coords}\nNearest Landmark: Mullana Bus Stand Post (350m)\nGoogle Maps: https://maps.google.com/?q=30.2445,77.0421\nBattery: 88%\nSent via STRI Safety Intelligence`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emergencyMsg).then(() => {
            showToast('📍 Live Emergency details copied to clipboard! Ready to share via SMS / WhatsApp.', 'success');
        }).catch(() => {
            promptEmergencyCopy(emergencyMsg);
        });
    } else {
        promptEmergencyCopy(emergencyMsg);
    }
}

function promptEmergencyCopy(text) {
    showToast('📍 Emergency location ready for sharing.', 'info');
}

function triggerSilentAlert() {
    showToast('🤫 Silent SOS logged discreetly. Tracking coordinates without active alarms.', 'info');
}

function logEmergencyCall(number) {
    showToast(`📞 Connecting to emergency dialer: ${number}`, 'info');
}

