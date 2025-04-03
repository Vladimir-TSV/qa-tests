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

        // Определяем тип input: radio для одного ответа, checkbox для нескольких
        const inputType = q.correct.length === 1 ? 'radio' : 'checkbox';

        q.answers.forEach(answer => {
            questionDiv.innerHTML += `
                <label>
                    <input type="${inputType}" name="question${qIndex}" value="${answer}">
                    ${answer}
                </label><br>`;
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

        // Проверка правильности ответа
        let isCorrect;
        if (q.correct.length === 1) {
            // Для одного правильного ответа
            isCorrect = selected.length === 1 && selected[0] === q.correct[0];
        } else {
            // Для нескольких правильных ответов
            isCorrect = selected.sort().toString() === q.correct.sort().toString();
        }

        if (!isCorrect) {
            results.push(`Вопрос: ${q.question}<br>Выбрано: ${selected.join(', ')}<br>Правильно: ${q.correct.join(', ')}`);
        }

        const feedbackDiv = document.getElementById(`feedback${qIndex}`);
        const commentHtml = q.comment ? `<br><span class="comment">Комментарий: ${q.comment}</span>` : '';
        
        feedbackDiv.innerHTML = isCorrect 
            ? `<span class="correct-answer">Ваш ответ правильный!</span>${commentHtml}` 
            : `<span class="incorrect-answer">Правильный ответ: ${q.correct.join(', ')}</span>${commentHtml}`;
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

// Блок добавления иконки
function addFaviconsAndMeta() {
    const head = document.head;

    // Apple Touch Icons
    const appleIcons = [
        { sizes: "57x57", href: "../ico/apple-icon-57x57.png" },
        { sizes: "60x60", href: "../ico/apple-icon-60x60.png" },
        { sizes: "72x72", href: "../ico/apple-icon-72x72.png" },
        { sizes: "76x76", href: "../ico/apple-icon-76x76.png" },
        { sizes: "114x114", href: "../ico/apple-icon-114x114.png" },
        { sizes: "120x120", href: "../ico/apple-icon-120x120.png" },
        { sizes: "144x144", href: "../ico/apple-icon-144x144.png" },
        { sizes: "152x152", href: "../ico/apple-icon-152x152.png" },
        { sizes: "180x180", href: "../ico/apple-icon-180x180.png" },
    ];

    appleIcons.forEach(icon => {
        const link = document.createElement('link');
        link.rel = 'apple-touch-icon';
        link.sizes = icon.sizes;
        link.href = icon.href;
        head.appendChild(link);
    });

    // Favicons
    const favicons = [
        { type: "image/png", sizes: "192x192", href: "../ico/android-icon-192x192.png" },
        { type: "image/png", sizes: "32x32", href: "../ico/favicon-32x32.png" },
        { type: "image/png", sizes: "96x96", href: "../ico/favicon-96x96.png" },
        { type: "image/png", sizes: "16x16", href: "../ico/favicon-16x16.png" },
    ];

    favicons.forEach(favicon => {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = favicon.type;
        link.sizes = favicon.sizes;
        link.href = favicon.href;
        head.appendChild(link);
    });

    // Manifest
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = 'ico/manifest.json';
    head.appendChild(manifestLink);

    // MSApplication Meta Tags
    const msTileColor = document.createElement('meta');
    msTileColor.name = 'msapplication-TileColor';
    msTileColor.content = '#ffffff';
    head.appendChild(msTileColor);

    const msTileImage = document.createElement('meta');
    msTileImage.name = 'msapplication-TileImage';
    msTileImage.content = '/ms-icon-144x144.png';
    head.appendChild(msTileImage);

    // Theme Color
    const themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    themeColor.content = '#ffffff';
    head.appendChild(themeColor);
}

// Вызов функции для добавления элементов
addFaviconsAndMeta();