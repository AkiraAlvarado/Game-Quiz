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

  console.log(uncheckedRadios.length)
  // Guardar las respuestas del usuario en el array
  questions.forEach(question => {
    userAnswers.push(question.value);
  });

  uncheckedRadios.forEach(uncheck => {
    uncheck.parentNode.style.background = "#ffffff";
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

document.getElementById('quiz-form-1').addEventListener('submit', submitQuiz);

// A cada preguntar darle un puntaje digamos 4, 5 , 6 y asiganrle ese puntaje cuando le de corretto


const buttons = document.querySelectorAll(".btn")
const section = document.querySelectorAll(".section")
buttons.forEach(boton => {
  boton.addEventListener("click", () => {
    const atributo = boton.getAttribute("page")

    section.forEach(pages => pages.classList.remove("active")) // Remueve a cualquier pagina que estaba activa antes, su clase active , para que pase a none
    document.getElementById(`quiz-form-${atributo}`).classList.add("active")
  })
  section[0].classList.add('active'); //Se da por defecto la clase Active a la primera seccion
})


// -------------------------------------------------------------



fetch('datos.json')
  .then(response => response.json())
  .then(data => {
    crearCuestionario(data)
  })


const crearCuestionario = questionObj => {
  const formulario = document.getElementById("quiz-form-2")
  const questions = questionObj["preguntas"]

  for (let i = 0; i < questionObj["preguntas"].length; i++) {
    const H3 = document.createElement("H3")
    const p = document.createElement("p")
    const section = document.createElement("section")
    const div = document.createElement("div")

    div.classList.add("main-quiz__question")
    section.classList.add("main-quiz")

    H3.textContent = questions[i].titulo
    p.textContent = questions[i].puntos

    div.appendChild(H3)
    div.appendChild(p)

    section.appendChild(div)
    formulario.appendChild(section)
    for (let j = 0; j < questions[i]["opciones"].length; j++) {
      const opciones = questions[i]["opciones"]
      const label = document.createElement("label")
      const span = document.createElement("span")
      const input = document.createElement("input")

      span.textContent = opciones[j].name
      input.type = "radio";
      input.value = opciones[j].value;
      input.setAttribute('puntos', opciones[j].puntos)
      input.name = opciones[j].nombre

      label.appendChild(input)
      label.appendChild(span)

      input.required = true;
      section.appendChild(label)
    }

  }

  const enviar = document.createElement("input")
  enviar.value = "Enviar"
  enviar.id = "submit2"
  enviar.type = "submit"
  formulario.appendChild(enviar)

}

document.getElementById('quiz-form-2').addEventListener('submit', submitQuiz);
