// Application State
const state = {
    currentPage: 'homePage',
    quizSetup: {
        currentStep: 1,
        selectedSubject: null,
        selectedTopic: null,
        selectedDifficulty: null
    },
    currentQuiz: {
        questions: [],
        currentQuestionIndex: 0,
        selectedAnswers: {},
        startTime: null,
        timerInterval: null,
        timeTaken: 0
    },
    quizHistory: [],
    userName: 'Guest'
};

// DOM Elements
const elements = {
    // Pages
    homePage: document.getElementById('homePage'),
    quizSetup: document.getElementById('quizSetup'),
    quizPage: document.getElementById('quizPage'),
    resultsPage: document.getElementById('resultsPage'),
    analysisPage: document.getElementById('analysisPage'),
    
    // Home Page Elements
    displayUserName: document.getElementById('displayUserName'),
    totalQuestions: document.getElementById('totalQuestions'),
    accuracyRate: document.getElementById('accuracyRate'),
    totalQuizzes: document.getElementById('totalQuizzes'),
    startNewQuiz: document.getElementById('startNewQuiz'),
    quizHistoryContainer: document.getElementById('quizHistoryContainer'),
    
    // Quiz Setup Elements
    subjectList: document.getElementById('subjectList'),
    topicList: document.getElementById('topicList'),
    difficultyList: document.getElementById('difficultyList'),
    prevStep: document.getElementById('prevStep'),
    nextStep: document.getElementById('nextStep'),
    startQuiz: document.getElementById('startQuiz'),
    backToHome: document.getElementById('backToHome'),
    
    // Quiz Page Elements
    quizSubjectTopic: document.getElementById('quizSubjectTopic'),
    quizDifficulty: document.getElementById('quizDifficulty'),
    timerDisplay: document.getElementById('timerDisplay'),
    currentQuestionNumber: document.getElementById('currentQuestionNumber'),
    totalQuestionsCount: document.getElementById('totalQuestionsCount'),
    progressFill: document.getElementById('progressFill'),
    questionText: document.getElementById('questionText'),
    codeBlock: document.getElementById('codeBlock'),
    questionCode: document.getElementById('questionCode'),
    optionsList: document.getElementById('optionsList'),
    prevQuestion: document.getElementById('prevQuestion'),
    nextQuestion: document.getElementById('nextQuestion'),
    submitQuiz: document.getElementById('submitQuiz'),
    
    // Results Page Elements
    performanceIcon: document.getElementById('performanceIcon'),
    performanceText: document.getElementById('performanceText'),
    performanceSubtext: document.getElementById('performanceSubtext'),
    correctAnswers: document.getElementById('correctAnswers'),
    incorrectAnswers: document.getElementById('incorrectAnswers'),
    unansweredQuestions: document.getElementById('unansweredQuestions'),
    scorePercentage: document.getElementById('scorePercentage'),
    timeTaken: document.getElementById('timeTaken'),
    resultSubject: document.getElementById('resultSubject'),
    resultTopic: document.getElementById('resultTopic'),
    resultDifficulty: document.getElementById('resultDifficulty'),
    reviewQuiz: document.getElementById('reviewQuiz'),
    newQuizFromResults: document.getElementById('newQuizFromResults'),
    backToHomeFromResults: document.getElementById('backToHomeFromResults'),
    
    // Analysis Page Elements
    analysisCurrentQuestion: document.getElementById('analysisCurrentQuestion'),
    analysisTotalQuestions: document.getElementById('analysisTotalQuestions'),
    analysisQuestionText: document.getElementById('analysisQuestionText'),
    analysisCodeBlock: document.getElementById('analysisCodeBlock'),
    analysisQuestionCode: document.getElementById('analysisQuestionCode'),
    analysisOptionsList: document.getElementById('analysisOptionsList'),
    analysisExplanation: document.getElementById('analysisExplanation'),
    explanationText: document.getElementById('explanationText'),
    prevAnalysisQuestion: document.getElementById('prevAnalysisQuestion'),
    nextAnalysisQuestion: document.getElementById('nextAnalysisQuestion'),
    backToResults: document.getElementById('backToResults'),
    backToHomeFromAnalysis: document.getElementById('backToHomeFromAnalysis'),
    
    // User Name Modal
    userNameModal: document.getElementById('userNameModal'),
    userNameInput: document.getElementById('userNameInput'),
    saveUserName: document.getElementById('saveUserName'),
    userName: document.getElementById('userName'),
    userNameEdit: document.getElementById('userNameEdit'),
    
    // Dark Mode Toggle
    darkModeToggle: document.getElementById('darkModeToggle')
};

