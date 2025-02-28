function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTest() {
    document.getElementById('startContainer').style.display = 'none';
    const testContainer = document.getElementById('testContainer');
    testContainer.innerHTML = '';
    questions.forEach((q, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<h3>${q.question}</h3>`;
        shuffleArray(q.answers);
        q.answers.forEach(answer => {
            questionDiv.innerHTML += `<label><input type="checkbox" name="question${qIndex}" value="${answer}"> ${answer}</label><br>`;
        });
        questionDiv.innerHTML += `<div class="feedback" id="feedback${qIndex}"></div>`;
        testContainer.appendChild(questionDiv);
    });
    testContainer.style.display = 'block';

    document.querySelector('.check-btn').style.display = 'inline-block';
    document.querySelector('.reset-btn').style.display = 'inline-block';
}

function checkAnswers() {
    const results = [];
    questions.forEach((q, qIndex) => {
        const selected = [];
        const inputs = document.querySelectorAll(`input[name="question${qIndex}"]`);
        inputs.forEach(input => {
            if (input.checked) {
                selected.push(input.value);
            }
            input.parentElement.classList.remove('correct', 'incorrect');
        });

        let isCorrect = selected.sort().toString() === q.correct.sort().toString();
        if (!isCorrect) {
            results.push(`Вопрос: ${q.question}<br>Выбрано: ${selected.join(', ')}<br>Правильно: ${q.correct.join(', ')}`);
        }

        const feedbackDiv = document.getElementById(`feedback${qIndex}`);
        feedbackDiv.innerHTML = isCorrect 
            ? `<span class="correct-answer">Ваш ответ правильный!</span>` 
            : `<span class="incorrect-answer">Правильный ответ: ${q.correct.join(', ')}</span>`;
    });

    const resultList = document.getElementById('resultList');
    resultList.innerHTML = results.map(r => `<li>${r}</li>`).join('');
    document.getElementById('results').style.display = 'block';
}

function resetTest() {
    document.getElementById('results').style.display = 'none';
    document.getElementById('startContainer').style.display = 'block';
    document.getElementById('testContainer').style.display = 'none';
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.parentElement.classList.remove('correct', 'incorrect');
    });
    const feedbacks = document.querySelectorAll('.feedback');
    feedbacks.forEach(feedback => feedback.innerHTML = '');

    document.querySelector('.check-btn').style.display = 'none';
    document.querySelector('.reset-btn').style.display = 'none';
}