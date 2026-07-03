/**
 * =================================================================
 * AUTOMOTIVE CORE INVENTORY DATABASE LISTINGS
 * =================================================================
 */
const BASELINE_AUTOMOTIVE_DATABASE = [
    {
        id: "car_w1",
        name: "Tesla Model S Plaid",
        categories: ["EV Cars", "Luxury Cars", "Fast Cars"],
        country: "USA",
        indianState: "",
        priceLocal: 109990,
        currencySign: "$",
        badge: "Luxury Sedan | USA",
        specs: "1,020 hp • Tri-Motor AWD",
        imgUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80",
        description: "Premium alternative drive luxury and blistering acceleration trusted by millions of American highway drivers."
    },
    {
        id: "car_w2",
        name: "Porsche 911 GT3 RS",
        categories: ["Sports Cars", "Fast Cars", "Super Cars", "2026 Cars"],
        country: "DEU",
        indianState: "",
        priceLocal: 248000,
        currencySign: "€",
        badge: "Luxury Performance | Germany",
        specs: "518 hp • 4.0L Flat-6 • Active Aero",
        imgUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
        description: "Track-honed motorsport aerodynamics designed for absolute cornering precision and maximum stability on the Autobahn."
    },
    {
        id: "car_w3",
        name: "Mahindra XUV700 AX7 (Pre-Owned)",
        categories: ["Used Cars", "Safest Cars"],
        country: "IND",
        indianState: "Karnataka",
        priceLocal: 1850000,
        currencySign: "₹",
        badge: "Certified Used SUV | Karnataka",
        specs: "5-Star G-NCAP • 2.2L mHawk Diesel • 32,000 km",
        imgUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
        description: "Immaculately maintained corporate vehicle tracking excellent safety profiles across Bengaluru and regional state highways."
    },
    {
        id: "car_w4",
        name: "Maruti Suzuki Swift VXI (Pre-Owned)",
        categories: ["Used Cars", "Cheap Cars"],
        country: "IND",
        indianState: "Delhi",
        priceLocal: 520000,
        currencySign: "₹",
        badge: "Economical Hatchback | Delhi NCR",
        specs: "Manual • 1.2L K-Series Petrol • 45,000 km",
        imgUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
        description: "Highly fuel-efficient city commuter. Fully verified documentation with zero accident claims history across Delhi NCR."
    }
];

const GLOBAL_CATEGORIES = ["Luxury Cars", "Super Cars", "Sports Cars", "Fast Cars", "EV Cars", "Hybrid Cars", "2026 Cars", "Safest Cars", "Used Cars", "Cheap Cars"];
const INDIAN_STATES = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "West Bengal", "Telangana", "Punjab", "Rajasthan", "Haryana"];

const GLOBAL_MARKETS = [
    { countryCode: "USA", title: "🇺🇸 Best Cars in US", meta: "Luxury Sedan | USA", text: "Premium luxury and performance trusted by millions of American drivers." },
    { countryCode: "GBR", title: "🇬🇧 Best Cars in UK", meta: "Luxury Coupe | UK", text: "Power, elegance and comfort for true British car lovers." },
    { countryCode: "DEU", title: "🇩🇪 Best Cars in Germany", meta: "Luxury Performance | Germany", text: "Engineered for precision and high-speed stability on the Autobahn." },
    { countryCode: "ITA", title: "🇮🇹 Best Cars in Italy", meta: "Super Luxury | Italy", text: "Style, speed and heritage in every breathtaking drive." },
    { countryCode: "ARE", title: "🇦🇪 Best Cars in Dubai", meta: "Royal Luxury | UAE", text: "High-end cars loved by elites and royals across the world." },
    { countryCode: "IND", title: "🇮🇳 Best Cars in India", meta: "Luxury & Safety | India", text: "Top trusted brands for Indian roads, families and every budget." },
    { countryCode: "JPN", title: "🇯🇵 Best Cars in Japan", meta: "Tech & EV Leader | Japan", text: "Innovation, EV technology and legendary reliability at its finest." },
    { countryCode: "KOR", title: "🇰🇷 Best Cars in Korea", meta: "Smart Mobility | Korea", text: "Advanced features and future-ready designs at every price point." }
];

