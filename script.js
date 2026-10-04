// ==========================================
// GRADEFlow
// Student Grade Management System
// ==========================================


// ==========================================
// GLOBAL DATA
// ==========================================

let currentSubject = {
    name: "",

    ww: [],
    pt: [],
    exam: [],

    weights: {
        ww: 20,
        pt: 50,
        exam: 30
    },

    grade: null
};


let savedSubjects =
    JSON.parse(
        localStorage.getItem(
            "gradeFlowSubjects"
        )
    ) || [];


// ==========================================
// DOM ELEMENTS
// ==========================================

const subjectName =
    document.getElementById(
        "subjectName"
    );

const gradingPreset =
    document.getElementById(
        "gradingPreset"
    );

const wwWeight =
    document.getElementById(
        "wwWeight"
    );

const ptWeight =
    document.getElementById(
        "ptWeight"
    );

const examWeight =
    document.getElementById(
        "examWeight"
    );


// ==========================================
// DARK MODE
// ==========================================

const darkModeBtn =
    document.getElementById(
        "darkModeBtn"
    );


function toggleDarkMode() {

    document.body.classList.toggle(
        "dark"
    );

    const enabled =
        document.body.classList.contains(
            "dark"
        );

    localStorage.setItem(
        "gradeFlowDark",
        enabled
    );

    darkModeBtn.textContent =
        enabled ? "☀️" : "🌙";
}


darkModeBtn.addEventListener(
    "click",
    toggleDarkMode
);


// Restore dark mode

if (
    localStorage.getItem(
        "gradeFlowDark"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );

    darkModeBtn.textContent =
        "☀️";
}


// ==========================================
// ADD ASSESSMENT
// ==========================================

function addAssessment(
    type,
    data = null
) {

    const container =
        document.getElementById(
            type + "List"
        );


    const assessment =
        document.createElement(
            "div"
        );

    assessment.className =
        "assessment";


    let defaultName;

    if (type === "ww") {
        defaultName =
            "Written Work";
    }

    else if (type === "pt") {
        defaultName =
            "Performance Task";
    }

    else {
        defaultName =
            "Exam";
    }


    assessment.innerHTML = `

        <div>

            <label>
                Name
            </label>

            <input
                class="assessment-name"
                value="${
                    data?.name ||
                    defaultName
                }"
                placeholder="Assessment name"
            >

        </div>


        <div>

            <label>
                Score
            </label>

            <input
                class="assessment-score"
                type="number"
                min="0"
                value="${
                    data?.score ?? ""
                }"
                placeholder="0"
            >

        </div>


        <div>

            <label>
                Total
            </label>

            <input
                class="assessment-total"
                type="number"
                min="1"
                value="${
                    data?.total ?? ""
                }"
                placeholder="100"
            >

        </div>


        <button
            class="remove-btn"
            type="button"
        >
            ✕
        </button>

    `;


    assessment
        .querySelector(
            ".remove-btn"
        )
        .addEventListener(
            "click",
            () => {

                assessment.remove();

            }
        );


    container.appendChild(
        assessment
    );
}


// ==========================================
// GET ASSESSMENTS
// ==========================================

function getAssessments(type) {

    const container =
        document.getElementById(
            type + "List"
        );


    const rows =
        container.querySelectorAll(
            ".assessment"
        );


    const data = [];


    rows.forEach(row => {

        const name =
            row.querySelector(
                ".assessment-name"
            ).value;


        const score =
            Number(
                row.querySelector(
                    ".assessment-score"
                ).value
            );


        const total =
            Number(
                row.querySelector(
                    ".assessment-total"
                ).value
            );


        if (
            !isNaN(score) &&
            !isNaN(total) &&
            total > 0
        ) {

            data.push({
                name,
                score,
                total
            });

        }

    });


    return data;
}


// ==========================================
// CATEGORY CALCULATION
// ==========================================