// Utility Functions - Auto Extract Data from Questions
function getAllSubjects() {
    // Get all unique subjects from questions array
    const subjects = [...new Set(questions.map(q => q.subject))];
    return subjects.sort(); // Alphabetical sort
}

function getTopicsBySubject(subject) {
    // Get all unique topics for a specific subject
    const topics = [...new Set(questions
        .filter(q => q.subject === subject)
        .map(q => q.topic))];
    return topics.sort(); // Alphabetical sort
}

function getDifficultiesBySubjectAndTopic(subject, topic) {
    // Get all unique difficulties for specific subject and topic
    const difficulties = [...new Set(questions
        .filter(q => q.subject === subject && q.topic === topic)
        .map(q => q.difficulty))];
    return difficulties.sort(); // Alphabetical sort
}

function getQuestionsByCriteria(subject, topic, difficulty) {
    // Filter questions based on selected criteria
    return questions.filter(q => 
        q.subject === subject &&
        q.topic === topic &&
        q.difficulty === difficulty
    );
}

// Initialize Application
function init() {
    loadUserData();
    setupEventListeners();
    renderHomePage();
}

// Load user data from localStorage
function loadUserData() {
    const savedUserName = localStorage.getItem('quizUserName');
    const savedQuizHistory = localStorage.getItem('quizHistory');
    const savedTheme = localStorage.getItem('quizTheme');
    
    if (savedUserName) {
        state.userName = savedUserName;
        elements.displayUserName.textContent = savedUserName;
        elements.userName.textContent = savedUserName;
    }
    
    if (savedQuizHistory) {
        state.quizHistory = JSON.parse(savedQuizHistory);
    }
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateDarkModeIcon(savedTheme);
    }
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('quizUserName', state.userName);
    localStorage.setItem('quizHistory', JSON.stringify(state.quizHistory));
}

// Set up event listeners
function setupEventListeners() {
    // Navigation
    elements.startNewQuiz.addEventListener('click', showQuizSetup);
    elements.backToHome.addEventListener('click', showHomePage);
    elements.backToHomeFromResults.addEventListener('click', showHomePage);
    elements.backToHomeFromAnalysis.addEventListener('click', showHomePage);
    
    // Quiz Setup
    elements.prevStep.addEventListener('click', previousStep);
    elements.nextStep.addEventListener('click', nextStep);
    elements.startQuiz.addEventListener('click', startQuiz);
    
    // Quiz Page
    elements.prevQuestion.addEventListener('click', previousQuestion);
    elements.nextQuestion.addEventListener('click', nextQuestion);
    elements.submitQuiz.addEventListener('click', submitQuiz);
    
    // Results Page
    elements.reviewQuiz.addEventListener('click', showAnalysisPage);
    elements.newQuizFromResults.addEventListener('click', showQuizSetup);
    
    // Analysis Page
    elements.prevAnalysisQuestion.addEventListener('click', previousAnalysisQuestion);
    elements.nextAnalysisQuestion.addEventListener('click', nextAnalysisQuestion);
    elements.backToResults.addEventListener('click', showResultsPage);
    
    // User Name
    elements.userNameEdit.addEventListener('click', showUserNameModal);
    elements.saveUserName.addEventListener('click', saveUserName);
    
    // Dark Mode
    elements.darkModeToggle.addEventListener('click', toggleDarkMode);
}

// Show page functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    state.currentPage = pageId;
}

function showHomePage() {
    showPage('homePage');
    renderHomePage();
}

function showQuizSetup() {
    showPage('quizSetup');
    resetQuizSetup();
    renderSubjectSelection();
}

function showQuizPage() {
    showPage('quizPage');
    renderQuizQuestion();
    startTimer();
}

function showResultsPage() {
    showPage('resultsPage');
    renderResults();
}

