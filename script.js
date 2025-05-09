// Preguntas del cuestionario
const questions = [
    {
        id: 1,
        text: "Si usted señala algo al otro lado de la habitación, ¿su hijo/a lo mira?",
        example: "POR EJEMPLO, Si usted señala a un juguete, un peluche o un animal, ¿su hijo/a lo mira?"
    },
    {
        id: 2,
        text: "¿Alguna vez se ha preguntado si su hijo/a es sordo/a?"
    },
    {
        id: 3,
        text: "¿Su hijo/a juega juegos de fantasía o imaginación?",
        example: "POR EJEMPLO, 'hace como que' bebe de una taza vacía, habla por teléfono o da de comer a una muñeca o peluche,…"
    },
    {
        id: 4,
        text: "¿A su hijo le gusta subirse a cosas?",
        example: "POR EJEMPLO, a una silla, escaleras, o tobogán,…"
    },
    {
        id: 5,
        text: "¿Hace su hijo/a movimientos inusuales con sus dedos cerca de sus ojos?",
        example: "POR EJEMPLO, mueve sus dedos cerca de sus ojos de manera inusual?"
    },
    {
        id: 6,
        text: "¿Su hijo/a señala con un dedo cuando quiere pedir algo o pedir ayuda?",
        example: "POR EJEMPLO, señala un juguete o algo de comer que está fuera de su alcance?"
    },
    {
        id: 7,
        text: "¿Su hijo/a señala con un dedo cuando quiere mostrarle algo que le llama la atención?",
        example: "POR EJEMPLO, señala un avión en el cielo o un camión muy grande en la calle"
    },
    {
        id: 8,
        text: "¿Su hijo/a se interesa en otros niños?",
        example: "POR EJEMPLO, mira con atención a otros niños, les sonríe o se les acerca?"
    },
    {
        id: 9,
        text: "¿Su hijo/a le muestra cosas acercándolas o levantándolas para que usted las vea - no para pedir ayuda sino solamente para compartirlas con usted?",
        example: "POR EJEMPLO, le muestra una flor o un peluche o un coche de juguete"
    },
    {
        id: 10,
        text: "¿Su hijo/a responde cuando usted le llama por su nombre?",
        example: "POR EJEMPLO, se vuelve, habla o balbucea, o deja de hacer lo que estaba haciendo para mirarle?"
    },
    {
        id: 11,
        text: "¿Cuándo usted sonríe a su hijo/a, él o ella también le sonríe?"
    },
    {
        id: 12,
        text: "¿Le molestan a su hijo/a ruidos cotidianos?",
        example: "POR EJEMPLO, la aspiradora o la música, incluso cuando está no está excesivamente alta?"
    },
    {
        id: 13,
        text: "¿Su hijo/a camina solo?"
    },
    {
        id: 14,
        text: "¿Su hijo/a le mira a los ojos cuando usted le habla, juega con él o ella, o lo viste?"
    },
    {
        id: 15,
        text: "¿Su hijo/a imita sus movimientos?",
        example: "POR EJEMPLO, decir adiós con la mano, aplaudir o algún ruido gracioso que usted haga?"
    },
    {
        id: 16,
        text: "Si usted se gira a ver algo, ¿su hijo/a trata de mirar hacia lo que usted está mirando?"
    },
    {
        id: 17,
        text: "¿Su hijo/a intenta que usted le mire/preste atención?",
        example: "POR EJEMPLO, busca que usted le haga un cumplido, o le dice 'mira' ó 'mírame'"
    },
    {
        id: 18,
        text: "¿Su hijo/a le entiende cuando usted le dice que haga algo?",
        example: "POR EJEMPLO, si usted no hace gestos, ¿su hijo/a entiende 'pon el libro encima de la silla' o 'tráeme la manta'?"
    },
    {
        id: 19,
        text: "Si algo nuevo pasa, ¿su hijo/a le mira para ver como usted reacciona al respecto?",
        example: "POR EJEMPLO, si oye un ruido extraño o ve un juguete nuevo, ¿se gira a ver su cara?"
    },
    {
        id: 20,
        text: "Le gustan a su hijo/a los juegos de movimiento?",
        example: "POR EJEMPLO, le gusta que le balancee, o que le haga 'el caballito' sentándole en sus rodillas"
    }
];

// Almacenamiento de resultados
let allResults = JSON.parse(localStorage.getItem('childQuestionnaireResults')) || [];

// Generar las preguntas en el formulario
function renderQuestions() {
    const container = document.querySelector('.questions-container');
    
    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        questionDiv.dataset.questionId = question.id;
        
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = `${question.id}. ${question.text}`;
        
        questionDiv.appendChild(questionText);
        
        if (question.example) {
            const exampleText = document.createElement('div');
            exampleText.className = 'example-text';
            exampleText.textContent = question.example;
            questionDiv.appendChild(exampleText);
        }
        
        const answerOptions = document.createElement('div');
        answerOptions.className = 'answer-options';
        
        const yesOption = document.createElement('div');
        yesOption.className = 'answer-option';
        yesOption.innerHTML = `
            <input type="radio" id="q${question.id}_yes" name="q${question.id}" value="SÍ" required>
            <label for="q${question.id}_yes">SÍ</label>
        `;
        
        const noOption = document.createElement('div');
        noOption.className = 'answer-option';
        noOption.innerHTML = `
            <input type="radio" id="q${question.id}_no" name="q${question.id}" value="NO">
            <label for="q${question.id}_no">NO</label>
        `;
        
        answerOptions.appendChild(yesOption);
        answerOptions.appendChild(noOption);
        questionDiv.appendChild(answerOptions);
        
        container.appendChild(questionDiv);
    });
}

