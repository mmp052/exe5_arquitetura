import { Fragment, useState } from "react"
import { Button, Grid, IconButton, Snackbar } from '@mui/material';
import { ItemForm } from "./ItemForm";


export function CadastraCampeonato() {

    const [nome, setNome] = useState()

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
          'nome': nome
        }
    
        fetch('http://localhost:8080/campeonato', {
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
          setMessage("Campeonato cadastrado com sucesso")
          //load()
        }).catch(response => {
            setOpen(true)
            setMessage('erro no cadastro da campeonato!')
        })
    }

    return (
        <>
            <div className="card">

                <Grid container columnSpacing={2} rowSpacing={1}>
                    <ItemForm label={"Nome:"} value={nome} set={setNome}></ItemForm>
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