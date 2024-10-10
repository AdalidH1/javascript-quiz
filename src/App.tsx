import './App.css'

import { Container, Stack, Typography } from "@mui/material";
import JavaScriptLogo from './JavaScriptLogo';
import Start from './Start';
import { useQuestionStore } from './store/questions';
import { Game } from './Game';
import Logo from './logo';

function App() {
  const questions = useQuestionStore(state => state.questions)
  console.log(questions)

  return (
    <>
      <main>
        <Container maxWidth="sm">
          <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
            <JavaScriptLogo />
            <Typography variant='h2' component="h1">
              JavaScript Quizz
            </Typography>
          </Stack>

          {questions.length === 0 ? <Start /> : <Game />}

        </Container>
      </main>
    </>
  )
}

export default App
