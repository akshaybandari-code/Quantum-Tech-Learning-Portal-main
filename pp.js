let emailEl = document.getElementById("inputemail");
let idEl = document.getElementById("input_id");
let saveBtn = document.getElementById("saveBtn");

let nameEl = document.getElementById("name");
let genderEl = document.getElementById("gender");
let emailElPost = document.getElementById("email");
let statusEl = document.getElementById("status");
let createBtn = document.getElementById("createAccountBtn");

let signinMsg = document.getElementById("signinMsg");
let createMsg = document.getElementById("createMsg");

let signinSection = document.getElementById("signinSection");
let createSection = document.getElementById("createSection");

let showCreate = document.getElementById("showCreate");
let showSignin = document.getElementById("showSignin");
let toggleId = document.getElementById("toggleId");

let afterlogine = document.getElementById("afterlogine");

let GOREST_URL = "https://gorest.co.in/public/v2/users";
let GOREST_TOKEN =
    "Bearer 5b8faa3592569928a8aa07468fac524e3255d48825a42c698da9b7eb99ef1415";
let EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";
let EMAIL_SERVICE_ID = "service_q24sneo";
let EMAIL_TEMPLATE_ID = "template_9evi0kj";
let EMAIL_PUBLIC_KEY = "YWhetqGVw6z2_LN6j";

function sendEmail(serviceId, templateId, publicKey, templateParams) {
    let data = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: templateParams,
    };

    return fetch(EMAILJS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(function(response) {
        if (response.status !== 200) {
            return Promise.reject("Email failed");
        }
        return response.text();
    });
}

saveBtn.addEventListener("click", function() {
    signinMsg.textContent = "";
    signinMsg.classList.remove(
        "text-red-400",
        "text-green-400",
        "text-center",
        "mt-4",
    );

    if (idEl.value === "") {
        signinMsg.textContent = "Enter ID";
        signinMsg.classList.add("text-red-400", "text-center", "mt-4");
        return;
    }

    if (emailEl.value === "") {
        signinMsg.textContent = "Enter Email";
        signinMsg.classList.add("text-red-400", "text-center", "mt-4");
        return;
    }

    fetch(`${GOREST_URL}/${idEl.value}`, {
            method: "GET",
            headers: {
                Authorization: GOREST_TOKEN,
            },
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.message) {
                signinMsg.textContent = "User ID not found";
                signinMsg.classList.add("text-red-400", "text-center", "mt-4");
                return;
            }

            if (data.email === emailEl.value.trim()) {
                signinMsg.textContent = "Login successful";
                signinMsg.classList.add("text-green-400", "text-center", "mt-4");

                setTimeout(function() {
                    signinSection.classList.add("hidden");
                    afterlogine.classList.remove("hidden");

                    qubitsCount = 0;
                    modulesCount = 0;

                    updateDashboard(); // <-- THIS IS ENOUGH

                    document.getElementById("profileName").textContent = data.name;
                    document.getElementById("profileEmail").textContent = data.email;
                    document.getElementById("profileGender").textContent = "Gender: " + data.gender;
                    document.getElementById("profileStatus").textContent = "Status: " + data.status;
                    document.getElementById("profileId").textContent = "User ID: " + data.id;
                    document.getElementById("nameinDA").textContent = data.name;
                }, 1000);
            } else {
                signinMsg.textContent = "Invalid credentials";
                signinMsg.classList.add("text-red-400", "text-center", "mt-4");
            }
        })
        .catch(function() {
            signinMsg.textContent = "Server error";
            signinMsg.classList.add("text-red-400", "text-center", "mt-4");
        });
});

createBtn.addEventListener("click", function() {
    createMsg.textContent = "";
    createMsg.classList.remove(
        "text-red-400",
        "text-green-400",
        "text-center",
        "mt-4",
    );

    if (nameEl.value === "") {
        createMsg.textContent = "Enter Name";
        createMsg.classList.add("text-red-400", "text-center", "mt-4");
        return;
    }

    if (genderEl.value === "") {
        createMsg.textContent = "Select Gender";
        createMsg.classList.add("text-red-400", "text-center", "mt-4");
        return;
    }

    if (emailElPost.value === "") {
        createMsg.textContent = "Enter Email";
        createMsg.classList.add("text-red-400", "text-center", "mt-4");
        return;
    }

    let userData = {
        name: nameEl.value.trim(),
        gender: genderEl.value,
        email: emailElPost.value.trim(),
        status: statusEl.value,
    };

    fetch(GOREST_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: GOREST_TOKEN,
            },
            body: JSON.stringify(userData),
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data[0]?.field === "email") {
                createMsg.textContent = "Email already exists";
                createMsg.classList.add("text-red-400", "text-center", "mt-4");
                return;
            }

            createMsg.textContent = "Account created! Sending ID...";
            createMsg.classList.add("text-green-400", "text-center", "mt-4");

            sendEmail(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, EMAIL_PUBLIC_KEY, {
                    to_email: data.email,
                    user_id: data.id,
                    user_name: data.name,
                })
                .then(function() {
                    createMsg.textContent = "ID sent to your email";

                    setTimeout(function() {
                        createSection.classList.add("hidden");
                        signinSection.classList.remove("hidden");
                    }, 2000);
                })
                .catch(function() {
                    createMsg.textContent = "Email failed, but account created";
                    createMsg.classList.add("text-red-400", "text-center", "mt-4");
                });
        })
        .catch(function() {
            createMsg.textContent = "Server error";
            createMsg.classList.add("text-red-400", "text-center", "mt-4");
        });
});

