import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './login.css'
import '../../style/erroModel.css'
import creche from './../imgs/crecheL.png'
import ErrorModal from "../../ErroModal"

export default function Login(){
    // Criar as variaveis para o acesso
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const[showError,setShowError] = useState <Boolean>(false)

    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const resp = await fetch(`http://localhost:3000/users?username=${username}`, {
            method: 'GET'
            })
            .then (resposta => {
                return resposta.json()
            })
            console.log(resp)
            if (resp.length === 0) {
                setShowError(true)
                startAutoCloseTimer()
            }
            else {
                // Verifica se a senha está correta
                if (resp[0].password !== password) {
                    setShowError(true)
                    startAutoCloseTimer()
                }
                else {
                   // Se estiver certa
                    navigate('/produtos', {state: {username: username}})
                }
            }
        }


        // Função para iniciar o temporizador
    const startAutoCloseTimer = () => {
        // Define o temporizador para fechar o modal após 5 segundos (5000 milissegundos)
            setTimeout(() => {
                setShowError(false);
        }, 3000); // 3 segundos
    }

    return(
        <>
        <header className="container-header-login">
            <div className="pt-1.5 pl-2">
                <img src={creche}></img>
            </div>
        </header>
            <div id="login" className="container-login-login">
                <form onSubmit={handleLogin}>
                        {/*Inserir Dados*/}
                    <div className="Dados">
                        {/*Usuario*/}   
                        <label className="text-xl container-formlabel-login" htmlFor="username" > Usuario: </label>
                        <input type="text" id="username" className="bg-white border-x-0 border-t-0 text-black outline-0 container-input-login" value={username}
                        onChange={e => setUsername(e.target.value)}/>
                    {/*Senha*/}
                        <label className="text-xl container-formlabel-login" htmlFor="password" > Senha: </label>
                        <input type="password" id="password" className="bg-white border-x-0 border-t-0 text-black outline-0 container-input-login" value={password}
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    {/*Enviar*/}
                    <button type="submit" className="border-transparent container-button-login"> ENTRAR </button> 
    
                    <p className="container-p-login"> Não tem cadastro? <a className="text-black" href="CadastroUsuairo.html"> <strong > Cadastrar-se </strong> </a></p>
                        {showError && (
                            <ErrorModal
                                message="Nome ou senha incorretos. Tente Novamente." onClose={function (): void {
                                throw new Error("Function not implemented.")
                                }}                            
                            />
                        )}
                </form>
            </div>
        </>
    )
}