function calculateCategory(
    assessments
) {

    if (
        assessments.length === 0
    ) {
        return 0;
    }


    let score = 0;

    let total = 0;


    assessments.forEach(
        assessment => {

            score +=
                assessment.score;

            total +=
                assessment.total;

        }
    );


    if (total === 0) {
        return 0;
    }


    return (
        score / total
    ) * 100;
}


// ==========================================
// GRADING PRESETS
// ==========================================

const gradingPresets = {

    "shs-core": {
        ww: 20,
        pt: 50,
        exam: 30
    },

    "shs-field": {
        ww: 15,
        pt: 70,
        exam: 15
    },

    "shs-arts": {
        ww: 20,
        pt: 60,
        exam: 20
    },

    "shs-research": {
        ww: 40,
        pt: 60,
        exam: 0
    },

    "shs-techpro": {
        ww: 15,
        pt: 65,
        exam: 20
    },

    "work-immersion": {
        ww: 20,
        pt: 80,
        exam: 0
    },

    "old-305020": {
        ww: 30,
        pt: 50,
        exam: 20
    }

};


// ==========================================
// APPLY PRESET
// ==========================================

function applyPreset() {

    const preset =
        gradingPreset.value;


    if (
        !gradingPresets[preset]
    ) {
        return;
    }


    const weights =
        gradingPresets[preset];


    wwWeight.value =
        weights.ww;

    ptWeight.value =
        weights.pt;

    examWeight.value =
        weights.exam;


    updateWeightTotal();
}


gradingPreset.addEventListener(
    "change",
    applyPreset
);


// ==========================================
// WEIGHT VALIDATION
// ==========================================

function updateWeightTotal() {

    const ww =
        Number(
            wwWeight.value
        ) || 0;


    const pt =
        Number(
            ptWeight.value
        ) || 0;


    const exam =
        Number(
            examWeight.value
        ) || 0;


    const total =
        ww + pt + exam;


    const display =
        document.getElementById(
            "weightTotal"
        );


    display.textContent =
        `Total: ${total}%`;


    if (total === 100) {

        display.className =
            "weight-total valid";

    }

    else {

        display.className =
            "weight-total invalid";

    }
}


wwWeight.addEventListener(
    "input",
    updateWeightTotal
);

ptWeight.addEventListener(
    "input",
    updateWeightTotal
);

examWeight.addEventListener(
    "input",
    updateWeightTotal
);


// ==========================================
// CALCULATE GRADE
// ==========================================

function calculateGrade() {

    const ww =
        getAssessments("ww");

    const pt =
        getAssessments("pt");

    const exam =
        getAssessments("exam");


    const wwW =
        Number(
            wwWeight.value
        );

    const ptW =
        Number(
            ptWeight.value
        );

    const examW =
        Number(
            examWeight.value
        );


    const totalWeight =
        wwW + ptW + examW;


    if (totalWeight !== 100) {

        alert(
            "Your grading weights must add up to 100%."
        );

        return null;
    }


    const wwPercent =
        calculateCategory(ww);


    const ptPercent =
        calculateCategory(pt);


    const examPercent =
        calculateCategory(exam);


    const finalGrade =
        (
            wwPercent * wwW +
            ptPercent * ptW +
            examPercent * examW
        ) / 100;


    // Results

    document.getElementById(
        "wwResult"
    ).textContent =
        wwPercent.toFixed(2) + "%";


    document.getElementById(
        "ptResult"
    ).textContent =
        ptPercent.toFixed(2) + "%";


    document.getElementById(
        "examResult"
    ).textContent =
        examPercent.toFixed(2) + "%";


    document.getElementById(
        "initialResult"
    ).textContent =
        finalGrade.toFixed(2);


    document.getElementById(
        "finalGrade"
    ).textContent =
        finalGrade.toFixed(2);


    // Status

    const status =
        document.getElementById(
            "gradeStatus"
        );


    if (finalGrade >= 75) {

        status.textContent =
            "✅ Passing";

    }

    else {

        status.textContent =
            "❌ Below 75";

    }


    // Descriptor

    let descriptor;


    if (finalGrade >= 90) {

        descriptor =
            "Excellent";

    }

    else if (finalGrade >= 85) {

        descriptor =
            "Very Good";

    }

    else if (finalGrade >= 80) {

        descriptor =
            "Good";

    }

    else if (finalGrade >= 75) {

        descriptor =
            "Passing";

    }

    else {

        descriptor =
            "Needs Improvement";

    }


    document.getElementById(
        "descriptor"
    ).textContent =
        descriptor;


    // Charts

    updateBar(
        "wwBar",
        "wwChartText",
        wwPercent
    );

    updateBar(
        "ptBar",
        "ptChartText",
        ptPercent
    );

    updateBar(
        "examBar",
        "examChartText",
        examPercent
    );


    // GPA

    document.getElementById(
        "gpa"
    ).textContent =
        percentageToGPA(
            finalGrade
        ).toFixed(2);


    // Update current subject

    currentSubject = {

        name:
            subjectName.value ||
            "Unnamed Subject",

        ww,
        pt,
        exam,

        weights: {

            ww: wwW,
            pt: ptW,
            exam: examW

        },

        grade: finalGrade

    };


    return currentSubject;
}