function showAnalysisPage() {
    showPage('analysisPage');
    renderAnalysisQuestion();
}

// Home Page Rendering
function renderHomePage() {
    // Update user name
    elements.displayUserName.textContent = state.userName;
    
    // Calculate stats
    const totalQuestionsAttempted = calculateTotalQuestionsAttempted();
    const accuracy = calculateAccuracy();
    const totalQuizzesTaken = state.quizHistory.length;
    
    // Update stats
    elements.totalQuestions.textContent = totalQuestionsAttempted;
    elements.accuracyRate.textContent = `${accuracy}%`;
    elements.totalQuizzes.textContent = totalQuizzesTaken;
    
    // Render quiz history
    renderQuizHistory();
}

function calculateTotalQuestionsAttempted() {
    return state.quizHistory.reduce((total, quiz) => {
        return total + quiz.questions.length;
    }, 0);
}

function calculateAccuracy() {
    if (state.quizHistory.length === 0) return 0;
    
    const totalQuestions = calculateTotalQuestionsAttempted();
    const totalCorrect = state.quizHistory.reduce((total, quiz) => {
        return total + quiz.correctCount;
    }, 0);
    
    return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
}

function renderQuizHistory() {
    if (state.quizHistory.length === 0) {
        elements.quizHistoryContainer.innerHTML = `
            <div class="no-history">
                <p>No quiz history yet. Start your first quiz!</p>
            </div>
        `;
        return;
    }
    
    // Group quizzes by subject
    const quizzesBySubject = {};
    state.quizHistory.forEach(quiz => {
        if (!quizzesBySubject[quiz.subject]) {
            quizzesBySubject[quiz.subject] = [];
        }
        quizzesBySubject[quiz.subject].push(quiz);
    });
    
    // Sort subjects by number of attempts (highest first)
    const sortedSubjects = Object.keys(quizzesBySubject).sort((a, b) => {
        return quizzesBySubject[b].length - quizzesBySubject[a].length;
    });
    
    // Generate HTML for each subject group
    let historyHTML = '';
    sortedSubjects.forEach(subject => {
        const quizzes = quizzesBySubject[subject];
        const subjectIcon = getSubjectIcon(subject);
        
        historyHTML += `
            <div class="subject-group">
                <div class="subject-header">
                    <div class="subject-title">
                        <i class="${subjectIcon}"></i>
                        ${subject}
                    </div>
                    <div class="attempt-count">${quizzes.length} attempt${quizzes.length > 1 ? 's' : ''}</div>
                </div>
                <div class="quiz-cards">
                    ${quizzes.map(quiz => renderQuizCard(quiz)).join('')}
                </div>
            </div>
        `;
    });
    
    elements.quizHistoryContainer.innerHTML = historyHTML;
    
    // Add event listeners to quiz card buttons
    document.querySelectorAll('.reattempt-btn').forEach(button => {
        button.addEventListener('click', function() {
            const quizId = this.getAttribute('data-quiz-id');
            reattemptQuiz(quizId);
        });
    });
    
    document.querySelectorAll('.analyze-btn').forEach(button => {
        button.addEventListener('click', function() {
            const quizId = this.getAttribute('data-quiz-id');
            analyzeQuiz(quizId);
        });
    });
}

