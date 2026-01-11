// Scoring Weights
const WEIGHTS = {
    industry: 0.30,
    size: 0.20,
    role: 0.25,
    intent: 0.25
};

// Initial Data
const initialLeads = [
    { id: 1, name: "Sarah Johnson", company: "TechFlow Inc", industry: 90, size: 80, role: 85, intent: 95 },
    { id: 2, name: "Michael Chen", company: "DataSphere", industry: 60, size: 70, role: 90, intent: 40 },
    { id: 3, name: "Emma Davis", company: "StartRight", industry: 85, size: 40, role: 60, intent: 30 },
    { id: 4, name: "James Wilson", company: "OldSchool Corp", industry: 30, size: 90, role: 20, intent: 15 },
    { id: 5, name: "Linda Martinez", company: "InnovateNow", industry: 95, size: 85, role: 90, intent: 75 },
    { id: 6, name: "David Kim", company: "Future Solutions", industry: 50, size: 50, role: 50, intent: 20 },
    { id: 7, name: "Sophie Moore", company: "NextGen Retail", industry: 80, size: 60, role: 70, intent: 55 }
];

let leads = [...initialLeads];
let selectedLeadId = 1;

// DOM Elements
const els = {
    // Inputs
    rangeIndustry: document.getElementById('range-industry'),
    rangeSize: document.getElementById('range-size'),
    rangeRole: document.getElementById('range-role'),
    rangeIntent: document.getElementById('range-intent'),

    // Value Displays
    valIndustry: document.getElementById('val-industry'),
    valSize: document.getElementById('val-size'),
    valRole: document.getElementById('val-role'),
    valIntent: document.getElementById('val-intent'),

    // Result Displays
    dispFinal: document.getElementById('disp-final'),
    dispCategory: document.getElementById('disp-category'),
    dispAction: document.getElementById('disp-action'),

    // Header Info
    selectedName: document.getElementById('selected-lead-name'),
    selectedCompany: document.getElementById('selected-lead-company'),

    // Table & Summary
    leadsBody: document.getElementById('leads-body'),
    countHot: document.getElementById('count-hot'),
    countWarm: document.getElementById('count-warm'),
    countCold: document.getElementById('count-cold'),

    // Buttons
    btnReset: document.getElementById('reset-data'),
    btnVerify: document.getElementById('btn-verify'),
    btnManual: document.getElementById('btn-manual')
};

// --- Core Logic ---

function calculateScore(l) {
    return Math.round(
        (l.industry * WEIGHTS.industry) +
        (l.size * WEIGHTS.size) +
        (l.role * WEIGHTS.role) +
        (l.intent * WEIGHTS.intent)
    );
}

function getCategory(score) {
    if (score >= 60) return { label: 'HOT', class: 'hot', action: 'Sales Call' };
    if (score >= 30) return { label: 'WARM', class: 'warm', action: 'Nurture Campaign' };
    return { label: 'COLD', class: 'cold', action: 'Automation Only' };
}

// --- Render Functions ---

function updateSummary() {
    let hot = 0, warm = 0, cold = 0;
    leads.forEach(l => {
        const score = calculateScore(l);
        if (score >= 60) hot++;
        else if (score >= 30) warm++;
        else cold++;
    });
    els.countHot.innerText = hot;
    els.countWarm.innerText = warm;
    els.countCold.innerText = cold;
}

function renderTable() {
    els.leadsBody.innerHTML = '';

    leads.forEach(lead => {
        const score = calculateScore(lead);
        const cat = getCategory(score);

        const row = document.createElement('tr');
        if (lead.id === selectedLeadId) row.classList.add('selected-row');

        row.innerHTML = `
            <td><strong>${lead.name}</strong><br><span style="font-size:0.8em;color:#6b7280">${lead.company}</span></td>
            <td>${lead.industry}</td>
            <td>${lead.size}</td>
            <td>${lead.role}</td>
            <td>${lead.intent}</td>
            <td><strong>${score}%</strong></td>
            <td><span class="badge ${cat.class}">${cat.label}</span></td>
            <td>${cat.action}</td>
        `;

        row.addEventListener('click', () => selectLead(lead.id));
        els.leadsBody.appendChild(row);
    });
    updateSummary();
}

function updateSimulator() {
    const lead = leads.find(l => l.id === selectedLeadId);
    if (!lead) return;

    // Update Slider Values
    els.rangeIndustry.value = lead.industry;
    els.rangeSize.value = lead.size;
    els.rangeRole.value = lead.role;
    els.rangeIntent.value = lead.intent;

    // Update Text Labels
    els.valIndustry.innerText = `${lead.industry}%`;
    els.valSize.innerText = `${lead.size}%`;
    els.valRole.innerText = `${lead.role}%`;
    els.valIntent.innerText = `${lead.intent}%`;

    // Update Header
    els.selectedName.innerText = lead.name;
    els.selectedCompany.innerText = lead.company;

    // Calculate Result
    const score = calculateScore(lead);
    const cat = getCategory(score);

    els.dispFinal.innerText = `${score}%`;
    els.dispCategory.innerText = cat.label;
    els.dispCategory.className = `badge ${cat.class}`;
    els.dispAction.innerText = `Next Action: ${cat.action}`;
}

// --- Interaction Handlers ---

function selectLead(id) {
    selectedLeadId = id;
    renderTable(); // to update selection highlight
    updateSimulator();
}

function handleSliderChange() {
    const leadIndex = leads.findIndex(l => l.id === selectedLeadId);
    if (leadIndex === -1) return;

    // Update Data
    leads[leadIndex].industry = parseInt(els.rangeIndustry.value);
    leads[leadIndex].size = parseInt(els.rangeSize.value);
    leads[leadIndex].role = parseInt(els.rangeRole.value);
    leads[leadIndex].intent = parseInt(els.rangeIntent.value);

    // Refresh UI
    updateSimulator(); // Instant feedback
    renderTable(); // Update table row numbers
}

// --- Event Listeners ---

[els.rangeIndustry, els.rangeSize, els.rangeRole, els.rangeIntent].forEach(el => {
    el.addEventListener('input', handleSliderChange);
});

els.btnReset.addEventListener('click', () => {
    // Deep copy reset
    leads = initialLeads.map(l => ({ ...l }));
    selectedLeadId = 1;
    selectLead(1);
    alert('Simulations reset to default data.');
});

els.btnVerify.addEventListener('click', () => {
    els.btnVerify.innerText = '⏳ Checking...';
    setTimeout(() => {
        els.btnVerify.innerText = '✅ Verified';
        setTimeout(() => els.btnVerify.innerText = '🤖 AI Auto-Verify', 2000);
    }, 1500);
});

els.btnManual.addEventListener('click', () => {
    const name = prompt("Enter Lead Name:");
    if (name) {
        const newId = leads.length + 1;
        leads.push({
            id: newId,
            name: name,
            company: "Manual Entry LCC",
            industry: 50, size: 50, role: 50, intent: 50
        });
        selectLead(newId);
    }
});

// --- Init ---
renderTable();
selectLead(1);
