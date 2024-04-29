import { Fragment, useState } from "react"
import { Button, Grid, IconButton, Snackbar } from '@mui/material';
import { ItemForm } from "./ItemForm";


export function CadastraPartida() {

    const [timeMandante, setTimeMandante] = useState()
    const [timeVisitante, setTimeVisitante] = useState()
    const [placarMandante, setPlacarMandante] = useState()
    const [placarVisitante, setPlacarVisitante] = useState()
    const [campeonato, setCampeonato] = useState()

    const [open, setOpen] = useState(false)

    const [message, setMessage] = useState()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const action = (
        <Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
          </IconButton>
        </Fragment>
      );

    function click() {
        let data = {
          'timeMandante': timeMandante,
          'timeVisitante': timeVisitante,
          'placarMandante': placarMandante,
          'placarVisitante': placarVisitante,
          'campeonato': campeonato
        }
    
        fetch('http://localhost:8080/partida', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
            if (!response.ok) {
                // error processing
                throw 'Error';
            }
          setOpen(true)
          setMessage("Partida cadastrado com sucesso")
          //load()
        }).catch(response => {
            setOpen(true)
            setMessage('erro no cadastro da partida!')
        })
    }

    return (
        <>
            <div className="card">

                <Grid container columnSpacing={2} rowSpacing={1}>
                    <ItemForm label={"Time Mandante:"} value={timeMandante} set={setTimeMandante}></ItemForm>
                    <ItemForm label={"Time Visitante:"} value={timeVisitante} set={setTimeVisitante}></ItemForm>
                    <ItemForm label={"Placar Mandante:"} value={placarMandante} set={setPlacarMandante}></ItemForm>
                    <ItemForm label={"Placar Visitante:"} value={placarVisitante} set={setPlacarVisitante}></ItemForm>
                    <ItemForm label={"Campeonato:"} value={campeonato} set={setCampeonato}></ItemForm>
                </Grid>
                <Button variant="outlined" onClick={() => click()}>Cadastrar</Button>

            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            ></Snackbar>
        </>
    )

}