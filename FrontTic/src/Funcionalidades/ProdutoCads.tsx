import {useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {MdInventory2, MdReorder, MdClose} from 'react-icons/md'
import '../style/ProdutoCads.css'
import Menu from './menu';
import '../style/global.css'

interface Produtos {
    nome: string;
    dt_chegada: string,
    categoria: string,
    dt_validade: string,
    qtde: number,
}

export function ProdutoCads() {
    // esta variável vai conter o username passado na navegação
    const location = useLocation();
    // recupera o username
    const username = location.state?.username || '';
    // Vetor para armazenar os produtos 
    const [vetProduct, setProduct] = useState<Produtos[]>([])
    // Variaveis
    const [nome, setNome] = useState('')
    const [dt_chegada, setDt_chegada] = useState('')
    const [categoria, setCategoria] = useState('')
    const [dt_validade, setDt_Validade] = useState('')
    const [qtde,setQtde] = useState(0)
    const [id, setId] = useState(0)

    
    // Menu
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    // Cadastrar Produto
    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let produto 
        produto = {
          nome,
          categoria,
          dt_chegada,
          dt_validade,
          qtde
        }
        try{
          const produtoCadastrado = await fetch(`http://localhost:3000/products`, {
            method : 'POST',
            headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(produto)
        })
        .then ( resp => { // quando o servidor respondeu
          return resp.json() // transforma em json
        })
         // atualiza a lista de produtos
         // monta uma nova lista com a lista anterior + produto cadastrado
         if (id == 0) { // insere
          setProduct([...vetProduct, produtoCadastrado])
          alert('Cadastrado')
         }
        }
        catch(error) {
          console.log(error)
        }
    } 
    return(
      <>    
      <header className="flex h-[100px] container-header">
      <div className="dropdown w-[5em] h-[5em]">
        <button onClick={toggleMenu} className="dropdown-button bg-inherit text-black w-[5em] mt-[23px] p-0">
          { isOpen ? (<MdReorder size={60}/>) : (<MdClose size={60}/>)}
        </button>
        <div className="flex-col dropdown-menu" id="menu-esc">
          { !isOpen && (<Menu username={username}/>)}
        </div>
      </div>
      <span className="text-left font-semibold text-[25px] mt-[50px] container-title-C" id="title">Cadastro De Produto</span>
      </header> 
      <div className="ml-28">
        <div className='flex items-center mb-[-20px]'><MdInventory2 size={30}/> <h1 className='text-[30px] pl-[5px]'>Novos Produtos</h1></div>
        <div className='mb-[10px] ml-[5px]'>Estoque</div>
      </div>
          <div className="ml-28 mt-16 max-w-6xl">
            <div id="dados" className='w-[1500px] rounded-tl-[5px] rounded-tr-[5px] flex items-center container-C '> 
            <MdInventory2 size={20} className='ml-[20px]'/> <h3 className='text-[20px] ml-[3px]'> Dados Dos Produto</h3> </div>  
            <form onSubmit={handleSubmit} className="w-[1276px] h-[350px] rounded-bl-[5px] rounded-br-[5px] pt-[40px] px-[7em] container-form">
              <div className='flex flex-row flex-wrap gap-10'>
                  <div className="w-50 h-16 ">
                        <label htmlFor="nome" className="text-sm font-bold mb-2 mr-2 ">
                          Nome    
                        </label>
                        <input type="text" id="nome" value={nome} 
                                onChange={ (e) => setNome(e.target.value) } 
                                className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black" />
                  </div>
                    <div  className="w-50 h-16">
                      <label htmlFor="categoria" className="text-sm font-bold mb-2 mr-2">
                        Categoria
                      </label>
                        <input type='text' id="categoria" value={categoria}
                                onChange={ (e) => setCategoria(e.target.value) }
                                className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black" />
                    </div>
                  <div  className="w-50 h-16">
                    <label htmlFor="dt_validade" className="text-sm font-bold mb-2 mr-2">
                        Data Validade
                    </label>
                    <input type='text' id="dt_validade" value={dt_validade}
                                onChange={ (e) => setDt_Validade(e.target.value) }
                                className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black" />
                  </div>
                  <div  className="w-50 h-16">
                    <label htmlFor="qtde" className="text-sm font-bold mb-2 mr-2 ">
                        Quantidade 
                    </label>
                    <input type="number" id="qtde" value={qtde}
                                onChange={ (e) => setQtde(Number(e.target.value))}
                                className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black" />
                  </div>
                  <div className="w-50 h-16">
                    <label htmlFor="dt_chegada" className="text-sm font-bold mb-2 mr-2"> 
                        Data De Chegada
                      </label>
                      <input type='text' id="dt_chegada" value={dt_chegada}
                                onChange={ (e) => setDt_chegada(e.target.value) }
                                className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black" />
                  </div>
              </div>
              <div className='flex mr-auto'>
              <button type="submit" id="buttonC" 
                    className="w-[135px] h-[45px] rounded-[5px] border border-black border-opacity-50 mb-0 mt-[5em] container-button-C">
                    Cadastrar
              </button>
              </div>
            </form>
          </div>
      </>
    )
}