var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var car = document.getElementById("car");
var roadblocks = document.getElementsByClassName("roadblock");
var flag = document.getElementById("flag");
var position = 0;
var roadmap = document.querySelector('.roadmap');
var roadmapWidth = roadmap.offsetWidth;
var isMoving = false;
var currentRoadblock = 0;

// Popup data array
const popupData = [
    {
        problem: "Problem 1: I assumed it would be similar to my experience",
        description: "<ul><li>No priority or incentives</li><li>Low relative metrics </li><li>Different social media channels </li><li>Staff didn't know we exist</li><li>No trust and worries about misrepresentation </li></ul>",
        solution: "Report metrics to create incentives, improve trust and visibility",
        solutionDescription: "<ul><li><span class='clickable' id='thirtyDayReport'>30 day reports</span></li><li> Follow up emails saying it would have been higher if under embargo</li><li>Use management language</li></ul>",
        additionalPopup: {
            title: "30 Day Report",
            content: "The 30 day report includes:<ul><li>Total reach across all platforms</li><li>Altmetric scores</li><li>global coverage and languages</li><li>Ad equivalency</li></ul>",
            pdfLink: "30-day-report.pdf",
            pdfLinkText: "View Sample 30 Day Report (PDF)"
        }
    },
    {
        problem: "Problem 2: We became the limiting factor",
        description: "With more visibility comes greater workload. More research was coming to us for press releases than we could manage.",
        solution: "Find researchers willing to communicate directly (and work with ARN!)",
        solutionDescription: "<ul><li>1-1 coffees </li><li>Information sessions with management speakers - Is research comms a waste of your time?</li><li>Listening to their needs</li><ul>",
        image: {
            src: "picture1.png",
            alt: "Research outreach workshop audience and presenter"
        },
    },
    
    {
        problem: "Problem 3: Researchers willing but not yet trained",
        description: "<ul><li>Academic language</li><li>Missing hooks</li><li>Inverted pyramid the wrong way up</li><ul>",
        solution: "Identify needs and run targeted workshop series.",
        solutionDescription: "<ul><li>Online course</li><li>Internal and external workshops</li><li>Feedback after every session</li></ul>",
        image: {
            src: "meme.jpeg",
            alt: "meme about feedback",
        },
    },
    {
        problem: "Problem 4: Once again, we made assumptions about knowledge and fears",
        description: "<ul><li>Pitching workshops too high, too serious, too close to work</li><ul>",
        solution: "Scale back, adapt and make everything fun!",
        solutionDescription: "<ul><li>Changed tack to introduce fun, competition, and themes</li><li>Community is EVERYTHING! (+ wine)</li><li>Create a mailing list for those interested</li></ul>",
        image: {
            src: "wine.jpg",
            alt: "wine glasses",
        },
    },
    {
        problem: "Problem 5: Journalists are tricky! Too hard too fast",
        description: "<ul><li>China</li><li>Timezones</li><li>Names</li><li>Cold pitches not working</li></ul>",
        solution: "Chill out and target specific long-term relationships",
        solutionDescription: "<ul><li>Softly softly - Like posts first,then comment - Build relationships</li><li>Respond to requests, then pitch</li><li>Focus on journalists with China perspective",
        image: {
            src: "china.jpeg",
            alt: "Map of china",
        },
    },
    {
        problem: "Problem 6: Overlooking specific interview/journalist needs",
        description: "<ul><li>When journalists came to us researchers reverted back to academic language and structures. </li><li> They didn't realise how quickly they needed to respond</li><li>Not understanding Freedom of the Press</li><li>Think that personal anecdotes etc devalued their data</li><ul>",
        solution: "Meet beforehand 1-1 to discuss their answers and run through concerns and processes.",
        solutionDescription: "Address sensitivities, tactics, processes etc",
        image: {
            src: "gentle.jpeg",
            alt: "Be gentle meme",
        },
    },
];

// Hide all roadblocks initially
for (let i = 0; i < roadblocks.length; i++) {
    roadblocks[i].style.opacity = 0;
    
    // Add click event listener to each roadblock
    roadblocks[i].addEventListener('click', function() {
        if (this.style.opacity !== '0') {
            openModal(i);
        }
    });
}


car.addEventListener('click', toggleCarMovement);

