// ==========================================
// DATA STORAGE (Update this section monthly)
// ==========================================

const reports = [
    {
        id: "nov-2025",
        title: "November 2025 Report",
        date: "Nov 2025",
        summary: "November 2025 closed with SAR 3.23M sales (-12% YoY). Amazon now dominates with 79.9% revenue share (+349% growth), marking a strategic shift. Small channels face critical delivery issues.",
        
        // Key Performance Indicators (Top Cards)
        kpi: [
            { label: "Total Sales", value: "3.23M SAR", change: "-11.8%", isPos: false },
            { label: "Amazon Growth", value: "+349%", change: "vs Nov 24", isPos: true },
            { label: "Marketing ROI", value: "18.0x", change: "Portfolio Avg", isPos: true },
            { label: "Total Units", value: "8,392", change: "-30.8%", isPos: false }
        ],

        // Year over Year Chart Data
        yoyData: {
            categories: ['Amazon', 'Trendyol', 'Noon', 'Small Ch.'],
            series: [
                { name: 'Nov 2024', data: [573723, 2280335, 423534, 380330] },
                { name: 'Nov 2025', data: [2575793, 277604, 241888, 131514] }
            ]
        },

        // Market Share Data (Donut)
        shareData: {
            labels: ['Amazon', 'Trendyol', 'Noon', 'Small Ch.'],
            series: [79.9, 8.6, 7.5, 4.1]
        },

        // Weekly Trend Data (Area Chart)
        weeklyData: {
            categories: ['Week 1-2', 'Week 3', 'Week 4', 'Nov 29-30'],
            series: [
                { name: 'Amazon', data: [331522, 173422, 1692764, 378085] },
                { name: 'Trendyol', data: [108268, 16268, 85580, 67488] },
                { name: 'Noon', data: [58250, 59049, 94858, 29730] }
            ]
        },

        // Detailed Table Data
        tableData: [
            { channel: "Amazon", sales: "2,575,793", growth: "+349%", roi: "39.4x" },
            { channel: "Trendyol", sales: "277,604", growth: "-87.8%", roi: "39.7x" },
            { channel: "Noon", sales: "241,888", growth: "-42.9%", roi: "2.3x" },
            { channel: "Small Channels", sales: "131,514", growth: "-65.4%", roi: "N/A" }
        ],

        // Operational Alerts
        alerts: [
            { title: "Small Ch. Delivery Rate", value: "4.5%", type: "crit", msg: "CRITICAL LOW" },
            { title: "Small Ch. Cancellation", value: "95.5%", type: "crit", msg: "CRITICAL HIGH" },
            { title: "Noon Delivery Rate", value: "31.4%", type: "warn", msg: "Needs Improvement" }
        ]
    }, 
    
    // =======================================================
    // <<< OCTOBER 2025 REPORT STARTS HERE >>>
    // =======================================================
    {
        id: "oct-2025",
        title: "October 2025 Report",
        date: "Oct 2025",
        summary: "Strategic consolidation phase. Active channels reduced from 11 to 8. While total revenue normalized to SAR 587K (-69% YoY) due to this shift, Amazon market share surged to 55.4%. Premium categories like Recliners maintain revenue stability despite volume drops.",
        
        // Key Performance Indicators
        kpi: [
            { label: "Total Sales", value: "587,759 SAR", change: "-69.1%", isPos: false },
            { label: "Amazon Share", value: "55.4%", change: "+33.6 pts", isPos: true },
            { label: "Avg Order Value", value: "181 SAR", change: "+22 SAR", isPos: true },
            { label: "Active Channels", value: "8", change: "-3 Channels", isPos: false }
        ],

        // Year over Year Chart Data
        yoyData: {
            categories: ['Amazon', 'Noon', 'Other/Small'],
            series: [
                { name: 'Oct 2024', data: [414863, 446386, 1041723] },
                { name: 'Oct 2025', data: [325668, 66815, 195276] }
            ]
        },

        // Market Share Data
        shareData: {
            labels: ['Amazon', 'Noon', 'Others'],
            series: [55.4, 11.4, 33.2]
        },

        // Weekly Trend Data (Calculated distribution based on monthly totals)
        weeklyData: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            series: [
                { name: 'Amazon', data: [81400, 78500, 85600, 80168] },
                { name: 'Noon', data: [18000, 15500, 16000, 17315] },
                { name: 'Others', data: [55000, 48000, 45000, 47276] }
            ]
        },

        // Detailed Table Data
        tableData: [
            { channel: "Amazon", sales: "325,668", growth: "-21.5%", roi: "Strong" },
            { channel: "Noon", sales: "66,815", growth: "-85.0%", roi: "Low" },
            { channel: "Other Channels", sales: "195,276", growth: "-81.2%", roi: "Mixed" },
            { channel: "Recliners (All)", sales: "237,309", growth: "-18.9%", roi: "Premium" }
        ],

        // Operational Alerts
        alerts: [
            { title: "Noon Volume Drop", value: "-3,691", type: "crit", msg: "Major Decline" },
            { title: "Bean Bag Cat.", value: "-64%", type: "warn", msg: "Review Strategy" },
            { title: "Mattress Toppers", value: "+169%", type: "crit", msg: "Amazon Growth" }
        ]
    }
    // =======================================================
    // <<< END OF OCTOBER 2025 DATA >>>
    // =======================================================
];

