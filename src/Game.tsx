import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useQuestionStore } from "./store/questions"
import SyntaxHighLighter from "react-syntax-highlighter"
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { type Question as QuestionType } from "./types"

const Question = ({ info }: {info: QuestionType}) => {

    const selectAnswer = useQuestionStore(state => state.selectAnswer)

    const handleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    } 

    const getBackgroundColor = (index: number) => {
        const { userSelectedAnswer, correctAnswer  } = info
        // usuario no ha seleccionado nada
        if (userSelectedAnswer == null) return 'transparent'
        // si la res es incorrecta
        if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
        // si es la res correcta
        if (index === correctAnswer) return 'green'
        // si esta es la seleccion del usuario pero no es correcta
        if (index === userSelectedAnswer) return 'red'
        // si no es ninguna de las anteriores 
        return 'transparent'
    }
    return (
        <Card variant="outlined" sx={{textAlign: "left", bgcolor: '#222', p: 2, marginTop: 4}}>
            <Typography variant='h5'>
                {info.question}
            </Typography>

            <SyntaxHighLighter language="javascript" style={gradientDark}>
                {info.code}
            </SyntaxHighLighter>

            <List sx={{ bgcolor: "#333" }} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton 
                            disabled={info.userSelectedAnswer != null}
                            onClick={handleClick(index)}
                            sx={{
                            backgroundColor: getBackgroundColor(index)
                         }}
                        >
                            <ListItemText primary={answer} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionStore(state => state.questions)
    const currentQuestion = useQuestionStore(state => state.currentQuestion)

    const questionInfo = questions[currentQuestion]
    return (
        <>
            <Question info={questionInfo} />
        </>
    )
}