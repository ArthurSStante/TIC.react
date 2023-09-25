import {useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {MdAutorenew, MdClose, MdEditDocument, MdMode, MdOutlineDeleteOutline, MdReorder} from 'react-icons/md'
import '../style/Atualização.css'
import Menu from './menu';
import '../style/global.css'

interface Produtos {
    id: number;
    nome: string;
    dt_chegada: string,
    categoria: string,
    dt_validade: string,
    qtde: number,
}

export function Estoque() {
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
  
  // fazer o hook useEffect para carregar os produtos da API
  // quando a página for carregada ou o username for alterado
  useEffect( () => {
    const buscaProdutos = async () => {
      try {
        const resp = await fetch(`http://localhost:3000/products`)
        const produtos = await resp.json()
        if (resp.ok){
            setProduct(produtos) // atualiza vetor de produtos com dados da API
        }
        else {
          console.log('Falha na busca por dados')
        }
      }
      catch(error) {
        console.log(error)
      }
    }
      buscaProdutos()
  } , [username])

  // quando o vetor de produtos for alterado, executa a função useEffect
  useEffect( () => {
    setProduct(vetProduct) // atualiza a lista de produtos
  }, [vetProduct] ) 

  const handleAtualizar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // evita que a página seja recarregada
    // monta o objeto produt
    let produto
    if (id == 0) { // insere
      alert('Produto inexiste')
    } 
    else {
    produto = { // atualiza
        nome,
        dt_chegada,
        categoria,
        dt_validade,
        qtde
      }
    }
    try{
        const produtoCadastrado = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'PUT',
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
           }
           else { // atualiza na lista o produto alterado
            setProduct(vetProduct.map( (produto) => {
                if (produto.id === id) {
                  return produtoCadastrado
                }
                else {
                  return produto
                }
              }))
           }
    }
    catch(error) {
        console.log(error)
    }
  }
    const handleEdit = (produto: Produtos) => {
        setNome(produto.nome)
        setDt_chegada(produto.dt_chegada)
        setCategoria(produto.categoria)
        setDt_Validade(produto.dt_validade)
        setId(produto.id) // vai nos ajudar na criação/edição do produto
      }
      const handleRemove = async (id: number) => {
        let confirma = confirm('Confirma a remoção do produto?')
        if (confirma) {
          // requisição DELETE para remover um produto através da API
          await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE'
          })
          .then( response => {
            return response.json()
          })
          .catch(error => {
              alert(error)
          })
          // atualiza a lista de produtos - removendo o produto deletado
          // setProducts vai receber como parâmetro a lista de produtos atual
          // retirando o produto que foi removido
          setProduct(vetProduct.filter( (produto) => produto.id !== id ))
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
                <span className="text-left font-semibold text-[25px] mt-[50]px" id="title">Casdastro De Produto</span>
            </header> 
            <div className="ml-28">
                <div>
                  <div className='flex items-center mb-[-20px]'><MdEditDocument size={30}/> <h1 className='text-[30px] pl-[5px]'>Novos Produtos</h1></div>
                  <div className='mb-[10px] mr-5'>Produtos</div>  
                </div> 
            </div>  
            <div className="ml-28 mt-16 max-w-6xl">
                {/* formulário para cadastro de um produto */}
                <h3 className="w-[992px] bg-orange-100 rounded-tl-[5px] rounded-tr-[5px] shadow-inner mb-0 pb-[25px] pt-[25px] px-[2em] text-[2.5em]"><span><MdAutorenew size={35}/></span> Atualização </h3>   
                <form onSubmit={handleAtualizar} className="first-letter:w-[1300px] h-[400px] bg-zinc-100 rounded-bl-[5px] rounded-br-[5px] shadow-inner pt-[40px] px-[7em]">
                <div className="">
                        <div id="Camp">   
                            <div className="w-8/12 h-16 ">
                                <label htmlFor="nome" className="text-sm font-bold mb-2 mr-2 ">
                                    Nome    
                                </label>
                                <input type="text" id="nome" value={nome} 
                                    onChange={ (e) => setNome(e.target.value) } 
                                    className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black"/>
                            </div>
                            <div  className="w-8/12 h-16">
                                <label htmlFor="categoria" className="text-sm font-bold mb-2 mr-2 mt-[1em]">
                                    Categoria
                                </label>
                                <input type='text' id="categoria" value={categoria}
                                    onChange={ (e) => setCategoria(e.target.value) }
                                    className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black" />
                            </div>
                        <div id="Camp">
                            <div className="w-8/12 h-16">
                                <label htmlFor="dt_validade" className="text-sm font-bold mb-2 mr-2">
                                    Data Validade
                                </label>
                                <input type='text' id="dt_validade" value={dt_validade}
                                    onChange={ (e) => setDt_Validade(e.target.value) }
                                    className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black" />
                            </div>
                            <div className="w-8/12 h-16">
                                <label htmlFor="qtde" className="text-sm font-bold mb-2 mr-2 mt-[1em]">
                                    Quantidade 
                                </label>  
                                <input type="number" id="qtde" value={qtde}
                                    onChange={ (e) => setQtde(Number(e.target.value))}
                                    className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black" />
                            </div>
                            <div className="w-8/12 h-16">
                                <label htmlFor="dt_chegada" className="text-sm font-bold mb-2 mr-2 mt-[1em]"> 
                                    Data De Chegada
                                </label>
                                <input type='text' id="dt_chegada" value={dt_chegada}
                                    onChange={ (e) => setDt_chegada(e.target.value) }
                                    className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black" />
                            </div>
                        </div>
                  </div>
                </div>
                </form>
            </div>
                {/* lista de produtos dentro de uma tabela */}
                <h2 className=" ml-[5em] font-bold mb-4"> Lista de Produtos </h2>
                <table className="ml-[7em] border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Nome</th>
                    <th className="border border-gray-300 px-4 py-2">Categoria</th>
                    <th className="border border-gray-300 px-4 py-2">Data De Chegada</th>
                    <th className="border border-gray-300 px-4 py-2">Data De Chegada</th>
                    <th className="border border-gray-300 px-4 py-2">Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    vetProduct.map( (product) => (
                        <tr key={product.id}>
                        <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.nome}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.dt_chegada}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.dt_validade}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.categoria}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.qtde}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button className="w-[5em] bg-cyan-500" onClick={() => handleEdit(product)}> 
                            <MdMode size={20}/>
                            </button>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button className="w-[5em] bg-cyan-500" onClick={() => handleRemove(product.id)}> 
                            <MdOutlineDeleteOutline size={20}/>
                            </button>
                        </td>
                        </tr>
                    ) /* fim da função dentro do map */
                    ) /* fim do map */
                    } {/* fim do reactjs */}
                </tbody>
                </table>
    </>
    )
}