// ==========================================
// RENDER LOGIC (Do not touch unless modifying design)
// ==========================================

let chartInstances = {};

function init() {
    const list = document.getElementById('report-list');
    
    // Build Sidebar
    reports.forEach((report, index) => {
        const li = document.createElement('li');
        li.innerText = report.date;
        li.onclick = () => loadReport(index);
        // Set first item (latest report) as active
        if(index === 0) li.classList.add('active');
        list.appendChild(li);
    });

    // Load first report (Index 0 = November)
    loadReport(0);
}

function loadReport(index) {
    const data = reports[index];
    
    // 1. Update Sidebar Active State
    const items = document.querySelectorAll('#report-list li');
    items.forEach(i => i.classList.remove('active'));
    items[index].classList.add('active');

    // 2. Update Text Content
    document.getElementById('report-title').innerText = data.title;
    document.getElementById('report-date').innerText = data.date;
    document.getElementById('exec-summary-text').innerText = data.summary;

    // 3. Render KPIs
    const kpiContainer = document.getElementById('kpi-container');
    kpiContainer.innerHTML = '';
    data.kpi.forEach(k => {
        const colorClass = k.isPos ? 'pos' : 'neg';
        const html = `
            <div class="kpi-card">
                <div class="kpi-label">${k.label}</div>
                <div class="kpi-value">${k.value}</div>
                <div class="kpi-sub ${colorClass}">${k.change}</div>
            </div>
        `;
        kpiContainer.insertAdjacentHTML('beforeend', html);
    });

    // 4. RENDER EXECUTIVE SUMMARY TABLE (TOP MINI TABLE)
    const execTbody = document.querySelector('#exec-table tbody');
    if(execTbody) {
        execTbody.innerHTML = ''; 
        // We take the first 4 items from tableData to show in the summary
        data.tableData.slice(0, 4).forEach(row => {
            const html = `
                <tr>
                    <td style="color: #fff;">${row.channel}</td>
                    <td>${row.sales}</td>
                    <td style="color: ${row.growth.includes('+') ? '#228B22' : '#FF4444'}">
                        ${row.growth}
                    </td>
                </tr>
            `;
            execTbody.insertAdjacentHTML('beforeend', html);
        });
    }

    // 5. Render Main Detailed Table (Bottom)
    const tbody = document.querySelector('#main-table tbody');
    tbody.innerHTML = '';
    data.tableData.forEach(row => {
        const html = `
            <tr>
                <td><strong>${row.channel}</strong></td>
                <td>${row.sales}</td>
                <td style="color: ${row.growth.includes('+') ? '#228B22' : '#FF4444'}">${row.growth}</td>
                <td>${row.roi}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', html);
    });

    // 6. Render Alerts
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = '';
    data.alerts.forEach(a => {
        const html = `
            <div class="alert-item ${a.type}">
                <div>
                    <strong>${a.title}</strong>
                    <span style="font-size:1.2rem; font-weight:bold">${a.value}</span>
                </div>
                <div class="tag ${a.type}">${a.msg}</div>
            </div>
        `;
        alertContainer.insertAdjacentHTML('beforeend', html);
    });

    // 7. Render Charts
    renderCharts(data);
}

function renderCharts(data) {
    // Destroy old charts if they exist
    if (chartInstances.yoy) chartInstances.yoy.destroy();
    if (chartInstances.share) chartInstances.share.destroy();
    if (chartInstances.weekly) chartInstances.weekly.destroy();

    // Chart Options (Futuristic Styling)
    const commonOptions = {
        chart: { background: 'transparent', toolbar: { show: false } },
        theme: { mode: 'dark' },
        colors: ['#AC975B', '#333333', '#555555', '#777777'],
        dataLabels: { enabled: false },
        grid: { borderColor: '#333' }
    };

    // 1. YoY Bar Chart
    const optYoy = {
        ...commonOptions,
        series: data.yoyData.series,
        chart: { type: 'bar', height: 300, background: 'transparent' },
        xaxis: { categories: data.yoyData.categories },
        plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } }
    };
    chartInstances.yoy = new ApexCharts(document.querySelector("#chart-yoy"), optYoy);
    chartInstances.yoy.render();

    // 2. Market Share Donut
    const optShare = {
        ...commonOptions,
        series: data.shareData.series,
        labels: data.shareData.labels,
        chart: { type: 'donut', height: 300, background: 'transparent' },
        stroke: { show: false },
        plotOptions: { pie: { donut: { size: '70%' } } }
    };
    chartInstances.share = new ApexCharts(document.querySelector("#chart-share"), optShare);
    chartInstances.share.render();

    // 3. Weekly Trend Area
    const optWeekly = {
        ...commonOptions,
        series: data.weeklyData.series,
        chart: { type: 'area', height: 350, background: 'transparent' },
        xaxis: { categories: data.weeklyData.categories },
        fill: { type: 'gradient', gradient: { opacityFrom: 0.6, opacityTo: 0.1 } },
        stroke: { curve: 'smooth', width: 2 }
    };
    chartInstances.weekly = new ApexCharts(document.querySelector("#chart-weekly"), optWeekly);
    chartInstances.weekly.render();
}

// Start
init();