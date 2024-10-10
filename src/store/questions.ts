import { type Question } from "../types";
import { create } from "zustand"
import confetti from "canvas-confetti";

interface State {
    questions: Question[],
    currentQuestion: number,
    fetchQuestions: (limit: number) => Promise<void>,
    selectAnswer: (questionId: number, answerIndex: number) => void
}

export const useQuestionStore = create<State>((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json')
            const json = await res.json()

            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
            set({ questions })
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
            // get devuelve el valor ACTUAL
            const { questions } = get()
            // clonar objeto
            const newQuestions = structuredClone(questions)
            // encontramos el indice de la pregunta 
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            // obtenemos la info de la pregunta
            const questionInfo = newQuestions[questionIndex]
            // verificamos si es la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

            if (isCorrectUserAnswer) confetti()
            // cambiar esta info en la copia de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            //actualizamos el estado
            set({ questions: newQuestions })
        }
    }
})