// ==========================================
// CHART
// ==========================================

function updateBar(
    barId,
    textId,
    value
) {

    document.getElementById(
        barId
    ).style.width =
        Math.min(
            value,
            100
        ) + "%";


    document.getElementById(
        textId
    ).textContent =
        value.toFixed(1) + "%";
}


// ==========================================
// GPA CONVERSION
// ==========================================

function percentageToGPA(
    grade
) {

    if (grade >= 97)
        return 4.0;

    if (grade >= 93)
        return 3.7;

    if (grade >= 90)
        return 3.5;

    if (grade >= 87)
        return 3.3;

    if (grade >= 83)
        return 3.0;

    if (grade >= 80)
        return 2.7;

    if (grade >= 77)
        return 2.3;

    if (grade >= 75)
        return 2.0;

    if (grade >= 70)
        return 1.5;

    if (grade >= 65)
        return 1.0;

    return 0;
}


// ==========================================
// SAVE SUBJECT
// ==========================================

function saveData() {

    const result =
        calculateGrade();


    if (!result) {
        return;
    }


    const index =
        savedSubjects.findIndex(
            subject =>
                subject.name ===
                result.name
        );


    if (index !== -1) {

        savedSubjects[index] =
            result;

    }

    else {

        savedSubjects.push(
            result
        );

    }


    localStorage.setItem(
        "gradeFlowSubjects",
        JSON.stringify(
            savedSubjects
        )
    );


    renderSubjects();


    alert(
        "✅ Subject saved successfully!"
    );
}


// ==========================================
// LOAD SUBJECT
// ==========================================

function loadSubject(index) {

    const subject =
        savedSubjects[index];


    subjectName.value =
        subject.name;


    wwWeight.value =
        subject.weights.ww;


    ptWeight.value =
        subject.weights.pt;


    examWeight.value =
        subject.weights.exam;


    // Clear current assessments

    document.getElementById(
        "wwList"
    ).innerHTML = "";

    document.getElementById(
        "ptList"
    ).innerHTML = "";

    document.getElementById(
        "examList"
    ).innerHTML = "";


    // Restore assessments

    subject.ww.forEach(
        item =>
            addAssessment(
                "ww",
                item
            )
    );


    subject.pt.forEach(
        item =>
            addAssessment(
                "pt",
                item
            )
    );


    subject.exam.forEach(
        item =>
            addAssessment(
                "exam",
                item
            )
    );


    updateWeightTotal();

    calculateGrade();
}


// ==========================================
// RENDER SAVED SUBJECTS
// ==========================================

function renderSubjects() {

    const list =
        document.getElementById(
            "subjectList"
        );


    if (
        savedSubjects.length === 0
    ) {

        list.textContent =
            "No saved subjects yet.";

        return;
    }


    list.innerHTML = "";


    savedSubjects.forEach(
        (subject, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "subject-chip";


            button.textContent =
                `${subject.name} — ${
                    subject.grade?.toFixed(2)
                    || "—"
                }`;


            button.addEventListener(
                "click",
                () =>
                    loadSubject(index)
            );


            list.appendChild(
                button
            );

        }
    );
}