showCreate.addEventListener("click", function() {
    signinSection.classList.add("hidden");
    createSection.classList.remove("hidden");
});

showSignin.addEventListener("click", function() {
    createSection.classList.add("hidden");
    signinSection.classList.remove("hidden");
});

toggleId.addEventListener("click", function() {
    if (idEl.type === "password") {
        idEl.type = "text";
        toggleId.textContent = "Not show";
    } else {
        idEl.type = "password";
        toggleId.textContent = "show";
    }
});

const dashboard = document.getElementById("dashboard");
const learn = document.getElementById("learn");
const simulators = document.getElementById("simulators");
const research = document.getElementById("research");
const careers = document.getElementById("careers");
const profile = document.getElementById("profile");

const dashboardBtn = document.getElementById("dashboardBtn");
const learnBtn = document.getElementById("learnBtn");
const simBtn = document.getElementById("simBtn");
const researchBtn = document.getElementById("researchBtn");
const careerBtn = document.getElementById("careerBtn");
const profileBtn = document.getElementById("profileBtn");
const resumeBtn = document.getElementById("resumeBtn");

let class1 = document.getElementById("class1");
let class2 = document.getElementById("class2");
let class3 = document.getElementById("class3");
let class4 = document.getElementById("class4");
let class5 = document.getElementById("class5");
let class6 = document.getElementById("class6");
let class7 = document.getElementById("class7");
let class8 = document.getElementById("class8");
let class9 = document.getElementById("class9");
let class10 = document.getElementById("class10");
let class11 = document.getElementById("class11");
let class12 = document.getElementById("class12");
let class13 = document.getElementById("class13");
let class14 = document.getElementById("class14");
let class15 = document.getElementById("class15");

let mainPlayer = document.getElementById("mainPlayer");
let videoTitle = document.getElementById("videoTitle");

let qubitsCount = 0;
let modulesCount = 0;
let totalClasses = 15;

let percentageText = document.getElementById("persentage");
let progressBar = document.getElementById("progressBar");
let progressText = document.getElementById("progressText");

let classover = document.getElementById("classover");
let moduleover = document.getElementById("moduleover");

let class1Done = false;
let class2Done = false;
let class3Done = false;
let class4Done = false;
let class5Done = false;
let class6Done = false;
let class7Done = false;
let class8Done = false;
let class9Done = false;
let class10Done = false;
let class11Done = false;
let class12Done = false;
let class13Done = false;
let class14Done = false;
let class15Done = false;

let module1Count = 0;
let module2Count = 0;
let module3Count = 0;

function updateDashboard() {
    classover.textContent = qubitsCount;
    moduleover.textContent = modulesCount;

    let percent = Math.floor((qubitsCount / totalClasses) * 100);

    percentageText.textContent = percent + "%";

    progressBar.style.width = percent + "%";

    progressText.textContent = percent + "% completed";
}

class1.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/X8MZWCGgIb8";
    videoTitle.textContent = "Frontend Development Essentials-1";

    if (class1Done === false) {
        class1Done = true;
        qubitsCount++;
        module1Count++;

        if (module1Count === 2) {
            modulesCount++;
        }

        updateDashboard();
    }
});

class2.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/tsbCSkvHhMo";
    videoTitle.textContent = "Problem Solving With Python Programming-2";

    if (class2Done === false) {
        class2Done = true;
        qubitsCount++;
        module1Count++;

        if (module1Count === 2) {
            modulesCount++;
        }

        updateDashboard();
    }
});

class3.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/E5d-_UkIk34";
    videoTitle.textContent = "Calculus and Differential Equations";

    if (class3Done === false) {
        class3Done = true;
        qubitsCount++;
        module2Count++;

        if (module2Count === 1) {
            modulesCount++;
        }

        updateDashboard();
    }
});