function renderQuizCard(quiz) {
    const date = new Date(quiz.date).toLocaleDateString();
    const time = new Date(quiz.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const score = Math.round((quiz.correctCount / quiz.questions.length) * 100);
    
    return `
        <div class="quiz-card">
            <div class="quiz-score">${score}%</div>
            <div class="quiz-details">
                <p><strong>Topic:</strong> ${quiz.topic}</p>
                <p><strong>Difficulty:</strong> ${quiz.difficulty}</p>
                <p><strong>Date:</strong> ${date} at ${time}</p>
                <p><strong>Time:</strong> ${formatTime(quiz.timeTaken)}</p>
            </div>
            <div class="quiz-actions">
                <button class="reattempt-btn btn-primary" data-quiz-id="${quiz.id}">
                    Re-Attempt
                </button>
                <button class="analyze-btn btn-secondary" data-quiz-id="${quiz.id}">
                    Analyze
                </button>
            </div>
        </div>
    `;
}

function getSubjectIcon(subject) {
    const iconMap = {
        'Mathematics': 'fas fa-calculator',
        'Science': 'fas fa-flask',
        'History': 'fas fa-monument',
        'Geography': 'fas fa-globe-americas',
        'English': 'fas fa-book',
        'Computer Science': 'fas fa-laptop-code',
        'C Language': 'fas fa-c'
    };
    
    return iconMap[subject] || 'fas fa-question-circle';
}

// Quiz Setup Functions
function resetQuizSetup() {
    state.quizSetup = {
        currentStep: 1,
        selectedSubject: null,
        selectedTopic: null,
        selectedDifficulty: null
    };
    
    updateSetupSteps();
    updateSetupNavigation();
}

function updateSetupSteps() {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    document.querySelector(`.step[data-step="${state.quizSetup.currentStep}"]`).classList.add('active');
}

function updateSetupNavigation() {
    // Update previous button
    elements.prevStep.disabled = state.quizSetup.currentStep === 1;
    
    // Update next button based on current step and selection
    let nextDisabled = false;
    
    switch(state.quizSetup.currentStep) {
        case 1:
            nextDisabled = !state.quizSetup.selectedSubject;
            break;
        case 2:
            nextDisabled = !state.quizSetup.selectedTopic;
            break;
        case 3:
            nextDisabled = !state.quizSetup.selectedDifficulty;
            break;
    }
    
    elements.nextStep.disabled = nextDisabled;
    
    // Show/hide start quiz button
    if (state.quizSetup.currentStep === 3 && !nextDisabled) {
        elements.nextStep.style.display = 'none';
        elements.startQuiz.style.display = 'inline-flex';
    } else {
        elements.nextStep.style.display = 'inline-flex';
        elements.startQuiz.style.display = 'none';
    }
}

function renderSubjectSelection() {
    // Auto get subjects from questions.js
    const subjects = getAllSubjects();
    
    if (subjects.length === 0) {
        elements.subjectList.innerHTML = `
            <div class="no-subjects">
                <p>No subjects available. Please add questions to questions.js</p>
            </div>
        `;
        return;
    }
    
    elements.subjectList.innerHTML = subjects.map(subject => {
        const icon = getSubjectIcon(subject);
        const questionCount = questions.filter(q => q.subject === subject).length;
        
        return `
            <div class="option-card" data-subject="${subject}">
                <div class="option-icon">
                    <i class="${icon}"></i>
                </div>
                <h3>${subject}</h3>
                <p>${questionCount} questions available</p>
            </div>
        `;
    }).join('');
    
    // Add event listeners to subject cards
    document.querySelectorAll('#subjectList .option-card').forEach(card => {
        card.addEventListener('click', function() {
            const subject = this.getAttribute('data-subject');
            selectSubject(subject);
        });
    });
}

function selectSubject(subject) {
    state.quizSetup.selectedSubject = subject;
    state.quizSetup.selectedTopic = null; // Reset topic
    state.quizSetup.selectedDifficulty = null; // Reset difficulty
    
    // Update UI
    document.querySelectorAll('#subjectList .option-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`#subjectList .option-card[data-subject="${subject}"]`).classList.add('selected');
    
    // Enable next button
    updateSetupNavigation();
}

function renderTopicSelection() {
    // Auto get topics for selected subject
    const topics = getTopicsBySubject(state.quizSetup.selectedSubject);
    
    if (topics.length === 0) {
        elements.topicList.innerHTML = `
            <div class="no-topics">
                <p>No topics available for ${state.quizSetup.selectedSubject}</p>
            </div>
        `;
        return;
    }
    
    elements.topicList.innerHTML = topics.map(topic => {
        const questionCount = questions.filter(q => 
            q.subject === state.quizSetup.selectedSubject && 
            q.topic === topic
        ).length;
        
        return `
            <div class="option-card" data-topic="${topic}">
                <div class="option-icon">
                    <i class="fas fa-folder"></i>
                </div>
                <h3>${topic}</h3>
                <p>${questionCount} questions available</p>
            </div>
        `;
    }).join('');
    
    // Add event listeners to topic cards
    document.querySelectorAll('#topicList .option-card').forEach(card => {
        card.addEventListener('click', function() {
            const topic = this.getAttribute('data-topic');
            selectTopic(topic);
        });
    });
}

function selectTopic(topic) {
    state.quizSetup.selectedTopic = topic;
    state.quizSetup.selectedDifficulty = null; // Reset difficulty
    
    // Update UI
    document.querySelectorAll('#topicList .option-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`#topicList .option-card[data-topic="${topic}"]`).classList.add('selected');
    
    // Enable next button
    updateSetupNavigation();
}

function renderDifficultySelection() {
    // Auto get difficulties for selected subject and topic
    const difficulties = getDifficultiesBySubjectAndTopic(
        state.quizSetup.selectedSubject, 
        state.quizSetup.selectedTopic
    );
    
    if (difficulties.length === 0) {
        elements.difficultyList.innerHTML = `
            <div class="no-difficulties">
                <p>No difficulties available for ${state.quizSetup.selectedSubject} - ${state.quizSetup.selectedTopic}</p>
            </div>
        `;
        return;
    }
    
    elements.difficultyList.innerHTML = difficulties.map(difficulty => {
        const icon = getDifficultyIcon(difficulty);
        const questionCount = questions.filter(q => 
            q.subject === state.quizSetup.selectedSubject && 
            q.topic === state.quizSetup.selectedTopic &&
            q.difficulty === difficulty
        ).length;
        
        return `
            <div class="option-card" data-difficulty="${difficulty}">
                <div class="option-icon">
                    <i class="${icon}"></i>
                </div>
                <h3>${difficulty}</h3>
                <p>${questionCount} questions available</p>
            </div>
        `;
    }).join('');
    
    // Add event listeners to difficulty cards
    document.querySelectorAll('#difficultyList .option-card').forEach(card => {
        card.addEventListener('click', function() {
            const difficulty = this.getAttribute('data-difficulty');
            selectDifficulty(difficulty);
        });
    });
}

function selectDifficulty(difficulty) {
    state.quizSetup.selectedDifficulty = difficulty;
    
    // Update UI
    document.querySelectorAll('#difficultyList .option-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`#difficultyList .option-card[data-difficulty="${difficulty}"]`).classList.add('selected');
    
    updateSetupNavigation();
}

function getDifficultyIcon(difficulty) {
    const iconMap = {
        'Easy': 'fas fa-seedling',
        'Medium': 'fas fa-tree',
        'Hard': 'fas fa-mountain'
    };
    
    return iconMap[difficulty] || 'fas fa-question-circle';
}

function previousStep() {
    if (state.quizSetup.currentStep > 1) {
        state.quizSetup.currentStep--;
        updateSetupSteps();
        updateSetupNavigation();
        
        // Show the appropriate step content
        document.querySelectorAll('.setup-step').forEach(step => {
            step.classList.remove('active');
        });
        document.getElementById(`step${state.quizSetup.currentStep}`).classList.add('active');
    }
}

function nextStep() {
    console.log('Next step clicked. Current step:', state.quizSetup.currentStep);
    
    if (state.quizSetup.currentStep < 3) {
        state.quizSetup.currentStep++;
        console.log('Moving to step:', state.quizSetup.currentStep);
        
        updateSetupSteps();
        updateSetupNavigation();
        
        // Show the appropriate step content
        document.querySelectorAll('.setup-step').forEach(step => {
            step.classList.remove('active');
        });
        
        const nextStepElement = document.getElementById(`step${state.quizSetup.currentStep}`);
        console.log('Next step element:', nextStepElement);
        
        if (nextStepElement) {
            nextStepElement.classList.add('active');
        }
        
        // Render the next step content automatically
        if (state.quizSetup.currentStep === 2) {
            console.log('Rendering topic selection');
            renderTopicSelection();
        } else if (state.quizSetup.currentStep === 3) {
            console.log('Rendering difficulty selection');
            renderDifficultySelection();
        }
    } else {
        console.log('Already at last step');
    }
}

function startQuiz() {
    // Filter questions based on selections
    const filteredQuestions = getQuestionsByCriteria(
        state.quizSetup.selectedSubject,
        state.quizSetup.selectedTopic,
        state.quizSetup.selectedDifficulty
    );
    
    if (filteredQuestions.length === 0) {
        alert('No questions found for the selected criteria. Please try different options.');
        return;
    }
    
    // Initialize quiz state
    state.currentQuiz = {
        questions: filteredQuestions,
        currentQuestionIndex: 0,
        selectedAnswers: {},
        startTime: new Date(),
        timerInterval: null,
        timeTaken: 0
    };
    
    showQuizPage();
}

// Quiz Page Functions
function renderQuizQuestion() {
    const question = state.currentQuiz.questions[state.currentQuiz.currentQuestionIndex];
    const totalQuestions = state.currentQuiz.questions.length;
    const currentQuestionNumber = state.currentQuiz.currentQuestionIndex + 1;
    
    // Update progress
    const progress = (currentQuestionNumber / totalQuestions) * 100;
    elements.progressFill.style.width = `${progress}%`;
    elements.currentQuestionNumber.textContent = currentQuestionNumber;
    elements.totalQuestionsCount.textContent = totalQuestions;
    
    // Update quiz info
    elements.quizSubjectTopic.textContent = `${state.quizSetup.selectedSubject} - ${state.quizSetup.selectedTopic}`;
    elements.quizDifficulty.textContent = `Difficulty: ${state.quizSetup.selectedDifficulty}`;
    
    // Update question text
    elements.questionText.textContent = question.text;
    
    // Update code block if exists
    if (question.code) {
        elements.codeBlock.style.display = 'block';
        elements.questionCode.textContent = question.code;
    } else {
        elements.codeBlock.style.display = 'none';
    }
    
    // Render options
    elements.optionsList.innerHTML = question.options.map((option, index) => {
        const isSelected = state.currentQuiz.selectedAnswers[state.currentQuiz.currentQuestionIndex] === index;
        return `
            <div class="option ${isSelected ? 'selected' : ''}" data-option="${index}">
                <div class="option-marker">${String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option}</div>
            </div>
        `;
    }).join('');
    
    // Add event listeners to options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            const optionIndex = parseInt(this.getAttribute('data-option'));
            selectOption(optionIndex);
        });
    });
    
    // Update navigation buttons
    elements.prevQuestion.disabled = state.currentQuiz.currentQuestionIndex === 0;
    elements.nextQuestion.disabled = state.currentQuiz.currentQuestionIndex === totalQuestions - 1;
}

