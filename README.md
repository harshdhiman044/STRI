# STRI — AI-Powered Safety Intelligence

> **Turning community voices into safer roads.**
> 
> *STRI transforms people's experiences, reviews, and opinions about roads and public spaces into actionable safety intelligence.*

---

## 🌟 Core Philosophy

- **Traditional Safety Apps:** Something happens → User presses SOS *(Reactive)*
- **STRI:** People share experiences → AI identifies patterns → Users understand potential concerns **before** travelling *(Proactive)*

---

## 🚀 Key Features

1. **Aspect-Based Sentiment Analysis**: Extracts granular safety factors (Street Lighting, Crowd Density, Night Safety, Road Condition, Traffic, Walkability, Crossing Safety, Public Activity) and computes per-aspect sentiments.
2. **STRI Safety Sentiment Index**: Aggregated location safety score (e.g., 72/100) with historical trend tracking and mathematical impact breakdown.
3. **Time-Based Sentiment Analysis**: Understands how perceived safety changes throughout the day (Morning, Afternoon, Evening, Night) and pinpoints when safety sentiment drops.
4. **Interactive Safety Hotspots Map**: Visual exploration of routes and local hotspots (Main Market, College Road, Bus Stand Crossing, Residential Road) with instant sentiment inspection.
5. **AI Review Intelligence & Filters**: Deep dive into community reviews with aspect chips, confidence ratings, and multi-dimensional filters.
6. **Community Spot Reporting**: Allows community members to submit new observations (poor lighting, harassment concern, unsafe crossing, etc.).
7. **Safe Journey Mode (Prototype)**: Active countdown timer for check-ins with safe confirmations and simulated emergency alert flows.

---

## 💻 Tech Stack

- **Frontend**: Pure HTML5, Vanilla JavaScript (ES6+), Modern Responsive CSS
- **Styling**: Custom SaaS Dashboard design system with dark navy sidebar, responsive grid, and custom SVG visualizations
- **Server**: Lightweight Python HTTP server / static web hosting

---

## 🏃 Running Locally

Clone the repository and open `index.html` directly in any web browser, or run a local static server:

```bash
# Using Python
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🔒 Privacy & Safety Disclaimer

*STRI uses aggregated and prototype community intelligence. Perceived safety scores represent community sentiment and should not be treated as guarantees of physical safety or verified crime-risk predictions.*
