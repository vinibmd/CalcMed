const doseAlvoMap = {
    'Noradrenalina': '0,1 a 0,5 mcg/kg/min',
    'Dobutamina': '2,5 a 20 mcg/kg/min',
    'Adrenalina': '0,1 a 0,5 mcg/kg/min',
    'Dopamina': '2,5 a 10 mcg/kg/min',
    'Nitroprussiato': '0,5 a 10 mcg/kg/min',
    'Milrinona': '0,375 a 0,75 mcg/kg/min',
    'Nitroglicerina': '5 a 200 mcg/min',
    'Esmolol': '50 a 200 mcg/kg/min'
};

function calculateDose() {
    // Obter os valores de entrada
    const medicationDose = parseFloat(document.getElementById('medicationDose').value);
    const patientWeight = parseFloat(document.getElementById('patientWeight').value);
    const diluentVolume = parseFloat(document.getElementById('diluentVolume').value);
    const infusionRate = parseFloat(document.getElementById('infusionRate').value);
    const medicationSelect = document.getElementById('medicationSelect').value;
    
    // Verificar se os valores são válidos
    if (isNaN(medicationDose) || isNaN(patientWeight) || isNaN(diluentVolume) || isNaN(infusionRate) || medicationDose <= 0 || patientWeight <= 0 || diluentVolume <= 0 || infusionRate <= 0) {
        displayError('Por favor, insira valores válidos e diferentes de zero.');
        return;
    }
    
    // Converter a dose da medicação para microgramas
    const medicationDoseMcg = medicationDose * 1000;
    
    // Calcular a concentração em mcg/mL
    const concentration = medicationDoseMcg / diluentVolume;
    
    // Calcular a dose infundida em mcg/kg/min
    const doseInfundida = (concentration * infusionRate) / patientWeight / 60;
    
    // Exibir o resultado e a dose alvo
    const doseAlvo = doseAlvoMap[medicationSelect];
    displayResult(`Dose infundida: ${doseInfundida.toFixed(2)} mcg/kg/min<br>Dose Alvo: ${doseAlvo}`);
}

function displayError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.style.color = 'red';
}

function displayResult(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.style.color = 'black';
}

function resetResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
}
