// Featured slider functionality
const slides = document.querySelectorAll(".featured-slide");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(nextSlide, 6000); // slide every 6 sec

// Navigation buttons & section toggling
const styleQuizSection = document.getElementById("styleQuiz");
const roomVisualizerSection = document.getElementById("roomVisualizer");
const galleryPreview = document.getElementById("galleryPreview");
const featuredSection = document.getElementById("featured");

document.getElementById("btnStyleQuiz").addEventListener("click", () => {
    styleQuizSection.classList.remove("hidden");
    roomVisualizerSection.classList.add("hidden");
    galleryPreview.classList.add("hidden");
    featuredSection.classList.add("hidden");
});

document.getElementById("btnRoomVisualizer").addEventListener("click", () => {
    roomVisualizerSection.classList.remove("hidden");
    styleQuizSection.classList.add("hidden");
    galleryPreview.classList.add("hidden");
    featuredSection.classList.add("hidden");
});

document.getElementById("btnShopChandeliers").addEventListener("click", () => {
    alert("Chandeliers shop coming soon!");
});
document.getElementById("btnShopSanitary").addEventListener("click", () => {
    alert("Sanitary shop coming soon!");
});
document.getElementById("btnShopByRoom").addEventListener("click", () => {
    alert("Shop by Room coming soon!");
});

// --- Style Selector Quiz ---

const quizQuestions = [{
        question: "Which room are you decorating?",
        options: ["Living Room", "Bathroom", "Hallway", "Dining Room"],
    },
    {
        question: "Which style do you prefer?",
        options: ["Modern", "Vintage", "Minimalist", "Royal & Luxurious"],
    },
    {
        question: "What colors do you like?",
        options: ["Gold & Blues", "White & Greys", "Earth Tones", "Bold Colors"],
    },
];

let quizStep = 0;
const quizContent = document.getElementById("quizContent");
const quizPrevBtn = document.getElementById("quizPrev");
const quizNextBtn = document.getElementById("quizNext");
const quizAnswers = new Array(quizQuestions.length).fill(null);

function renderQuizStep() {
    quizContent.innerHTML = "";
    const stepData = quizQuestions[quizStep];
    const questionEl = document.createElement("div");
    questionEl.className = "quiz-question";
    questionEl.textContent = stepData.question;
    quizContent.appendChild(questionEl);

    const optionsEl = document.createElement("div");
    optionsEl.className = "quiz-options";

    stepData.options.forEach((opt, i) => {
        const optionBtn = document.createElement("button");
        optionBtn.className = "quiz-option";
        optionBtn.textContent = opt;
        if (quizAnswers[quizStep] === i) optionBtn.classList.add("selected");
        optionBtn.addEventListener("click", () => {
            quizAnswers[quizStep] = i;
            renderQuizStep();
            quizNextBtn.disabled = false;
        });
        optionsEl.appendChild(optionBtn);
    });

    quizContent.appendChild(optionsEl);

    // Update button states
    quizPrevBtn.disabled = quizStep === 0;
    quizNextBtn.disabled = quizAnswers[quizStep] === null;
    if (quizStep === quizQuestions.length - 1) {
        quizNextBtn.textContent = "See Results";
    } else {
        quizNextBtn.textContent = "Next";
    }
}

quizPrevBtn.addEventListener("click", () => {
    if (quizStep > 0) {
        quizStep--;
        renderQuizStep();
    }
});

quizNextBtn.addEventListener("click", () => {
    if (quizStep < quizQuestions.length - 1) {
        quizStep++;
        renderQuizStep();
    } else {
        showQuizResults();
    }
});

function showQuizResults() {
    quizContent.innerHTML = "";
    quizPrevBtn.disabled = true;
    quizNextBtn.disabled = true;
    quizNextBtn.style.display = "none";

    // Simple logic for recommendations based on quizAnswers
    const styles = ["Modern", "Vintage", "Minimalist", "Royal & Luxurious"];
    const styleChosen = styles[index];

    const resultTitle = document.createElement("h3");
    resultTitle.style.color = "var(--gold)";
    resultTitle.textContent = "Your Recommended Style:";
    const resultText = document.createElement("p");
    resultText.textContent = `We recommend a "${styleChosen}" theme for your space. Explore our exclusive collection tailored just for you!`;

    quizContent.appendChild(resultTitle);
    quizContent.appendChild(resultText);
}

// Initial quiz render
renderQuizStep();

// --- Room Visualizer ---

const roomImages = {
    living: "https://images.unsplash.com/photo-1602524819674-0b9a8cdbe6c2?auto=format&fit=crop&w=900&q=80",
    bathroom: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=900&q=80",
    hallway: "https://images.unsplash.com/photo-1560448070-9e9a0d5def7e?auto=format&fit=crop&w=900&q=80",
};

const chandeliers = {
    classic: "https://upload.wikimedia.org/wikipedia/commons/5/55/Chandelier_Classic.jpg",
    modern: "https://upload.wikimedia.org/wikipedia/commons/7/77/Modern_chandelier%2C_VitraHaus%2C_Dusseldorf%2C_Germany.JPG",
    royal: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Crystal_chandelier_in_the_Sheraton_Hua_Hin_Resort_%286393248368%29.jpg",
};

const sanitaryItems = {
    ceramic: "https://upload.wikimedia.org/wikipedia/commons/8/81/Bathroom_Sink_And_Tap.JPG",
    modernTap: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Modern_bathroom_sink_and_faucet_01.JPG",
    luxuryFixture: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Luxury_bathroom_basin.jpg",
};

const roomSelector = document.getElementById("roomSelector");
const chandelierSelector = document.getElementById("chandelierSelector");
const sanitarySelector = document.getElementById("sanitarySelector");
const roomImage = document.getElementById("roomImage");
const productOverlay = document.getElementById("productOverlay");

function populateSelectors() {
    chandelierSelector.innerHTML = "";
    sanitarySelector.innerHTML = "";

    Object.entries(chandeliers).forEach(([key, url]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        chandelierSelector.appendChild(option);
    });

    Object.entries(sanitaryItems).forEach(([key, url]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        sanitarySelector.appendChild(option);
    });
}

function updateVisualizer() {
    const selectedRoom = roomSelector.value;
    const selectedChandelier = chandelierSelector.value;
    const selectedSanitary = sanitarySelector.value;

    roomImage.src = roomImages[selectedRoom];
    productOverlay.style.backgroundImage = `url(${chandeliers[selectedChandelier]})`;
    // For demonstration, overlay is just the chandelier image; could expand to sanitary overlay
}

roomSelector.addEventListener("change", updateVisualizer);
chandelierSelector.addEventListener("change", updateVisualizer);
sanitarySelector.addEventListener("change", updateVisualizer);

// Initialize selectors and visualizer
populateSelectors();
updateVisualizer();