function selectOption(optionIndex) {
    state.currentQuiz.selectedAnswers[state.currentQuiz.currentQuestionIndex] = optionIndex;
    
    // Update UI
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`.option[data-option="${optionIndex}"]`).classList.add('selected');
}

function previousQuestion() {
    if (state.currentQuiz.currentQuestionIndex > 0) {
        state.currentQuiz.currentQuestionIndex--;
        renderQuizQuestion();
    }
}

function nextQuestion() {
    if (state.currentQuiz.currentQuestionIndex < state.currentQuiz.questions.length - 1) {
        state.currentQuiz.currentQuestionIndex++;
        renderQuizQuestion();
    }
}

function startTimer() {
    state.currentQuiz.startTime = new Date();
    
    state.currentQuiz.timerInterval = setInterval(() => {
        const now = new Date();
        state.currentQuiz.timeTaken = Math.floor((now - state.currentQuiz.startTime) / 1000);
        elements.timerDisplay.textContent = formatTime(state.currentQuiz.timeTaken);
    }, 1000);
}

function stopTimer() {
    if (state.currentQuiz.timerInterval) {
        clearInterval(state.currentQuiz.timerInterval);
        state.currentQuiz.timerInterval = null;
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function submitQuiz() {
    // Confirm with user before submitting
    const attempted = Object.keys(state.currentQuiz.selectedAnswers).length;
    const total = state.currentQuiz.questions.length;
    
    const confirmMessage = attempted === total ? 
        "Are you sure you want to submit the quiz?" :
        `You have attempted ${attempted} out of ${total} questions. Are you sure you want to submit?`;
    
    if (!confirm(confirmMessage)) {
        return; // User cancelled
    }
    
    stopTimer();
    
    // Calculate results - ALL questions considered, attempted or not
    const totalQuestions = state.currentQuiz.questions.length;
    let correctCount = 0;
    let attemptedCount = 0;
    
    state.currentQuiz.questions.forEach((question, index) => {
        const selectedAnswer = state.currentQuiz.selectedAnswers[index];
        
        if (selectedAnswer !== undefined) {
            attemptedCount++;
            if (selectedAnswer === question.correct) {
                correctCount++;
            }
        }
    });
    
    // Calculate unanswered questions
    const unansweredCount = totalQuestions - attemptedCount;
    
    // Save quiz to history
    const quizResult = {
        id: Date.now().toString(),
        subject: state.quizSetup.selectedSubject,
        topic: state.quizSetup.selectedTopic,
        difficulty: state.quizSetup.selectedDifficulty,
        questions: state.currentQuiz.questions,
        selectedAnswers: state.currentQuiz.selectedAnswers,
        correctCount: correctCount,
        attemptedCount: attemptedCount,
        totalQuestions: totalQuestions,
        date: new Date().toISOString(),
        timeTaken: state.currentQuiz.timeTaken
    };
    
    state.quizHistory.unshift(quizResult);
    saveUserData();
    
    showResultsPage();
}

// Results Page Functions
function renderResults() {
    const quizResult = state.quizHistory[0];
    const totalQuestions = quizResult.questions.length;
    const correctCount = quizResult.correctCount;
    const incorrectCount = totalQuestions - correctCount - getUnansweredCount(quizResult);
    const unansweredCount = getUnansweredCount(quizResult);
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    
    // Update performance display
    updatePerformanceDisplay(scorePercentage);
    
    // Update stats
    elements.correctAnswers.textContent = correctCount;
    elements.incorrectAnswers.textContent = incorrectCount;
    elements.unansweredQuestions.textContent = unansweredCount;
    elements.scorePercentage.textContent = `${scorePercentage}%`;
    
    // Update details
    elements.timeTaken.textContent = formatTime(quizResult.timeTaken);
    elements.resultSubject.textContent = quizResult.subject;
    elements.resultTopic.textContent = quizResult.topic;
    elements.resultDifficulty.textContent = quizResult.difficulty;
}

function getUnansweredCount(quizResult) {
    return quizResult.questions.length - Object.keys(quizResult.selectedAnswers).length;
}

function updatePerformanceDisplay(scorePercentage) {
    let performanceIcon, performanceText, performanceSubtext;
    
    if (scorePercentage >= 80) {
        performanceIcon = 'fas fa-grin-stars';
        performanceText = 'Excellent!';
        performanceSubtext = 'Outstanding performance!';
    } else if (scorePercentage >= 60) {
        performanceIcon = 'fas fa-smile';
        performanceText = 'Good Job!';
        performanceSubtext = 'Solid performance, keep it up!';
    } else if (scorePercentage >= 40) {
        performanceIcon = 'fas fa-meh';
        performanceText = 'Not Bad';
        performanceSubtext = 'You can do better with more practice.';
    } else {
        performanceIcon = 'fas fa-frown';
        performanceText = 'Needs Improvement';
        performanceSubtext = 'Keep practicing to improve your score.';
    }
    
    elements.performanceIcon.innerHTML = `<i class="${performanceIcon}"></i>`;
    elements.performanceText.textContent = performanceText;
    elements.performanceSubtext.textContent = performanceSubtext;
}

// Analysis Page Functions
function renderAnalysisQuestion() {
    const quizResult = state.quizHistory[0];
    const questionIndex = state.currentQuiz.currentQuestionIndex;
    const question = quizResult.questions[questionIndex];
    const totalQuestions = quizResult.questions.length;
    const currentQuestionNumber = questionIndex + 1;
    
    // Update counter
    elements.analysisCurrentQuestion.textContent = currentQuestionNumber;
    elements.analysisTotalQuestions.textContent = totalQuestions;
    
    // Update question text
    elements.analysisQuestionText.textContent = question.text;
    
    // Update code block if exists
    if (question.code) {
        elements.analysisCodeBlock.style.display = 'block';
        elements.analysisQuestionCode.textContent = question.code;
    } else {
        elements.analysisCodeBlock.style.display = 'none';
    }
    
    // Render options with status
    elements.analysisOptionsList.innerHTML = question.options.map((option, index) => {
        const selectedAnswer = quizResult.selectedAnswers[questionIndex];
        const isSelected = selectedAnswer === index;
        const isCorrect = index === question.correct;
        
        let optionClass = '';
        let statusIcon = '';
        
        if (isCorrect) {
            optionClass = 'correct';
            statusIcon = '<i class="fas fa-check option-status"></i>';
        } else if (isSelected && !isCorrect) {
            optionClass = 'incorrect';
            statusIcon = '<i class="fas fa-times option-status"></i>';
        }
        
        return `
            <div class="option ${optionClass}" data-option="${index}">
                <div class="option-marker">${String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option}</div>
                ${statusIcon}
            </div>
        `;
    }).join('');
    
    // Show explanation if available
    if (question.explanation) {
        elements.analysisExplanation.style.display = 'block';
        elements.explanationText.textContent = question.explanation;
    } else {
        elements.analysisExplanation.style.display = 'none';
    }
    
    // Update navigation buttons
    elements.prevAnalysisQuestion.disabled = questionIndex === 0;
    elements.nextAnalysisQuestion.disabled = questionIndex === totalQuestions - 1;
}

function previousAnalysisQuestion() {
    if (state.currentQuiz.currentQuestionIndex > 0) {
        state.currentQuiz.currentQuestionIndex--;
        renderAnalysisQuestion();
    }
}

function nextAnalysisQuestion() {
    if (state.currentQuiz.currentQuestionIndex < state.quizHistory[0].questions.length - 1) {
        state.currentQuiz.currentQuestionIndex++;
        renderAnalysisQuestion();
    }
}

function reattemptQuiz(quizId) {
    const quiz = state.quizHistory.find(q => q.id === quizId);
    if (!quiz) return;
    
    // Set up quiz with the same questions
    state.quizSetup.selectedSubject = quiz.subject;
    state.quizSetup.selectedTopic = quiz.topic;
    state.quizSetup.selectedDifficulty = quiz.difficulty;
    
    // Start the quiz
    state.currentQuiz = {
        questions: quiz.questions,
        currentQuestionIndex: 0,
        selectedAnswers: {},
        startTime: null,
        timerInterval: null,
        timeTaken: 0
    };
    
    showQuizPage();
}

function analyzeQuiz(quizId) {
    const quizIndex = state.quizHistory.findIndex(q => q.id === quizId);
    if (quizIndex === -1) return;
    
    // Set current quiz to the selected one
    const quiz = state.quizHistory[quizIndex];
    state.currentQuiz = {
        questions: quiz.questions,
        currentQuestionIndex: 0,
        selectedAnswers: quiz.selectedAnswers,
        startTime: null,
        timerInterval: null,
        timeTaken: 0
    };
    
    showAnalysisPage();
}

// User Name Functions
function showUserNameModal() {
    elements.userNameInput.value = state.userName;
    elements.userNameModal.classList.add('active');
}

function saveUserName() {
    const newName = elements.userNameInput.value.trim();
    if (newName) {
        state.userName = newName;
        elements.displayUserName.textContent = newName;
        elements.userName.textContent = newName;
        saveUserData();
        elements.userNameModal.classList.remove('active');
    }
}

// Dark Mode Functions
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('quizTheme', newTheme);
    updateDarkModeIcon(newTheme);
}

function updateDarkModeIcon(theme) {
    const icon = elements.darkModeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Footer functionality
function setupFooterEventListeners() {
    // Footer links ke liye event listeners
    document.querySelectorAll('.footer-link[data-subject]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const subject = this.getAttribute('data-subject');
            startQuizFromFooter(subject);
        });
    });
}

function startQuizFromFooter(subject) {
    showQuizSetup();
    
    // Auto-select the subject from footer
    setTimeout(() => {
        const subjectCard = document.querySelector(`.option-card[data-subject="${subject}"]`);
        if (subjectCard) {
            subjectCard.click();
        }
    }, 100);
}

// Initialize footer events
function init() {
    loadUserData();
    setupEventListeners();
    setupFooterEventListeners(); // ✅ Yeh line add karen
    renderHomePage();
}