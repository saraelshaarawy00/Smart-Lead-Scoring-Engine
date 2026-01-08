// Initial Dummy Data
const initialLeads = [
    { id: 1, name: "Sarah Johnson", company: "TechFlow Inc", icp: 85, intent: 90 },
    { id: 2, name: "Michael Chen", company: "DataSphere", icp: 45, intent: 80 },
    { id: 3, name: "Emma Davis", company: "StartRight", icp: 70, intent: 35 },
    { id: 4, name: "James Wilson", company: "OldSchool Corp", icp: 20, intent: 15 },
    { id: 5, name: "Linda Martinez", company: "InnovateNow", icp: 95, intent: 50 },
];

let leads = [...initialLeads];
let selectedLeadId = 1; // Default select first lead

// DOM Elements
const els = {
    rangeIcp: document.getElementById('range-icp'),
    rangeIntent: document.getElementById('range-intent'),
    valIcp: document.getElementById('val-icp'),
    valIntent: document.getElementById('val-intent'),
    dispIcp: document.getElementById('disp-icp'),
    dispIntent: document.getElementById('disp-intent'),
    dispFinal: document.getElementById('disp-final'),
    dispCategory: document.getElementById('disp-category'),
    leadsBody: document.getElementById('leads-body'),
    selectedLeadName: document.getElementById('selected-lead-name'),
    selectedLeadCompany: document.getElementById('selected-lead-company'),
    btnReset: document.getElementById('reset-data')
};

// Logic Constants
const CATEGORIES = {
    HOT: { label: 'HOT', class: 'hot', threshold: 60, action: 'Sales Assignment' },
    WARM: { label: 'WARM', class: 'warm', threshold: 30, action: 'Nurture' },
    COLD: { label: 'COLD', class: 'cold', threshold: 0, action: 'Automation' }
};

// --- Helper Functions ---

function calculateScore(icp, intent) {
    // Weighted Average: 50% ICP, 50% Intent (adjustable)
    return Math.round((icp * 0.5) + (intent * 0.5));
}

function getCategory(score) {
    if (score >= CATEGORIES.HOT.threshold) return CATEGORIES.HOT;
    if (score >= CATEGORIES.WARM.threshold) return CATEGORIES.WARM;
    return CATEGORIES.COLD;
}

function getBadgeHtml(category) {
    return `<span class="badge ${category.class}">${category.label}</span>`;
}

// --- Render Functions ---

function renderTable() {
    els.leadsBody.innerHTML = '';

    leads.forEach(lead => {
        const finalScore = calculateScore(lead.icp, lead.intent);
        const category = getCategory(finalScore);

        const row = document.createElement('tr');
        if (lead.id === selectedLeadId) {
            row.classList.add('selected-row');
        }

        row.innerHTML = `
            <td><strong>${lead.name}</strong></td>
            <td>${lead.company}</td>
            <td>${lead.icp}%</td>
            <td>${lead.intent}%</td>
            <td><strong>${finalScore}%</strong></td>
            <td>${getBadgeHtml(category)}</td>
            <td>${category.action}</td>
        `;

        row.addEventListener('click', () => selectLead(lead.id));
        els.leadsBody.appendChild(row);
    });
}

function updateControlsAndPreview() {
    const lead = leads.find(l => l.id === selectedLeadId);
    if (!lead) return;

    // Update Input Values
    els.rangeIcp.value = lead.icp;
    els.rangeIntent.value = lead.intent;

    // Update Text Labels
    els.valIcp.innerText = `${lead.icp}%`;
    els.valIntent.innerText = `${lead.intent}%`;

    els.dispIcp.innerText = `${lead.icp}%`;
    els.dispIntent.innerText = `${lead.intent}%`;

    // Calculate and Show Final
    const finalScore = calculateScore(lead.icp, lead.intent);
    els.dispFinal.innerText = `${finalScore}%`;

    const category = getCategory(finalScore);
    els.dispCategory.innerText = category.label;
    els.dispCategory.className = `badge ${category.class}`;

    // Update Header Info
    els.selectedLeadName.innerText = lead.name;
    els.selectedLeadCompany.innerText = lead.company;
}

// --- Interaction Logic ---

function selectLead(id) {
    selectedLeadId = id;
    updateControlsAndPreview();
    renderTable(); // Re-render to update selected highlight
}

function handleInputUpdate() {
    const newIcp = parseInt(els.rangeIcp.value);
    const newIntent = parseInt(els.rangeIntent.value);

    // Update data model for selected lead
    const leadIndex = leads.findIndex(l => l.id === selectedLeadId);
    if (leadIndex !== -1) {
        leads[leadIndex].icp = newIcp;
        leads[leadIndex].intent = newIntent;
    }

    updateControlsAndPreview();
    renderTable();
}

// --- Event Listeners ---

els.rangeIcp.addEventListener('input', handleInputUpdate);
els.rangeIntent.addEventListener('input', handleInputUpdate);

els.btnReset.addEventListener('click', () => {
    leads = JSON.parse(JSON.stringify(initialLeads)); // Deep copy reset
    selectedLeadId = 1;
    selectLead(1);
});

// --- Init ---
selectLead(1);