const GLOBAL_BUDGETS = [
    { country: "USA", budget: 110000, label: "🇺🇸 United States under $110,000" },
    { country: "IND", budget: 2500000, label: "🇮🇳 India Under 25 Lakh" },
    { country: "DEU", budget: 250000, label: "🇩🇪 Germany Under €250,000" },
    { country: "ITA", budget: 100000, label: "🇮🇹 Italy Under €100,000" },
    { country: "ARE", budget: 900000, label: "🇦🇪 Dubai Under AED 900,000" },
    { country: "JPN", budget: 25000000, label: "🇯🇵 Japan Under ¥25,000,000" },
    { country: "GBR", budget: 170000, label: "🇬🇧 United Kingdom Under £170,000" },
    { country: "KOR", budget: 80000000, label: "🇰🇷 South Korea Under ₩80,000,000" }
];

let AppState = {
    isAdmin: false,
    lastQueryTitle: "Global Markets & Standards",
    currentSubset: null
};

let backdoorTapSequenceCounter = 0;
let tapSequenceTimer = null;
let LIVE_INVENTORY = JSON.parse(localStorage.getItem("best_cars_world_db")) || [...BASELINE_AUTOMOTIVE_DATABASE];
let SYSTEM_AUDIT_LOGS = JSON.parse(localStorage.getItem("best_cars_world_logs")) || [];

document.addEventListener("DOMContentLoaded", () => {
    renderInterfaceMenus();
    renderDefaultMarketGrid();
    setupApplicationEventHandlers();
    initializeSystemThemeHandler();
    initializeScrollObserverEngine();
});

/**
 * =================================================================
 * 🌊 SCROLL OBSERVER CORE LOGIC
 * Re-scans DOM mappings to apply smooth transitions during layout scroll
 * =================================================================
 */
function initializeScrollObserverEngine() {
    const trackingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop un-observing to allow repeating trigger actions
                // trackingObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px"
    });

    document.querySelectorAll('.fade-on-scroll, .country-card, .budget-card').forEach(card => {
        card.classList.add('fade-on-scroll');
        trackingObserver.observe(card);
    });
}

function appendSystemAuditRecord(logMessageText) {
    const timestamp = new Date().toLocaleTimeString();
    const formattedEntry = `[${timestamp}] ${logMessageText}`;
    SYSTEM_AUDIT_LOGS.unshift(formattedEntry);
    if(SYSTEM_AUDIT_LOGS.length > 40) SYSTEM_AUDIT_LOGS.pop();
    localStorage.setItem("best_cars_world_logs", JSON.stringify(SYSTEM_AUDIT_LOGS));
    refreshLogsTerminalDisplay();
}

function refreshLogsTerminalDisplay() {
    const box = document.getElementById("admin-audit-logs-collapsible-panel");
    if(!box) return;
    if(SYSTEM_AUDIT_LOGS.length === 0) {
        box.innerHTML = "<div>• No log activity tracked in this execution yet.</div>";
        return;
    }
    box.innerHTML = SYSTEM_AUDIT_LOGS.map(line => `<div>• ${line}</div>`).join("");
}

function renderInterfaceMenus() {
    document.getElementById("automotive-category-nav").innerHTML = GLOBAL_CATEGORIES.map(cat => `
        <li><a href="#" class="nav-link cat-filter-action" data-category="${cat}">${cat}</a></li>
    `).join("");

    document.getElementById("form-category-checkbox-injection").innerHTML = GLOBAL_CATEGORIES.map(cat => `
        <label><input type="checkbox" name="form-categories" value="${cat}"> ${cat}</label>
    `).join("");

    document.getElementById("indian-state-chips-container").innerHTML = INDIAN_STATES.map(state => `
        <a href="#" class="state-chip state-filter-action" data-state="${state}">${state}</a>
    `).join("");

    document.getElementById("global-budget-cards-injector").innerHTML = GLOBAL_BUDGETS.map(b => `
        <a href="#" class="budget-card static-budget-trigger" data-country="${b.country}" data-budget="${b.budget}">
            <div class="budget-info"><span>🚗</span> ${b.label}</div>
            <div class="arrow-icon">→</div>
        </a>
    `).join("");
    
    refreshLogsTerminalDisplay();
}

