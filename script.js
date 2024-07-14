// function submitQuiz(event) {
//   event.preventDefault(); // Prevenir el envío del formulario

//   // Definir las respuestas correctas
//   const correctAnswers = {
//     q1: '2',  // Lima
//     q2: '2'   // Estocolmo
//   };

//   let score = 0;
//   let totalQuestions = 0;

//   Object.keys(correctAnswers).forEach(question => {
//     totalQuestions++;
//     const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
//     if (userAnswer && userAnswer.value === correctAnswers[question]) {
//       score++;
//     }
//   });

//   // Mostrar el resultado
//   const resultsDiv = document.getElementById('results');
//   resultsDiv.innerHTML = `Obtuviste ${score} de ${totalQuestions} respuestas correctas.`;
// }

// document.getElementById('quizForm').addEventListener('submit', submitQuiz);


function submitQuiz(event) {
  event.preventDefault(); // Prevenir el envío del formulario
  let puntaje = 0

  // Definir las respuestas correctas en un array
  const correctAnswers = ['2', '2', '2', '2']; // Respuestas correctas para q1 y q2

  // Inicializar array para guardar respuestas del usuario
  const userAnswers = [];

  // Obtener todas las preguntas (inputs de tipo radio)
  const questions = document.querySelectorAll('input[type="radio"]:checked');

  // Guardar las respuestas del usuario en el array
  questions.forEach(question => {
    userAnswers.push(question.value);
  });

  // Calcular el puntaje
  let score = 0;
  const totalQuestions = correctAnswers.length;

  for (let i = 0; i < totalQuestions; i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      score++;
      questions[i].parentNode.style.background = "#E8FFE1"
      let puntosActuales = parseInt(questions[i].getAttribute("puntos"), 10); // Obtener el valor actual del atributo y convertirlo a un número
      puntaje += puntosActuales
    } else {
      questions[i].parentNode.style.background = "#FFD1D1"

    }
  }

  // Mostrar el resultado
  const resultsDiv = document.querySelector('.main-points')
  resultsDiv.innerHTML = `<div class="main-results" id="results">
         <div class="main-results__puntaje">
         <div>Respuestas Correctas</div>
         <div>Respuestas Incorrectas</div>
         <div>Puntaje</div>
         </div>
         <div class="main-results__puntaje">
            <div>${score}</div>
            <div>${correctAnswers.length - score}</div>
            <div>${puntaje}</div>
         </div>
      </div>`

}

document.getElementById('quiz-form').addEventListener('submit', submitQuiz);

// A cada preguntar darle un puntaje digamos 4, 5 , 6 y asiganrle ese puntaje cuando le de corretto