function toggleCarMovement() {
    if (!isMoving) {
        isMoving = true;
        moveCar();
    }
}


function moveCar() {
    const maxPosition = roadmapWidth - car.offsetWidth - 40;
    if (position < maxPosition && isMoving) {
        position += 2;
        car.style.left = position + 'px';
        checkRoadblocks();
        requestAnimationFrame(moveCar);
    } else if (position >= maxPosition) {
        isMoving = false;
        flag.style.display = "block";
        console.log('Car reached finish line'); // Debug log
        createConfetti();
        showFinishImage();
    }
}

function checkRoadblocks() {
    if (currentRoadblock < roadblocks.length && currentRoadblock < popupData.length) {
        var roadblockPosition = roadblocks[currentRoadblock].offsetLeft;
        if (position >= roadblockPosition - 40) {
            isMoving = false;
            // Make the current roadblock visible
            roadblocks[currentRoadblock].style.opacity = 1;
            
            
            currentRoadblock++;
        }
    }
    
    // Turn passed roadblocks green
    for (let i = 0; i < roadblocks.length; i++) {
        var roadblockPosition = roadblocks[i].offsetLeft;
        var roadblockWidth = roadblocks[i].offsetWidth;
        var carWidth = car.offsetWidth;
        
        // Check if the car has moved 50% past the roadblock
        if (position + carWidth / 2 > roadblockPosition + roadblockWidth / 2) {
            roadblocks[i].style.backgroundColor = 'green';
            roadblocks[i].style.borderColor = 'green';
        }
    }
}


let currentStep = 1;

function openModal(roadblockIndex) {
    const popupContent = popupData[roadblockIndex];

    document.getElementById("modalProblem").textContent = popupContent.problem;
    document.getElementById("modalDescription").innerHTML = popupContent.description;
    document.getElementById("modalSolution").textContent = popupContent.solution;

    // Combine solution description and image
    let solutionDescriptionHtml = popupContent.solutionDescription;
    if (popupContent.image) {
        solutionDescriptionHtml += `<img src="${popupContent.image.src}" alt="${popupContent.image.alt}" class="popup-image">`;
    }
    document.getElementById("modalSolutionDescription").innerHTML = solutionDescriptionHtml;

    modal.style.display = "block";
    currentStep = 1;
    document.getElementById("solutionContainer").classList.add("hidden");
    document.getElementById("nextButton").textContent = "Solution";

    // Add click event listener for "30 day report"
    if (roadblockIndex === 0) {
        const thirtyDayReportElement = document.getElementById("thirtyDayReport");
        if (thirtyDayReportElement) {
            thirtyDayReportElement.addEventListener('click', function() {
                openAdditionalPopup(popupContent.additionalPopup);
            });
        }
    }

    document.getElementById("nextButton").onclick = function() {
        if (currentStep === 1) {
            document.getElementById("solutionContainer").classList.remove("hidden");
            this.textContent = "Solved";
            currentStep = 2;
        } else {
            modal.style.display = "none";
            currentStep = 1;
        }
    };

        // Add this event listener for the close button
    span.onclick = function() {
        modal.style.display = "none";
        currentStep = 1;
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            currentStep = 1;
        }
    };
}

function createConfetti() {
    console.log('Creating confetti'); // Debug log
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function getRandomColor() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    return colors[Math.floor(Math.random() * colors.length)];
}
function openAdditionalPopup(popupContent) {
    const additionalModal = document.createElement('div');
    additionalModal.className = 'modal';
    additionalModal.innerHTML = `
        <div class="modal-content additional-popup">
            <span class="close">&times;</span>
            <h2>${popupContent.title}</h2>
            <div>${popupContent.content}</div>
            <a href="${popupContent.pdfLink}" target="_blank" rel="noopener noreferrer" class="pdf-link">${popupContent.pdfLinkText}</a>
        </div>
    `;
    document.body.appendChild(additionalModal);

    additionalModal.style.display = 'block';

    const closeBtn = additionalModal.querySelector('.close');
    closeBtn.onclick = function() {
        additionalModal.style.display = 'none';
        additionalModal.remove();
    };

    window.onclick = function(event) {
        if (event.target === additionalModal) {
            additionalModal.style.display = 'none';
            additionalModal.remove();
        }
    };
}