// Mostrar el formulario
function showForm() {
    document.getElementById('questionnaireForm').classList.remove('hidden');
    document.getElementById('resultsSection').classList.add('hidden');
}

// Mostrar resultados
function showResults(results) {
    document.getElementById('questionnaireForm').classList.add('hidden');
    document.getElementById('resultsSection').classList.remove('hidden');
    
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    
    // Mostrar el último resultado primero
    const reversedResults = [...allResults].reverse();
    
    reversedResults.forEach((result, index) => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        
        const resultTitle = document.createElement('h3');
        resultTitle.textContent = `${result.childName} - ${result.date} (${result.childAge} meses)`;
        resultCard.appendChild(resultTitle);
        
        const resultDetails = document.createElement('div');
        resultDetails.className = 'result-details';
        
        const parentDetail = document.createElement('div');
        parentDetail.className = 'result-detail';
        parentDetail.innerHTML = `<strong>Padre/Tutor:</strong> ${result.parentName}`;
        resultDetails.appendChild(parentDetail);
        
        const totalYes = document.createElement('div');
        totalYes.className = 'result-detail';
        const yesCount = Object.values(result.answers).filter(a => a === 'SÍ').length;
        totalYes.innerHTML = `<strong>Respuestas SÍ:</strong> ${yesCount}/20`;
        resultDetails.appendChild(totalYes);
        
        const totalNo = document.createElement('div');
        totalNo.className = 'result-detail';
        const noCount = Object.values(result.answers).filter(a => a === 'NO').length;
        totalNo.innerHTML = `<strong>Respuestas NO:</strong> ${noCount}/20`;
        resultDetails.appendChild(totalNo);
        
        resultCard.appendChild(resultDetails);
        
        const viewDetailsBtn = document.createElement('button');
        viewDetailsBtn.className = 'btn view-details-btn';
        viewDetailsBtn.innerHTML = '<i class="fas fa-eye"></i> Ver Detalles';
        viewDetailsBtn.onclick = () => toggleDetails(result.id);
        resultCard.appendChild(viewDetailsBtn);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Eliminar';
        deleteBtn.onclick = () => deleteResult(result.id);
        resultCard.appendChild(deleteBtn);
        
        // Detalles expandibles
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'question-details hidden';
        detailsDiv.id = `details-${result.id}`;
        
        questions.forEach(q => {
            const detailItem = document.createElement('div');
            detailItem.className = 'detail-item';
            detailItem.innerHTML = `
                <strong>${q.id}. ${q.text}</strong>: ${result.answers[q.id]}
            `;
            detailsDiv.appendChild(detailItem);
        });
        
        resultCard.appendChild(detailsDiv);
        resultsList.appendChild(resultCard);
    });
}

// Alternar visibilidad de detalles
function toggleDetails(resultId) {
    const detailsDiv = document.getElementById(`details-${resultId}`);
    detailsDiv.classList.toggle('hidden');
}

// Eliminar un resultado
function deleteResult(resultId) {
    if (confirm('¿Está seguro que desea eliminar este registro?')) {
        allResults = allResults.filter(result => result.id !== resultId);
        localStorage.setItem('childQuestionnaireResults', JSON.stringify(allResults));
        showResults();
    }
}

// Exportar a CSV
function exportToCSV() {
    if (allResults.length === 0) {
        alert('No hay datos para exportar');
        return;
    }
    
    // Encabezados
    let csv = 'Nombre Niño,Edad (meses),Nombre Tutor,Fecha';
    questions.forEach(q => {
        csv += `,"${q.id}. ${q.text}"`;
    });
    csv += '\n';
    
    // Datos
    allResults.forEach(result => {
        csv += `"${result.childName}",${result.childAge},"${result.parentName}","${result.date}"`;
        questions.forEach(q => {
            csv += `,"${result.answers[q.id]}"`;
        });
        csv += '\n';
    });
    
    // Crear y descargar archivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `cuestionario_infantil_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Manejar el envío del formulario
document.getElementById('questionnaireForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos básicos
    const childName = document.getElementById('childName').value;
    const childAge = document.getElementById('childAge').value;
    const parentName = document.getElementById('parentName').value;
    const date = document.getElementById('date').value;
    
    // Obtener respuestas
    const answers = {};
    questions.forEach(question => {
        const selectedOption = document.querySelector(`input[name="q${question.id}"]:checked`);
        answers[question.id] = selectedOption ? selectedOption.value : 'NO RESPONDIDO';
    });
    
    // Crear objeto de resultado
    const result = {
        id: Date.now(), // ID único basado en timestamp
        childName,
        childAge,
        parentName,
        date,
        answers,
        timestamp: new Date().toISOString()
    };
    
    // Guardar en el almacenamiento local
    allResults.push(result);
    localStorage.setItem('childQuestionnaireResults', JSON.stringify(allResults));
    
    // Mostrar resultados
    showResults();
    
    // Opcional: limpiar formulario
    this.reset();
});

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Establecer fecha actual por defecto
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
    
    // Renderizar preguntas
    renderQuestions();
    
    // Si hay resultados guardados, mostrarlos
    if (allResults.length > 0) {
        showResults();
    }
});