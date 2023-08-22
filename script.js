document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById('all');
    const question = document.getElementById('question');
    const answers = document.getElementById('answers');
    const next = document.getElementById('next');
    const category = document.getElementById('category');
    const php = document.getElementById('php');
    const js = document.getElementById('js');
    const java = document.getElementById('java');
    const feedback = document.getElementById('feedback');
    const performance = document.getElementById('per');
    const phrase = document.getElementById('phrase');
    const showScore = document.getElementById('score');
    const QA = document.getElementById('QA');
    const sc = document.getElementById('sc');
    const chose = document.getElementById("chose");
    var score = 0;

    fetch("questions.json").then(response => response.json())
        .then(jsonData => {

            var currentQi = 0;

            function showQuestion(QI) {
                let currentQ = jsonData.questions[QI];
                let questionNo = currentQi + 1;
                question.innerHTML = questionNo + "- " + currentQ.question;

                // Clear existing answer buttons
                answers.innerHTML = "";

                currentQ.answers.forEach((answer, index) => {
                    const button = document.createElement('li');
                    button.textContent = answer;
                    button.classList.add('btn');
                    button.addEventListener('click', () => selectAnswer(index));
                    answers.appendChild(button);
                });
            }

            function selectAnswer(selected) {
                const selectedAnswer = jsonData.questions[currentQi].answers[selected];
                const correctAnswer = jsonData.questions[currentQi].correctAnswer;
                if (selectedAnswer === correctAnswer) {
                    score++;
                    answers.childNodes[selected].style.backgroundColor = "rgb(0, 255, 0)";
                } else {
                    answers.childNodes[selected].style.backgroundColor = "red";
                   
                }

                // Remove event listeners and disable answer buttons
                answers.childNodes.forEach(answer => {
                    answer.removeEventListener('click', () => selectAnswer(selectedIndex));
                    answer.style.pointerEvents = 'none';
                });
                index();
                currentQi++;

            }

            function index() { // the conditions here are to determine the questions indexes where there are 5 questions of every category 0->4,5->9,10->14
                if (currentQi >= 0 && currentQi < 5) {
                    setTimeout(() => {// the time here (1s) is just for the user to know if his/her answer is true or no
                        showQuestion(currentQi);
                    }, 1000);

                } if (currentQi == 4) { scoreNote(score) }// and here to see if the questions of the category chosen are over or no if over the score function appears

                if (currentQi >= 5 && currentQi < 10) {
                    setTimeout(() => {
                        showQuestion(currentQi);
                    }, 1000);

                } if (currentQi == 9) { scoreNote(score) }
                if (currentQi >= 10 && currentQi < 15) {
                    setTimeout(() => {
                        showQuestion(currentQi);
                    }, 1000);

                } if (currentQi == 14) { scoreNote(score) }
            }

            // function for the score
            function scoreNote(x) {

                question.style.display = 'none';
                answers.style.display = 'none';
                feedback.style.display = "block";
                sc.style.display = 'block'
                next.style.display = 'block';
                showScore.innerText = x;
                if (x > 3) {
                    performance.innerText = "GOOD"
                    performance.style.cssText = "color:green;font-weight:bold"
                    phrase.innerText = "Great job! You did really well!"
                }
                if (x == 3) {
                    performance.innerText = 'OKAY'
                    performance.style.cssText = "color:black;font-weight:bold"
                    phrase.innerText = "Keep practicing to improve."
                }
                if (x < 3) {
                    performance.innerText = "BAD"
                    performance.style.cssText = "color:red;font-weight:bold"
                    phrase.innerText = "But don't worry, you'll get better with more practice"
                }
            }


            // Call the initial question
            showQuestion(currentQi);

            function afterChose(a) {
                chose.style.display = 'none'
                category.style.display = "none"
                QA.style.display = 'block'
                showQuestion(a);
                currentQi = a;
                index();
            }

            js.addEventListener('click', () => {
                afterChose(0)
            });

            php.addEventListener('click', () => {
                afterChose(5)
            });

            java.addEventListener('click', () => {
                afterChose(10)
            });
            next.addEventListener("click", () => {
                location.reload();//to reload the page after clicking next
            })

        });
});
