document.addEventListener('DOMContentLoaded', () => {

    // Enhance hamburger toggle: lock scroll & manage overlay visibility
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const imageBaseUrl = 'https://raw.githubusercontent.com/Scryptolog1st/SE-Multitool/main/img/';

    // Create overlay once if it doesn't exist
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }

    function closeDrawer() {
        hamburger?.setAttribute('aria-expanded', 'false');
        nav?.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('open');
            document.body.classList.toggle('no-scroll', !expanded);
        });
    }

    overlay.addEventListener('click', closeDrawer);

    // Optional: close drawer when a tab is clicked (nice on mobile)
    document.querySelectorAll('.mobile-drawer .tab').forEach(btn => {
        btn.addEventListener('click', closeDrawer);
    });



    // --- Accurate Game Data ---
    const thrusterData = {
        large: {
            ion: { force: 432000, name: "Large Ion Thruster" },
            hydrogen: { force: 7200000, name: "Large Hydrogen Thruster" },
            atmospheric: { force: 6480000, name: "Large Atmospheric Thruster" },
            flat_atmospheric: { force: 2592000, name: "Large Flat Atmospheric Thruster" }
        },
        small: {
            ion: { force: 34560, name: "Ion Thruster" },
            hydrogen: { force: 1080000, name: "Hydrogen Thruster" },
            atmospheric: { force: 576000, name: "Atmospheric Thruster" },
            flat_atmospheric: { force: 115200, name: "Flat Atmospheric Thruster" }
        }
    };

    const planetData = {
        Earthlike: { g: 9.81, radius: 60000, atmHeight: 8766, atmoDensity: 1.225 },
        Mars: { g: 8.83, radius: 60000, atmHeight: 5260, atmoDensity: 0.98 },
        Alien: { g: 10.79, radius: 60000, atmHeight: 9642, atmoDensity: 1.225 },
        Pertam: { g: 11.77, radius: 60000, atmHeight: 5260, atmoDensity: 1.225 },
        Triton: { g: 2.35, radius: 25000, atmHeight: 8766, atmoDensity: 0.98 },
        Moon: { g: 2.35, radius: 19000, atmHeight: 0, atmoDensity: 0 },
        Europa: { g: 2.35, radius: 19000, atmHeight: 0, atmoDensity: 0 },
        Titan: { g: 4.71, radius: 19000, atmHeight: 11833, atmoDensity: 1.47 },
    };

    const parachuteEffectiveness = {
        large: 23564.08,
        small: 1472.25
    };

    const cargoData = {
        oreDensity: 2.7, // kg/L, average for ore like Stone
        large: {
            largeContainer: 421875, // Liters
            smallContainer: 15625
        },
        small: {
            largeContainer: 15625,
            smallContainer: 3375
        }
    };

    // Comprehensive list of items for cargo calculation
    const componentData = {
        // Ores (density is kg/L)
        Stone: { density: 2.7, group: "Ores" },
        Iron_Ore: { density: 2.7, name: "Iron Ore", group: "Ores" },
        Nickel_Ore: { density: 2.7, name: "Nickel Ore", group: "Ores" },
        Cobalt_Ore: { density: 2.7, name: "Cobalt Ore", group: "Ores" },
        Magnesium_Ore: { density: 2.7, name: "Magnesium Ore", group: "Ores" },
        Silicon_Ore: { density: 2.7, name: "Silicon Ore", group: "Ores" },
        Silver_Ore: { density: 2.7, name: "Silver Ore", group: "Ores" },
        Gold_Ore: { density: 2.7, name: "Gold Ore", group: "Ores" },
        Platinum_Ore: { density: 2.7, name: "Platinum Ore", group: "Ores" },
        Uranium_Ore: { density: 2.7, name: "Uranium Ore", group: "Ores" },
        Ice: { density: 0.917, group: "Ores" },

        // Ingots
        Gravel: { density: 2.7, group: "Ingots" },
        Iron_Ingot: { density: 7.87, name: "Iron Ingot", group: "Ingots" },
        Nickel_Ingot: { density: 8.9, name: "Nickel Ingot", group: "Ingots" },
        Cobalt_Ingot: { density: 8.9, name: "Cobalt Ingot", group: "Ingots" },
        Magnesium_Powder: { density: 1.74, name: "Magnesium Powder", group: "Ingots" },
        Silicon_Wafer: { density: 2.33, name: "Silicon Wafer", group: "Ingots" },
        Silver_Ingot: { density: 10.49, name: "Silver Ingot", group: "Ingots" },
        Gold_Ingot: { density: 19.3, name: "Gold Ingot", group: "Ingots" },
        Platinum_Ingot: { density: 21.45, name: "Platinum Ingot", group: "Ingots" },
        Uranium_Ingot: { density: 19.1, name: "Uranium Ingot", group: "Ingots" },

        // Components
        SteelPlate: { density: 7.85, name: "Steel Plate", group: "Components" },
        Construction: { density: 7.85, name: "Construction Comp.", group: "Components" },
        InteriorPlate: { density: 7.85, name: "Interior Plate", group: "Components" },
        Motor: { density: 7.85, name: "Motor", group: "Components" },
        LargeTube: { density: 7.85, name: "Large Steel Tube", group: "Components" },
        SmallTube: { density: 7.85, name: "Small Steel Tube", group: "Components" },
        Computer: { density: 2.33, name: "Computer", group: "Components" },
        Display: { density: 2.33, name: "Display", group: "Components" },
        PowerCell: { density: 8.9, name: "Power Cell", group: "Components" },
        Detector: { density: 10.49, name: "Detector Comp.", group: "Components" },
        RadioCommunication: { density: 7.85, name: "Radio Comp.", group: "Components" },
        Superconductor: { density: 19.3, name: "Superconductor", group: "Components" },
    };

    // --- Tab Switching ---
    const tabs = document.querySelectorAll('.tab');
    const views = document.querySelectorAll('.view');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const viewId = tab.dataset.view;
            views.forEach(view => {
                view.style.display = view.id === viewId ? 'block' : 'none';
            });
        });
    });

    // --- UI Population ---
    const reqGravitySelect = document.getElementById('reqGravity');
    for (const planetName in planetData) {
        const option = document.createElement('option');
        option.value = planetData[planetName].g;
        option.textContent = `${planetName} (${planetData[planetName].g} m/s²)`;
        if (planetName === 'Earthlike') option.selected = true;
        reqGravitySelect.appendChild(option);
    }

    const reqCargoItemSelect = document.getElementById('reqCargoItem');
    const groups = {};
    for (const itemName in componentData) {
        const item = componentData[itemName];
        if (!groups[item.group]) groups[item.group] = [];
        groups[item.group].push({ id: itemName, ...item });
    }
    for (const groupName in groups) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = groupName;
        groups[groupName].forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name || item.id.replace(/_/g, ' ');
            optgroup.appendChild(option);
        });
        reqCargoItemSelect.appendChild(optgroup);
    }

    // --- Chart.js Setup ---
    const chartTextColor = '#e8eefc';
    Chart.defaults.color = chartTextColor; // Set global default text color

    const ctx = document.getElementById('thrusterChart').getContext('2d');
    let thrusterChart = new Chart(ctx, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Altitude (m)', color: chartTextColor },
                    ticks: { color: chartTextColor },
                    grid: { color: 'var(--border)' }
                },
                y: {
                    title: { display: true, text: 'Force (MN)', color: chartTextColor },
                    ticks: {
                        color: chartTextColor,
                        callback: function (value) { return value / 1000000 + ' MN'; }
                    },
                    grid: { color: 'var(--border)' }
                }
            },
            plugins: {
                legend: { labels: { color: chartTextColor } },
                tooltip: {
                    bodyColor: '#e8eefc',
                    titleColor: '#e8eefc',
                    backgroundColor: '#171e28',
                    borderColor: '#2a3447',
                    borderWidth: 1,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) { label += ': '; }
                            if (context.parsed.y !== null) {
                                label += (context.parsed.y / 1000000).toFixed(3) + ' MN';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });

    // --- Calculation Functions ---

    function calculateThrusterRequirements() {
        let mass = parseFloat(document.getElementById('reqMass').value) || 0;
        const gravity = parseFloat(document.getElementById('reqGravity').value) || 0;
        const gridSizeForCargo = document.querySelector('input[name="reqGridSize"]:checked').value;
        const resultBox = document.getElementById('thrusterRequirementResult');
        const resultTableWrapper = document.getElementById('thrusterRequirementTable');
        const resultTableBody = resultTableWrapper.querySelector('tbody');

        const cargoItem = document.getElementById('reqCargoItem').value;
        if (cargoItem !== 'none') {
            const itemDensity = componentData[cargoItem].density;
            const multiplier = parseFloat(document.getElementById('reqCargoMultiplier').value);
            const smallCount = parseInt(document.getElementById('reqSmallCargo').value) || 0;
            const largeCount = parseInt(document.getElementById('reqLargeCargo').value) || 0;

            const smallVolume = cargoData[gridSizeForCargo].smallContainer * smallCount;
            const largeVolume = cargoData[gridSizeForCargo].largeContainer * largeCount;
            const cargoMass = (smallVolume + largeVolume) * multiplier * itemDensity;
            mass += cargoMass;
        }

        if (mass <= 0 || gravity <= 0) {
            resultBox.style.display = 'none';
            resultTableWrapper.style.display = 'none';
            return;
        }

        const requiredThrust = mass * gravity;
        resultBox.innerHTML = `Your ship needs <b>${requiredThrust.toLocaleString('en-US', { maximumFractionDigits: 0 })} N</b> of thrust to fight gravity. To maintain this weight, you will need any of the following:`;
        resultBox.style.display = 'block';

        resultTableBody.innerHTML = '';

        for (const gridSize of ['large', 'small']) {
            const thrusters = thrusterData[gridSize];
            for (const type in thrusters) {
                const thruster = thrusters[type];
                if ((type.includes('atmospheric')) && gravity === 0) continue;

                const count = Math.ceil(requiredThrust / thruster.force);
                const imageName = `${gridSize}_${type}.png`;
                const row = `
                    <tr>
                        <td><img src="${imageBaseUrl}${imageName}" alt="${thruster.name}"></td>
                        <td>${thruster.name} (${gridSize})</td>
                        <td><strong>${count}</strong></td>
                    </tr>
                `;
                resultTableBody.insertAdjacentHTML('beforeend', row);
            }
        }
        resultTableWrapper.style.display = 'block';
    }


    function calculateThrusterEfficiencies() {
        const planetName = document.getElementById('thrusterPlanet').value;
        const planet = planetData[planetName];
        const mass = parseFloat(document.getElementById('thrusterMass').value) || 0;
        const gridSize = document.querySelector('input[name="thrusterGridSize"]:checked').value;
        const ionCount = parseInt(document.getElementById('ionCount').value) || 0;
        const hydroCount = parseInt(document.getElementById('hydroCount').value) || 0;
        const atmoCount = parseInt(document.getElementById('atmoCount').value) || 0;
        const flatAtmoCount = parseInt(document.getElementById('flatAtmoCount').value) || 0;
        const ascentAngle = parseFloat(document.querySelector('input[name="ascentAngle"]:checked').value);

        const maxWeightResultBox = document.getElementById('maxShipWeightResult');
        const seaLevelGravity = planet.g;

        const atmoThruster = thrusterData[gridSize].atmospheric;
        const flatAtmoThruster = thrusterData[gridSize].flat_atmospheric;
        const ionThruster = thrusterData[gridSize].ion;
        const hydroThruster = thrusterData[gridSize].hydrogen;

        const atmoMultiplierSeaLevel = planet.atmoDensity > 0 ? 1 : 0;
        const ionEfficiencySeaLevel = Math.max(0.3, 1 - (planet.atmoDensity * 0.7));
        const atmoThrustSL = atmoCount * atmoThruster.force * atmoMultiplierSeaLevel;
        const flatAtmoThrustSL = flatAtmoCount * flatAtmoThruster.force * atmoMultiplierSeaLevel;
        const ionThrustSL = ionCount * ionThruster.force * ionEfficiencySeaLevel;
        const hydroThrustSL = hydroCount * hydroThruster.force;

        const totalThrustSeaLevel = atmoThrustSL + flatAtmoThrustSL + ionThrustSL + hydroThrustSL;
        const angleFactor = Math.sin(ascentAngle * Math.PI / 180);
        const correctedThrust = totalThrustSeaLevel * angleFactor;

        const maxWeight = seaLevelGravity > 0 ? correctedThrust / seaLevelGravity : Infinity;

        if (maxWeight > 0) {
            maxWeightResultBox.innerHTML = `Your setup can lift a max ship weight of <b>${isFinite(maxWeight) ? maxWeight.toLocaleString('en-US', { maximumFractionDigits: 0 }) : 'Infinite'} kg</b> at sea level.`;
            maxWeightResultBox.style.display = 'block';
        } else {
            maxWeightResultBox.style.display = 'none';
        }

        const labels = [];
        const gravityData = [];
        const thrustData = [];
        const step = 500;
        const maxAltitude = planet.atmHeight > 0 ? planet.atmHeight + 1000 : 10000;

        for (let alt = 0; alt <= maxAltitude; alt += step) {
            labels.push(alt);
            const gravityAtAlt = planet.g * Math.pow(planet.radius / (planet.radius + alt), 2);
            const weightForce = mass * gravityAtAlt;
            gravityData.push(weightForce);

            const atmoMultiplier = planet.atmHeight > 0 ? Math.max(0, 1 - (alt / planet.atmHeight)) : 0;
            const atmoThrust = atmoCount * atmoThruster.force * atmoMultiplier;
            const flatAtmoThrust = flatAtmoCount * flatAtmoThruster.force * atmoMultiplier;

            const densityAtAlt = planet.atmoDensity * atmoMultiplier;
            const ionEfficiency = Math.max(0.3, 1 - (densityAtAlt * 0.7));
            const ionThrustAtAlt = ionCount * ionThruster.force * ionEfficiency;

            const hydroThrust = hydroCount * hydroThruster.force;

            thrustData.push(atmoThrust + flatAtmoThrust + ionThrustAtAlt + hydroThrust);
        }

        thrusterChart.data.labels = labels;
        thrusterChart.data.datasets = [
            { label: 'Total Thrust', data: thrustData, borderColor: '#39FF14', backgroundColor: 'rgba(57, 255, 20, 0.2)', tension: 0.1 },
            { label: 'Required Lift (Gravity)', data: gravityData, borderColor: '#e74c3c', backgroundColor: 'rgba(231, 76, 60, 0.2)', tension: 0.1 }
        ];
        thrusterChart.update();
    }

    function calculateParachutes() {
        const gridSize = document.querySelector('input[name="parachuteGridSize"]:checked').value;
        const mass = parseFloat(document.getElementById('parachuteMass').value) || 0;
        const gravity = parseFloat(document.getElementById('parachuteGravity').value) || 0;
        const atmosphere = parseFloat(document.getElementById('parachuteAtmosphere').value) || 0;
        const desiredVelocity = parseFloat(document.getElementById('parachuteVelocity').value) || 0;
        const resultBox = document.getElementById('parachuteResult');

        if (mass <= 0 || gravity <= 0 || atmosphere <= 0 || desiredVelocity <= 0) {
            resultBox.style.display = 'none';
            return;
        }

        const airDensity = planetData.Earthlike.atmoDensity * atmosphere;
        const effectiveness = parachuteEffectiveness[gridSize];
        const weight = mass * gravity;

        const neededParachutes = weight / (Math.pow(desiredVelocity, 2) * effectiveness * airDensity);
        const count = Math.ceil(neededParachutes);

        if (count === 0 || !isFinite(count)) {
            resultBox.innerHTML = `No parachutes needed for this configuration.`;
            resultBox.style.display = 'block';
            return;
        }

        const actualVelocity = Math.sqrt(weight / (count * effectiveness * airDensity));
        resultBox.innerHTML = `You need <b>${count}</b> parachute(s) to descend at ~<b>${actualVelocity.toFixed(2)} m/s</b>.`;
        resultBox.style.display = 'block';
    }

    function calculateJumpDrive() {
        const mass = parseFloat(document.getElementById('jumpdriveMass').value) || 0;
        const count = parseInt(document.getElementById('jumpdriveCount').value) || 0;
        const resultBox = document.getElementById('jumpdriveResult');

        if (mass <= 0 || count < 0) {
            resultBox.style.display = 'none';
            return;
        }

        const maxJumpDistance = count * 3000 * 1000 * 1000 / mass;
        resultBox.innerHTML = `Maximum jump distance: <b>${(maxJumpDistance / 1000).toLocaleString('en-US', { maximumFractionDigits: 2 })} km</b>`;
        resultBox.style.display = 'block';
    }

    // --- Blueprint Parser ---
    const dropZone = document.querySelector('.file-drop-zone');
    const fileInput = document.getElementById('blueprintFile');
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            parseBlueprint(e.dataTransfer.files[0]);
        }
    });
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            parseBlueprint(e.target.files[0]);
        }
    });

    function parseBlueprint(file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const xmlText = event.target.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");

            const displayName = xmlDoc.getElementsByTagName('DisplayName')[0]?.textContent || 'Unnamed Ship';
            document.getElementById('blueprintName').textContent = displayName;

            const components = {};
            const blocks = xmlDoc.getElementsByTagName('MyObjectBuilder_CubeBlock');

            for (let block of blocks) {
                const type = block.getAttribute('xsi:type');
                const subtype = block.getElementsByTagName('SubtypeName')[0]?.textContent || 'Default';
                const key = `${type}_${subtype}`;
                components[key] = (components[key] || 0) + 1;
            }

            const resultDiv = document.getElementById('blueprintResult');
            const tableBody = document.getElementById('blueprintTable').querySelector('tbody');
            tableBody.innerHTML = '';

            for (const [key, count] of Object.entries(components)) {
                const row = document.createElement('tr');
                const name = key.replace('MyObjectBuilder_', '').replace(/_/g, ' ');
                row.innerHTML = `<td>${name}</td><td>${count}</td>`;
                tableBody.appendChild(row);
            }
            resultDiv.style.display = 'block';
        };
        reader.readAsText(file);
    }

    // --- Event Listeners ---
    const allInputs = document.querySelectorAll('.view input, .view select');
    allInputs.forEach(input => {
        ['input', 'change'].forEach(eventType => {
            input.addEventListener(eventType, () => {
                const parentView = input.closest('.view');
                if (!parentView) return;
                switch (parentView.id) {
                    case 'thruster_calculator':
                        calculateThrusterRequirements();
                        break;
                    case 'thruster_efficiencies':
                        calculateThrusterEfficiencies();
                        break;
                    case 'parachute':
                        calculateParachutes();
                        break;
                    case 'jumpdrive':
                        calculateJumpDrive();
                        break;
                }
            });
        });
    });
    // --- Modal Image Logic ---
    const chartImage = document.querySelector('.jump-chart-img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');

    if (chartImage && modal && modalImg && closeBtn) {
        // Open the modal when the chart image is clicked
        chartImage.addEventListener('click', () => {
            modal.classList.add('show');
            modalImg.src = chartImage.src;
        });

        // Function to close the modal
        const closeModal = () => {
            modal.classList.remove('show');
        };

        // Close when the 'X' button is clicked
        closeBtn.addEventListener('click', closeModal);

        // Close when the dark background is clicked
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // --- Initial Calculations ---
    calculateThrusterRequirements();
    calculateThrusterEfficiencies();
    calculateParachutes();
    calculateJumpDrive();
});