class4.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/tsbCSkvHhMo";
    videoTitle.textContent = "Problem Solving With Python Programming-2";

    if (class4Done === false) {
        class4Done = true;
        qubitsCount++;
        module2Count++;

        if (module2Count === 6) {
            modulesCount++;
        }

        updateDashboard();
    }
});
class5.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/tsbCSkvHhMo";
    videoTitle.textContent = "Problem Solving With Python Programming-2";

    if (class5Done === false) {
        class5Done = true;
        qubitsCount++;
        module2Count++;

        if (module2Count === 6) {
            modulesCount++;
        }

        updateDashboard();
    }
});

class6.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/tsbCSkvHhMo";
    videoTitle.textContent = "Problem Solving With Python Programming-2";

    if (class6Done === false) {
        class6Done = true;
        qubitsCount++;
        module2Count++;

        if (module2Count === 6) {
            modulesCount++;
        }

        updateDashboard();
    }
});

class7.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/tsbCSkvHhMo";
    videoTitle.textContent = "Problem Solving With Python Programming-2";

    if (class7Done === false) {
        class7Done = true;
        qubitsCount++;
        module2Count++;

        if (module2Count === 6) {
            modulesCount++;
        }

        updateDashboard();
    }
});

class8.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/tsbCSkvHhMo";
    videoTitle.textContent = "Problem Solving With Python Programming-2";

    if (class8Done === false) {
        class8Done = true;
        qubitsCount++;
        module2Count++;

        if (module2Count === 6) {
            modulesCount++;
        }

        updateDashboard();
    }
});

class9.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/tsbCSkvHhMo";
    videoTitle.textContent = "Problem Solving With Python Programming-2";

    if (class9Done === false) {
        class9Done = true;
        qubitsCount++;
        module3Count++;

        if (module3Count === 7) {
            // because module 3 has 7 classes
            modulesCount++;
        }

        updateDashboard();
    }
});

class10.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/tsbCSkvHhMo";
    videoTitle.textContent = "Problem Solving With Python Programming-2";

    if (class10Done === false) {
        class10Done = true;
        qubitsCount++;
        module3Count++;

        if (module3Count === 2) {
            modulesCount++;
        }

        updateDashboard();
    }
});

class11.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/tsbCSkvHhMo";
    videoTitle.textContent = "Problem Solving With Python Programming-2";

    if (class11Done === false) {
        class11Done = true;
        qubitsCount++;
        module3Count++;

        if (module3Count === 2) {
            modulesCount++;
        }

        updateDashboard();
    }
});

class12.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/tsbCSkvHhMo";
    videoTitle.textContent = "Problem Solving With Python Programming-2";

    if (class12Done === false) {
        class12Done = true;
        qubitsCount++;
        module3Count++;

        if (module3Count === 2) {
            modulesCount++;
        }

        updateDashboard();
    }
});

class13.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/tsbCSkvHhMo";
    videoTitle.textContent = "Problem Solving With Python Programming-2";

    if (class13Done === false) {
        class13Done = true;
        qubitsCount++;
        module3Count++;

        if (module3Count === 2) {
            modulesCount++;
        }

        updateDashboard();
    }
});

class14.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/tsbCSkvHhMo";
    videoTitle.textContent = "Problem Solving With Python Programming-2";

    if (class14Done === false) {
        class14Done = true;
        qubitsCount++;
        module3Count++;

        if (module3Count === 2) {
            modulesCount++;
        }

        updateDashboard();
    }
});

class15.addEventListener("click", function() {
    mainPlayer.src = "https://www.youtube.com/embed/tsbCSkvHhMo";
    videoTitle.textContent = "Problem Solving With Python Programming-2";

    if (class15Done === false) {
        class15Done = true;
        qubitsCount++;
        module3Count++;

        if (module3Count === 2) {
            modulesCount++;
        }

        updateDashboard();
    }
});

function hideAll() {
    dashboard.classList.add("hidden");
    learn.classList.add("hidden");
    simulators.classList.add("hidden");
    research.classList.add("hidden");
    careers.classList.add("hidden");
    profile.classList.add("hidden");
    showSuperposition.classList.add("hidden");
    careerMainContent.classList.remove("hidden");
}

dashboardBtn.addEventListener("click", function() {
    hideAll();
    dashboard.classList.remove("hidden");
    dashboardBtn.classList.add("text-black", "font-semibold");
    learnBtn.classList.remove("text-black", "font-semibold");
    simBtn.classList.remove("text-black", "font-semibold");
    researchBtn.classList.remove("text-black", "font-semibold");
    careerBtn.classList.remove("text-black", "font-semibold");
});

