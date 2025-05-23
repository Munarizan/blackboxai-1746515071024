// Data structure for teachers
const teachers = [
    { name: 'Gema Hadi Syahputra', code: 'GHS' },
    { name: 'Mohd Asraf Alias', code: 'MAA' },
    { name: 'Munarizan Muin', code: 'MM' },
    { name: 'Suriawani Mahbob', code: 'SM' },
    { name: 'Sabariah Zainal', code: 'SZ' },
    { name: 'Erma Farida Abu Hassan', code: 'EFAH' }
];

// Data structure for duties
const duties = [
    'Ketua Guru Mingguan dan Perhimpunan',
    'Bertugas Bahagian Kantin',
    'Bertugas Solat Zohor (Perempuan) & Dewan Makan',
    'Bertugas Solat Zohor (Lelaki) & Asar',
    'Bertugas Urusan Kesihatan Murid',
    'Bertugas Kebersihan Kelas & Makan Petang'
];

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to save assignments to localStorage
function saveAssignments(assignments) {
    localStorage.setItem('dutyAssignments', JSON.stringify(assignments));
}

// Function to load assignments from localStorage
function loadAssignments() {
    const saved = localStorage.getItem('dutyAssignments');
    return saved ? JSON.parse(saved) : null;
}

// Function to update duty display
function updateDutyDisplay(assignments) {
    const dutyElements = document.querySelectorAll('.duty-teacher');
    dutyElements.forEach((element, index) => {
        if (index < assignments.length) {
            element.textContent = `Guru Bertugas: ${assignments[index]}`;
            // Add animation class
            element.classList.add('text-change');
            setTimeout(() => {
                element.classList.remove('text-change');
            }, 500);
        }
    });
}

// Function to rotate duties
function rotateDuties() {
    const shuffledTeachers = shuffleArray([...teachers]);
    const newAssignments = shuffledTeachers.map(teacher => teacher.code);
    updateDutyDisplay(newAssignments);
    saveAssignments(newAssignments);
}

// Function to initialize duties
function initializeDuties() {
    const savedAssignments = loadAssignments();
    if (savedAssignments) {
        updateDutyDisplay(savedAssignments);
    } else {
        // If no saved assignments, create initial random assignments
        rotateDuties();
    }
}

// Function to initialize the rotation button
function initializeRotationButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-sync-alt mr-2"></i>Tukar Giliran Guru';
    button.className = 'fixed bottom-20 right-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center rotate-button';
    button.onclick = rotateDuties;
    document.body.appendChild(button);
}

// Add styles for text change animation
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .text-change {
            animation: textChange 0.5s ease;
        }
        @keyframes textChange {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeRotationButton();
    addStyles();
    initializeDuties();
});
