const Alexa = require('ask-sdk-core');

const questions = [
    {
        question: '¿Cuál es la capital de Francia?',
        options: ['Berlín', 'Madrid', 'París', 'Lisboa'],
        correctAnswer: 'París'
    },
    {
        question: '¿Qué es 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4'
    }
    // Añade más preguntas según sea necesario
];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenido al examen. ¿Estás listo para comenzar?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const StartQuizIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartQuizIntent';
    },
    handle(handlerInput) {
        const questionIndex = 0;
        const currentQuestion = questions[questionIndex];
        
        const speakOutput = `Primera pregunta: ${currentQuestion.question} ` +
                            `Las opciones son: 1. ${currentQuestion.options[0]}, ` +
                            `2. ${currentQuestion.options[1]}, 3. ${currentQuestion.options[2]}, ` +
                            `4. ${currentQuestion.options[3]}`;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Cuál es tu respuesta?')
            .getResponse();
    }
};

const AnswerIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent';
    },
    handle(handlerInput) {
        const userAnswer = handlerInput.requestEnvelope.request.intent.slots.number.value;
        const questionIndex = 0; // Implementa lógica para manejar el índice de la pregunta actual
        const correctAnswer = questions[questionIndex].correctAnswer;
        
        let speakOutput = '';
        if (questions[questionIndex].options[userAnswer - 1] === correctAnswer) {
            speakOutput = '¡Correcto!';
        } else {
            speakOutput = `Incorrecto. La respuesta correcta es ${correctAnswer}.`;
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Puedes decirme que inicie el examen y luego responder las preguntas con el número de la opción correcta.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Adiós!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const speakOutput = 'Lo siento, no entendí eso. ¿Puedes intentarlo de nuevo?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        StartQuizIntentHandler,
        AnswerIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler
    )
    .addErrorHandlers(
        ErrorHandler
    )
    .lambda();
