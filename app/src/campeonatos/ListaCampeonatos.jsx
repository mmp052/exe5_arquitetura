import { useEffect, useState } from "react"


export function ListaCampeonatos() {

  const [data, setData] = useState([])

  useEffect(() => {
    load()
  }, [])

  function load() {
    fetch('http://localhost:8080/Campeonato', {
      method: 'GET'
    }).then(response => {
      return response.json()
    }).then(data => {
      setData(data)
    }).catch(response => {
      alert('Erro ao listar campeonatos!')
      alert(response.status)
    })
  }

  return(
    <>
        <div className="card">
            <table>
                <tbody>
                    <tr>
                    <td>id</td>
                    <td>Nome</td>
                    </tr>            
                    {
                    data.map((time, index) => {
                        return <tr key={index}>
                          <td>{time.id}</td>
                        <td>{time.nome}</td>
                        </tr>
                    })

                    }
                </tbody>
            </table>

        </div>
      </>
  )


}