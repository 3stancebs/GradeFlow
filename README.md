# 📊 GradeFlow

A responsive student grade tracker and calculator built with **HTML, CSS, and JavaScript**.

GradeFlow helps students calculate subject grades, track assessments, estimate GPA, and save their grades directly in their browser.

## ✨ Features

* 📝 Add unlimited Written Works
* 🎯 Add unlimited Performance Tasks
* 📚 Add exam scores
* ⚖️ Customize grading weights
* 🇵🇭 Philippine grading system presets
* 🧮 Automatic grade calculation
* 📊 Visual performance bars
* 🎓 GPA estimation
* 💾 Save subjects using Local Storage
* 🌙 Dark mode
* 📱 Responsive design for mobile and desktop
* 📤 Export grade results as CSV
* 🧹 Clear and reset subject data
* ✨ Clean animations and modern UI

## 🛠️ Technologies Used

* **HTML5** — Website structure
* **CSS3** — Styling, responsive design, and animations
* **JavaScript** — Calculations, Local Storage, GPA estimation, and app functionality

## 📁 Project Structure

```text
GradeFlow/
│
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
├── .gitignore
│
└── assets/
    └── screenshot.png
```

## 🚀 How to Run

### Option 1 — Open directly

Download or clone the repository and open:

```text
index.html
```

in your web browser.

### Option 2 — VS Code

1. Clone the repository.
2. Open the project folder in VS Code.
3. Open `index.html`.
4. Use a browser or Live Server to run the website.

## 🧮 How GradeFlow Calculates Grades

Each grading category is calculated using:

**Category Percentage**

```text
Points Earned ÷ Total Points × 100
```

The weighted grade is then calculated using:

```text
Final Grade =
(WW × WW Weight)
+ (PT × PT Weight)
+ (Exam × Exam Weight)
```

For example, if Written Works is 20%, Performance Tasks is 50%, and Exams are 30%:

```text
Final Grade =
(WW × 0.20)
+ (PT × 0.50)
+ (Exam × 0.30)
```

## 💾 Data Storage

GradeFlow uses the browser's **Local Storage** to save subjects and grades.

This means saved data stays on the user's device/browser and does not require an online account or database.

## 📊 GPA Estimation

GradeFlow includes an estimated GPA conversion feature.

The GPA shown by the application is an **approximation** and may not match the grading scale used by every school.

## 📱 Responsive Design

GradeFlow is designed to work on:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile phones
* 📱 Tablets

## 📸 Preview

<img width="1310" height="690" alt="Image" src="https://github.com/user-attachments/assets/0ef14795-3ee7-4213-80aa-2fb0f7c21617" />
<img width="1312" height="691" alt="Image" src="https://github.com/user-attachments/assets/d1735bc2-0e0c-43aa-8053-fb83858c1309" />
<img width="1308" height="693" alt="Image" src="https://github.com/user-attachments/assets/a363a9e0-183e-4376-97a5-53d010981ed7" />
<img width="1308" height="690" alt="Image" src="https://github.com/user-attachments/assets/849ada80-c8ce-4d48-9cb6-9cd045d9d05f" />

## 🎯 Project Goals

This project was created as a learning project to practice:

* JavaScript programming
* DOM manipulation
* Functions and event handling
* Local Storage
* Responsive web design
* Git and GitHub
* Building a complete web application

## 🔮 Future Improvements

Possible future features include:

* User accounts
* Cloud database
* Grade history
* Semester tracking
* Multiple school years
* PDF grade reports
* Custom GPA scales
* Grade predictions
* React version
* Backend API
* Teacher dashboard

## 👨‍💻 Author

**Tristan F. Cebrian**

Grade 11 student learning software development and building projects to improve programming skills.

## 📄 License

This project is licensed under the **MIT License**.