learnBtn.addEventListener("click", function() {
    hideAll();
    learn.classList.remove("hidden");
    console.log("Learn clicked");
    dashboardBtn.classList.remove("text-black", "font-semibold");
    learnBtn.classList.add("text-black", "font-semibold");
    simBtn.classList.remove("text-black", "font-semibold");
    researchBtn.classList.remove("text-black", "font-semibold");
    careerBtn.classList.remove("text-black", "font-semibold");
});

simBtn.addEventListener("click", function() {
    hideAll();
    simulators.classList.remove("hidden");
    dashboardBtn.classList.remove("text-black", "font-semibold");
    learnBtn.classList.remove("text-black", "font-semibold");
    simBtn.classList.add("text-black", "font-semibold");
    researchBtn.classList.remove("text-black", "font-semibold");
    careerBtn.classList.remove("text-black", "font-semibold");
    alert("This Page is not confirmed")
});

researchBtn.addEventListener("click", function() {
    hideAll();
    research.classList.remove("hidden");
    dashboardBtn.classList.remove("text-black", "font-semibold");
    learnBtn.classList.remove("text-black", "font-semibold");
    simBtn.classList.remove("text-black", "font-semibold");
    researchBtn.classList.add("text-black", "font-semibold");
    careerBtn.classList.remove("text-black", "font-semibold");
});

careerBtn.addEventListener("click", function() {
    hideAll();
    careers.classList.remove("hidden");
    dashboardBtn.classList.remove("text-black", "font-semibold");
    learnBtn.classList.remove("text-black", "font-semibold");
    simBtn.classList.remove("text-black", "font-semibold");
    researchBtn.classList.remove("text-black", "font-semibold");
    careerBtn.classList.add("text-black", "font-semibold");
});

profileBtn.addEventListener("click", function() {
    hideAll();
    profile.classList.remove("hidden");
});

resumeBtn.addEventListener("click", function() {
    hideAll();
    learn.classList.remove("hidden");
});

let module1Header = document.getElementById("module1Header");
let module2Header = document.getElementById("module2Header");
let module3Header = document.getElementById("module3Header");

let module1Content = document.getElementById("module1Content");
let module2Content = document.getElementById("module2Content");
let module3Content = document.getElementById("module3Content");

let arrow1 = document.getElementById("arrow1");
let arrow2 = document.getElementById("arrow2");
let arrow3 = document.getElementById("arrow3");

function closeAllModules() {
    module1Content.classList.add("hidden");
    module2Content.classList.add("hidden");
    module3Content.classList.add("hidden");

    arrow1.style.transform = "rotate(0deg)";
    arrow2.style.transform = "rotate(0deg)";
    arrow3.style.transform = "rotate(0deg)";
}

module1Header.addEventListener("click", function() {
    let isOpen = !module1Content.classList.contains("hidden");

    closeAllModules();

    if (!isOpen) {
        module1Content.classList.remove("hidden");
        arrow1.style.transform = "rotate(180deg)";
    }
});

module2Header.addEventListener("click", function() {
    let isOpen = !module2Content.classList.contains("hidden");

    closeAllModules();

    if (!isOpen) {
        module2Content.classList.remove("hidden");
        arrow2.style.transform = "rotate(180deg)";
    }
});

module3Header.addEventListener("click", function() {
    let isOpen = !module3Content.classList.contains("hidden");

    closeAllModules();

    if (!isOpen) {
        module3Content.classList.remove("hidden");
        arrow3.style.transform = "rotate(180deg)";
    }
});

let Superposition = document.getElementById("Superposition");
let showSuperposition = document.getElementById("showSuperposition");
let careerMainContent = document.getElementById("careerMainContent");

Superposition.addEventListener("click", function() {
    hideAll();
    careers.classList.remove("hidden");
    careerMainContent.classList.add("hidden");
    showSuperposition.classList.remove("hidden");
    document.getElementById("submitQuiz").addEventListener("click", function() {

        let score = 0;

        let q1 = document.querySelector('input[name="q1"]:checked');
        let q2 = document.querySelector('input[name="q2"]:checked');
        let q3 = document.querySelector('input[name="q3"]:checked');

        if (!q1 || !q2 || !q3) {
            let result = document.getElementById("quizResult");
            result.textContent = "Please answer all questions.";
            result.className = "text-red-600 font-semibold";
            return;
        }

        if (q1.value === "correct") score++;
        if (q2.value === "correct") score++;
        if (q3.value === "correct") score++;

        let result = document.getElementById("quizResult");
        result.textContent = "Your Score: " + score + " / 3";

        if (score === 3) {
            result.className = "text-green-600 font-semibold";
        } else {
            result.className = "text-yellow-600 font-semibold";
        }

    });
});