// ==========================================
// EXPORT CSV
// ==========================================

function exportCSV() {

    const result =
        calculateGrade();


    if (!result) {
        return;
    }


    const rows = [

        [
            "Subject",
            "Category",
            "Assessment",
            "Score",
            "Total"
        ]

    ];


    result.ww.forEach(
        item => {

            rows.push([

                result.name,
                "Written Work",
                item.name,
                item.score,
                item.total

            ]);

        }
    );


    result.pt.forEach(
        item => {

            rows.push([

                result.name,
                "Performance Task",
                item.name,
                item.score,
                item.total

            ]);

        }
    );


    result.exam.forEach(
        item => {

            rows.push([

                result.name,
                "Exam",
                item.name,
                item.score,
                item.total

            ]);

        }
    );


    const csv =
        rows
            .map(
                row =>
                    row
                        .map(
                            cell =>
                                `"${String(
                                    cell
                                ).replaceAll(
                                    '"',
                                    '""'
                                )}"`
                        )
                        .join(",")
            )
            .join("\n");


    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href = url;


    link.download =
        `${
            result.name
                .replace(
                    /[^a-z0-9]/gi,
                    "_"
                )
        }_grades.csv`;


    link.click();


    URL.revokeObjectURL(
        url
    );
}


// ==========================================
// CLEAR CURRENT SUBJECT
// ==========================================

function clearAll() {

    const confirmed =
        confirm(
            "Clear all current scores?"
        );


    if (!confirmed) {
        return;
    }


    subjectName.value = "";


    document.getElementById(
        "wwList"
    ).innerHTML = "";


    document.getElementById(
        "ptList"
    ).innerHTML = "";


    document.getElementById(
        "examList"
    ).innerHTML = "";


    document.getElementById(
        "wwResult"
    ).textContent = "—";


    document.getElementById(
        "ptResult"
    ).textContent = "—";


    document.getElementById(
        "examResult"
    ).textContent = "—";


    document.getElementById(
        "initialResult"
    ).textContent = "—";


    document.getElementById(
        "finalGrade"
    ).textContent = "—";


    document.getElementById(
        "gpa"
    ).textContent = "—";


    document.getElementById(
        "gradeStatus"
    ).textContent =
        "Enter your scores to calculate";


    document.getElementById(
        "descriptor"
    ).textContent = "—";


    updateBar(
        "wwBar",
        "wwChartText",
        0
    );

    updateBar(
        "ptBar",
        "ptChartText",
        0
    );

    updateBar(
        "examBar",
        "examChartText",
        0
    );


    addAssessment("ww");
    addAssessment("pt");
    addAssessment("exam");
}


// ==========================================
// BUTTON EVENTS
// ==========================================

document
    .getElementById("addWWBtn")
    .addEventListener(
        "click",
        () =>
            addAssessment("ww")
    );


document
    .getElementById("addPTBtn")
    .addEventListener(
        "click",
        () =>
            addAssessment("pt")
    );


document
    .getElementById("addExamBtn")
    .addEventListener(
        "click",
        () =>
            addAssessment("exam")
    );


document
    .getElementById("calculateBtn")
    .addEventListener(
        "click",
        calculateGrade
    );


document
    .getElementById("saveBtn")
    .addEventListener(
        "click",
        saveData
    );


document
    .getElementById("saveMainBtn")
    .addEventListener(
        "click",
        saveData
    );


document
    .getElementById("exportBtn")
    .addEventListener(
        "click",
        exportCSV
    );


document
    .getElementById("clearBtn")
    .addEventListener(
        "click",
        clearAll
    );


// ==========================================
// START APPLICATION
// ==========================================

addAssessment("ww");

addAssessment("pt");

addAssessment("exam");

updateWeightTotal();

renderSubjects();