function renderDefaultMarketGrid() {
    AppState.lastQueryTitle = "Global Markets & Standards";
    AppState.currentSubset = null;
    
    document.getElementById("brand-visual-showcase-hero").style.display = "block";
    document.getElementById("regional-indian-states-section").style.display = "block";
    document.getElementById("global-budget-matrix-section").style.display = "block";
    document.getElementById("editorial-faq-accordion-section").style.display = "block";

    document.getElementById("grid-context-heading").innerText = "Global Markets & Standards";
    document.getElementById("main-content-injection-grid").innerHTML = GLOBAL_MARKETS.map(item => `
        <div class="country-card">
            <div>
                <div class="country-meta">${item.meta}</div>
                <h3>${item.title}</h3>
                <p>${item.text}</p>
            </div>
            <a href="#" class="explore-btn market-explore-action" data-country="${item.countryCode}">Explore Market</a>
        </div>
    `).join("");

    // Refresh scroll anchors
    setTimeout(initializeScrollObserverEngine, 50);
}

function renderFilteredVehiclesGrid(titleContextText, targetCollection) {
    AppState.lastQueryTitle = titleContextText;
    AppState.currentSubset = targetCollection;

    document.getElementById("grid-context-heading").innerText = titleContextText;
    const container = document.getElementById("main-content-injection-grid");

    if (targetCollection.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1; padding:40px; text-align:center; color:var(--text-muted);"><h3>No Database Records Matched</h3><p>Tap the secret footer terminal node to populate or modify listings.</p></div>`;
        return;
    }

    container.innerHTML = targetCollection.map(car => `
        <div class="country-card">
            <div class="car-card-image-wrapper" onclick="renderSingleProductDeepDive('${car.id}')" style="cursor:pointer;">
                <img src="${car.imgUrl}" alt="Automotive Showpiece">
            </div>
            <div>
                <div class="country-meta" style="cursor:pointer;" onclick="renderSingleProductDeepDive('${car.id}')">${car.badge}</div>
                <h3 style="margin: 0 0 5px 0; cursor:pointer;" onclick="renderSingleProductDeepDive('${car.id}')">${car.name}</h3>
                ${car.indianState ? `<div style="font-size:11px; font-weight:700; color:var(--text-primary); margin-bottom:5px;">📍 State Node: ${car.indianState}</div>` : ''}
                <div style="font-size:12px; color:var(--text-muted); font-weight:700; margin-bottom:12px;">${car.specs}</div>
                <p style="margin-bottom:15px; font-size:13.5px; display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${car.description}</p>
            </div>
            <div>
                <div style="font-size:20px; font-weight:800; margin-bottom:15px; color:var(--text-primary); letter-spacing:-0.5px;">${car.currencySign}${car.priceLocal.toLocaleString()}</div>
                <div style="display:flex; gap:10px; align-items:center;">
                    <button class="explore-btn" style="flex:1; padding:8px 0;" onclick="renderSingleProductDeepDive('${car.id}')">View Details</button>
                    ${AppState.isAdmin ? `
                        <button class="btn-admin-edit" onclick="triggerAdminRecordEdit('${car.id}')">Edit</button>
                        <button class="btn-admin-delete" onclick="triggerAdminRecordDelete('${car.id}')">×</button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join("");

    setTimeout(initializeScrollObserverEngine, 50);
}

function renderSingleProductDeepDive(carId) {
    const car = LIVE_INVENTORY.find(c => c.id === carId);
    if (!car) return;

    document.getElementById("brand-visual-showcase-hero").style.display = "none";
    document.getElementById("regional-indian-states-section").style.display = "none";
    document.getElementById("global-budget-matrix-section").style.display = "none";
    document.getElementById("editorial-faq-accordion-section").style.display = "none";

    document.getElementById("grid-context-heading").innerText = `Showroom Spec: ${car.name}`;
    const container = document.getElementById("main-content-injection-grid");
    
    container.innerHTML = `
        <div style="grid-column: 1/-1; background: var(--bg-card); border: 1px solid var(--border-stroke); border-radius: 12px; padding: 40px; display: flex; flex-direction: column; gap: 30px;">
            <div style="width:100%; max-height:450px; overflow:hidden; border-radius:8px; border:1px solid var(--border-stroke); display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.005);">
                <img src="${car.imgUrl}" style="max-width:100%; max-height:450px; object-fit:contain;" alt="Deep Dive Focus Asset">
            </div>
            <div>
                <div class="country-meta" style="font-size:13px; margin-bottom:5px;">${car.badge}</div>
                <h2 style="margin:0 0 15px 0; font-size:32px; font-weight:800; color:var(--text-primary);">${car.name}</h2>
                
                <div style="background:var(--bg-main); padding:20px; border-radius:8px; border-left:2px solid var(--text-primary); margin-bottom:25px;">
                    <h4 style="margin:0 0 8px 0; text-transform:uppercase; font-size:12px; color:var(--text-muted); letter-spacing:1px;">Technical Blueprint Specifications</h4>
                    <p style="margin:0; font-size:16px; font-weight:700; color:var(--text-primary);">${car.specs}</p>
                </div>

                <h4 style="text-transform:uppercase; font-size:12px; color:var(--text-muted); letter-spacing:1px; margin-bottom:8px;">Full Overview Report</h4>
                <p style="color:var(--text-muted); font-size:16px; line-height:1.8; margin-bottom:30px; text-align:justify;">${car.description}</p>
                
                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-stroke); padding-top:25px; flex-wrap:wrap; gap:20px;">
                    <div>
                        <span style="font-size:13px; color:var(--text-muted); display:block; text-transform:uppercase; font-weight:600;">Showroom Base Valuation</span>
                        <span style="font-size:32px; font-weight:900; color:var(--text-primary); letter-spacing:-1px;">${car.currencySign}${car.priceLocal.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; gap:12px;">
                        <button class="explore-btn" onclick="renderReturnHomeDefaultContext()" style="background:var(--border-stroke)">← Back to Grid</button>
                        <a href="https://maps.google.com" target="_blank" class="explore-btn" style="background:var(--text-primary); color:var(--bg-main); font-weight:700;">Secure Vehicle Location Node</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderReturnHomeDefaultContext() {
    if (AppState.currentSubset) {
        document.getElementById("brand-visual-showcase-hero").style.display = "none";
        document.getElementById("regional-indian-states-section").style.display = "none";
        document.getElementById("global-budget-matrix-section").style.display = "none";
        document.getElementById("editorial-faq-accordion-section").style.display = "none";
        renderFilteredVehiclesGrid(AppState.lastQueryTitle, AppState.currentSubset);
    } else {
        renderDefaultMarketGrid();
    }
}

function computeSecureSystemFingerprint(inputString) {
    let registerA = 0x67452301;
    let registerB = 0xEFCDAB89;
    let registerC = 0x98BADCFE;
    for (let i = 0; i < inputString.length; i++) {
        const charValue = inputString.charCodeAt(i);
        registerA = Math.imul(registerA ^ charValue, 0x5DEECE66) + 11;
        registerB = (registerB << 5) | (registerB >>> 27);
        registerB = Math.imul(registerB ^ registerA, 0xBB40E64D);
        registerC = (registerC >>> 3) | (registerC << 29);
        registerC = (registerC ^ registerB) + charValue;
    }
    const blockA = new Int32Array([registerA ^ registerC])[0];
    const blockB = new Int32Array([registerB ^ registerA])[0];
    return blockA.toString(16) + "_" + blockB.toString(16);
}

function checkSystemHardwareHandshake(inputUser, inputPass) {
    const userClean = inputUser.replace(/\s+/g, '').trim();
    const passClean = inputPass.trim();

    const hasCustomUser = localStorage.getItem("best_cars_admin_user_hash");
    const hasCustomPass = localStorage.getItem("best_cars_admin_pass_hash");

    if (hasCustomUser || hasCustomPass) {
        const activeUserToken = localStorage.getItem("best_cars_admin_user_hash");
        const activePassToken = localStorage.getItem("best_cars_admin_pass_hash");
        return (computeSecureSystemFingerprint(userClean) === activeUserToken && computeSecureSystemFingerprint(passClean) === activePassToken);
    }

    return (userClean === "adminv" && passClean === "Vish$@354");
}

function setupApplicationEventHandlers() {
    const adminOverlay = document.getElementById("admin-panel-overlay");
    const authOverlay = document.getElementById("auth-gateway-overlay");
    const entryForm = document.getElementById("admin-car-entry-form");
    const authForm = document.getElementById("secure-auth-form");
    const passInput = document.getElementById("auth-password");
    const fileInput = document.getElementById("car-file-upload");
    const webUrlInput = document.getElementById("car-image");
    
    const credChangeForm = document.getElementById("admin-credential-update-form");

    let processingBase64DataString = "";

    const logToggleBtn = document.getElementById("toggle-audit-logs-btn");
    const logPanelDisplay = document.getElementById("admin-audit-logs-collapsible-panel");
    const logChevronSymbol = document.getElementById("logs-chevron-indicator");

    logToggleBtn.addEventListener("click", () => {
        if (logPanelDisplay.style.display === "none") {
            logPanelDisplay.style.display = "block";
            logChevronSymbol.innerText = "▲";
        } else {
            logPanelDisplay.style.display = "none";
            logChevronSymbol.innerText = "▼";
        }
    });

    credChangeForm.addEventListener("submit", function(e) {
        e.preventDefault();
        if(!AppState.isAdmin) return;

        const newUserInput = document.getElementById("new-admin-username").value.trim();
        const newPassInput = document.getElementById("new-admin-password").value.trim();

        if(!newUserInput && !newPassInput) {
            alert("Please enter a new username or password to commit modifications.");
            return;
        }

        if(newUserInput) {
            const newUserHash = computeSecureSystemFingerprint(newUserInput.replace(/\s+/g, ''));
            localStorage.setItem("best_cars_admin_user_hash", newUserHash);
            appendSystemAuditRecord(`Administrative username updated and cryptographically hashed.`);
        }

        if(newPassInput) {
            const newPassHash = computeSecureSystemFingerprint(newPassInput);
            localStorage.setItem("best_cars_admin_pass_hash", newPassHash);
            appendSystemAuditRecord(`Administrative password access signature changed securely.`);
        }

        credChangeForm.reset();
        alert("System parameters successfully remixed. New access configurations are live.");
    });

    fileInput.addEventListener("change", function() {
        const selectedAsset = this.files[0];
        if (selectedAsset) {
            const dataTransformerReader = new FileReader();
            dataTransformerReader.onload = function(event) {
                processingBase64DataString = event.target.result;
                webUrlInput.value = ""; 
                webUrlInput.placeholder = "🔒 Data injected via Device File selection";
            };
            dataTransformerReader.readAsDataURL(selectedAsset);
        }
    });

    webUrlInput.addEventListener("input", function() {
        if(this.value.trim() !== "") {
            fileInput.value = "";
            processingBase64DataString = "";
            this.placeholder = "https://images.unsplash.com/...";
        }
    });

    document.querySelectorAll(".home-view-trigger, #brand-home-trigger").forEach(el => {
        el.addEventListener("click", (e) => { e.preventDefault(); renderDefaultMarketGrid(); });
    });

    document.querySelectorAll(".text-routing-trigger").forEach(el => {
        el.addEventListener("click", (e) => { e.preventDefault(); renderInformationalStaticPage(el.getAttribute("data-page")); });
    });

    document.getElementById("admin-close-btn").addEventListener("click", () => {
        adminOverlay.style.display = "none";
        if(!AppState.isAdmin) renderReturnHomeDefaultContext();
    });
    document.getElementById("auth-close-btn").addEventListener("click", () => authOverlay.style.display = "none");

    document.getElementById("password-visibility-toggle").addEventListener("click", function() {
        if(passInput.type === "password") { passInput.type = "text"; this.innerText = "Hide"; }
        else { passInput.type = "password"; this.innerText = "Show"; }
    });

    document.getElementById("secure-backdoor-tap-trigger").addEventListener("click", (e) => {
        e.preventDefault();
        if (AppState.isAdmin) { resetAdminConsoleForm(); adminOverlay.style.display = "flex"; return; }

        backdoorTapSequenceCounter++;
        clearTimeout(tapSequenceTimer);
        tapSequenceTimer = setTimeout(() => { backdoorTapSequenceCounter = 0; }, 3000);

        if (backdoorTapSequenceCounter === 7) {
            backdoorTapSequenceCounter = 0;
            authForm.reset();
            passInput.type = "password";
            document.getElementById("password-visibility-toggle").innerText = "Show";
            document.getElementById("auth-error-feedback").style.display = "none";
            authOverlay.style.display = "flex";
        }
    });

    authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputParamA = document.getElementById("auth-username").value;
        const inputParamB = passInput.value;

        if (checkSystemHardwareHandshake(inputParamA, inputParamB)) {
            document.getElementById("auth-username").value = "";
            passInput.value = "";
            AppState.isAdmin = true;
            authOverlay.style.display = "none";
            document.getElementById("admin-session-active-indicator").style.display = "block";
            appendSystemAuditRecord(`Operator authenticated successfully. Secure token issued.`);
            resetAdminConsoleForm();
            adminOverlay.style.display = "flex";
            renderReturnHomeDefaultContext();
        } else {
            document.getElementById("auth-error-feedback").style.display = "block";
        }
    });

    document.getElementById("admin-logout-btn").addEventListener("click", () => {
        appendSystemAuditRecord(`Operator disconnected. Session terminated.`);
        AppState.isAdmin = false;
        adminOverlay.style.display = "none";
        document.getElementById("admin-session-active-indicator").style.display = "none";
        renderReturnHomeDefaultContext();
        alert("Session terminated securely.");
    });

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("cat-filter-action") || e.target.classList.contains("footer-cat-shortcut")) {
            e.preventDefault();
            document.getElementById("brand-visual-showcase-hero").style.display = "none";
            const cat = e.target.getAttribute("data-category");
            renderFilteredVehiclesGrid(`Class Category: ${cat}`, LIVE_INVENTORY.filter(c => c.categories.includes(cat)));
            document.getElementById("menu-bar-trigger").checked = false;
            scrollToAnchorViewport();
        }
        if (e.target.classList.contains("market-explore-action") || e.target.classList.contains("footer-country-link")) {
            e.preventDefault();
            document.getElementById("brand-visual-showcase-hero").style.display = "none";
            const country = e.target.getAttribute("data-country");
            renderFilteredVehiclesGrid(`Market Environment: ${country}`, LIVE_INVENTORY.filter(c => c.country === country));
            scrollToAnchorViewport();
        }
        if (e.target.classList.contains("state-filter-action")) {
            e.preventDefault();
            document.getElementById("brand-visual-showcase-hero").style.display = "none";
            const state = e.target.getAttribute("data-state");
            renderFilteredVehiclesGrid(`Pre-Owned Node: ${state}`, LIVE_INVENTORY.filter(c => c.indianState === state));
            scrollToAnchorViewport();
        }
        if (e.target.classList.contains("static-budget-trigger")) {
            e.preventDefault();
            document.getElementById("brand-visual-showcase-hero").style.display = "none";
            const country = e.target.getAttribute("data-country");
            const maxBudget = parseFloat(e.target.getAttribute("data-budget"));
            renderFilteredVehiclesGrid(`Affordable Catalog: ${country}`, LIVE_INVENTORY.filter(c => c.country === country && c.priceLocal <= maxBudget));
            scrollToAnchorViewport();
        }
    });

    entryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if(!AppState.isAdmin) return;

        const targetId = document.getElementById("form-car-id-pointer").value;
        const tags = Array.from(document.querySelectorAll('input[name="form-categories"]:checked')).map(cb => cb.value);

        let finalResolvedImageSource = webUrlInput.value.trim();
        if (processingBase64DataString !== "") {
            finalResolvedImageSource = processingBase64DataString;
        }

        if (!finalResolvedImageSource) {
            alert("Error: Please provide a photo URL or choose an image file asset from your local device storage.");
            return;
        }

        const payload = {
            id: targetId || "car_" + Math.random().toString(36).substr(2, 4),
            name: document.getElementById("car-name").value,
            categories: tags,
            country: document.getElementById("car-country").value,
            indianState: document.getElementById("car-state").value,
            priceLocal: parseFloat(document.getElementById("car-price").value),
            currencySign: document.getElementById("car-currency").value,
            badge: document.getElementById("car-brand-badge").value,
            specs: document.getElementById("car-specs").value,
            imgUrl: finalResolvedImageSource,
            description: document.getElementById("car-desc").value
        };

        if (targetId) {
            const index = LIVE_INVENTORY.findIndex(c => c.id === targetId);
            if (index !== -1) LIVE_INVENTORY[index] = payload;
            appendSystemAuditRecord(`Modified vehicle item: "${payload.name}" (ID: ${payload.id})`);
        } else {
            LIVE_INVENTORY.push(payload);
            appendSystemAuditRecord(`Created new vehicle item listing: "${payload.name}"`);
        }

        localStorage.setItem("best_cars_world_db", JSON.stringify(LIVE_INVENTORY));
        adminOverlay.style.display = "none";
        
        processingBase64DataString = ""; 
        renderFilteredVehiclesGrid("Database Workspace Updated", LIVE_INVENTORY.filter(c => c.id === payload.id || c.country === payload.country));
        resetAdminConsoleForm();
    });
}

window.triggerAdminRecordDelete = function(id) {
    if(!AppState.isAdmin) return;
    const item = LIVE_INVENTORY.find(c => c.id === id);
    const itemName = item ? item.name : id;
    
    if (confirm(`Permanently drop profile registry entry for "${itemName}"?`)) {
        LIVE_INVENTORY = LIVE_INVENTORY.filter(c => c.id !== id);
        localStorage.setItem("best_cars_world_db", JSON.stringify(LIVE_INVENTORY));
        appendSystemAuditRecord(`Dropped vehicle listing from memory: "${itemName}"`);
        if(AppState.currentSubset) AppState.currentSubset = AppState.currentSubset.filter(c => c.id !== id);
        renderReturnHomeDefaultContext();
    }
};

window.triggerAdminRecordEdit = function(id) {
    if(!AppState.isAdmin) return;
    const item = LIVE_INVENTORY.find(c => c.id === id);
    if(!item) return;

    document.getElementById("form-car-id-pointer").value = item.id;
    document.getElementById("car-name").value = item.name;
    document.getElementById("car-brand-badge").value = item.badge;
    document.getElementById("car-country").value = item.country;
    document.getElementById("car-state").value = item.indianState || "";
    document.getElementById("car-price").value = item.priceLocal;
    document.getElementById("car-currency").value = item.currencySign;
    document.getElementById("car-specs").value = item.specs;
    
    document.getElementById("car-file-upload").value = "";
    if (item.imgUrl.startsWith("data:image")) {
        document.getElementById("car-image").value = "";
        document.getElementById("car-image").placeholder = "🔒 Data injected via Device File selection";
    } else {
        document.getElementById("car-image").value = item.imgUrl;
        document.getElementById("car-image").placeholder = "https://images.unsplash.com/...";
    }

    document.getElementById("car-desc").value = item.description;

    document.querySelectorAll('input[name="form-categories"]').forEach(cb => {
        cb.checked = item.categories.includes(cb.value);
    });

    document.getElementById("form-submit-action-label").innerText = "Save Modifications to Inventory";
    document.getElementById("admin-panel-overlay").style.display = "flex";
};

function resetAdminConsoleForm() {
    document.getElementById("admin-car-entry-form").reset();
    document.getElementById("form-car-id-pointer").value = "";
    document.getElementById("car-image").placeholder = "https://images.unsplash.com/...";
    document.getElementById("form-submit-action-label").innerText = "Commit Vehicle to Inventory";
    
    document.getElementById("admin-audit-logs-collapsible-panel").style.display = "none";
    document.getElementById("logs-chevron-indicator").innerText = "▼";
    refreshLogsTerminalDisplay();
}

function scrollToAnchorViewport() {
    document.getElementById("grid-context-heading").scrollIntoView({ behavior: "smooth", block: "start" });
}

function initializeSystemThemeHandler() {
    const btn = document.getElementById("theme-toggle-fab");
    btn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("automotive-theme", next);
    });
    document.documentElement.setAttribute("data-theme", localStorage.getItem("automotive-theme") || "light");
}
