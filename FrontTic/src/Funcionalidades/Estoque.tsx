import {useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {MdAutorenew, MdClose, MdEditDocument, MdMode, MdOutlineDeleteOutline, MdReorder} from 'react-icons/md'
import '../style/ProdutoCads.css'
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
              <button onClick={toggleMenu} className="dropdown-button bg-inherit text-black w-[5em] mt-[28px] p-0">
                { isOpen ? (<MdReorder size={50}/>) : (<MdClose size={50}/>)}
              </button>
              <div className="flex-col dropdown-menu" id="menu-esc">
                { !isOpen && (<Menu username={username}/>)}
              </div>
            </div>
                <span className="text-left font-semibold text-[25px] mt-[50]px container-title-C" id="title">Atualização e Produtos</span>
            </header> 
            <div className="ml-[540px]">
                <div className='flex flex-col '>
                  <div className='flex items-center mb-[-20px]'><MdEditDocument size={30}/> <h1 className='font-normal text-[30px] pl-[5px]'> Estoque </h1></div>
                  <div className='mb-[1px] mr-5'>Atualizar Produtos</div>  
                </div> 
            </div>  
            <div className="mt-16 flex flex-col items-center">
                {/* formulário para cadastro de um produto */}
                <div id='dados' className='w-[800px] rounded-tl-[20px] rounded-tr-[20px] flex items-center container-C '>
                  <MdAutorenew size={35} className='ml-[20px]'/> <h3 className='text-[20px] ml-[5px]'>Atualização </h3>   </div>
                <form onSubmit={handleAtualizar} className="w-[576px] h-[350px] rounded-bl-[20px] rounded-br-[20px] pt-[40px] px-[7em] container-form">
                  <div className="flex flex-col items-center">
                      <div id="Camp" className='flex flex-col items-center '>   
                        <div className="w-8/12 ">
                              <label htmlFor="nome" className="text-sm font-bold mb-2 mr-2 ">
                                  Nome    
                              </label>
                              <input type="text" id="nome" value={nome} 
                                  onChange={ (e) => setNome(e.target.value) } 
                                  className="outline-none mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black"/>
                          </div>
                          <div className="w-8/12 ">
                              <label htmlFor="categoria" className="text-sm font-bold mb-2 mr-2 mt-[1em]">
                                  Categoria
                              </label>
                              <input type='text' id="categoria" value={categoria}
                                  onChange={ (e) => setCategoria(e.target.value) }
                                  className=" outline-none mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black" />
                          </div>
                            <div className="w-8/12 ">
                              <label htmlFor="dt_validade" className="text-sm font-bold mb-2 mr-2 mt-[1em]">
                                  Data Validade
                              </label>
                              <input type='text' id="dt_validade" value={dt_validade}
                                  onChange={ (e) => setDt_Validade(e.target.value) }
                                  className="outline-none mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black" />
                          </div>
                          <div className="w-8/12 ">
                              <label htmlFor="qtde" className="text-sm font-bold mb-2 mr-2 mt-[1em]">
                                  Quantidade 
                              </label>  
                              <input type="number" id="qtde" value={qtde}
                                  onChange={ (e) => setQtde(Number(e.target.value))}
                                  className="outline-none mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black" />
                          </div>
                          <div className="w-8/12 ">
                              <label htmlFor="dt_chegada" className="text-sm font-bold mb-2 mr-2 mt-[1em]"> 
                                  Data De Chegada
                              </label>
                              <input type='text' id="dt_chegada" value={dt_chegada}
                                  onChange={ (e) => setDt_chegada(e.target.value) }
                                  className="outline-none mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black" />
                          </div>
                      </div>
                  </div>
                </form>
            </div>

                {/* lista de produtos dentro de uma tabela */}
                <h2 className="flex flex-col items-center font-bold mt-[80px]"> Lista de Produtos </h2>
                <table className="flex flex-col items-center border-gray-300">
                <thead>
                    <tr className=" bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Nome</th>
                    <th className="border border-gray-300 px-4 py-2">Categoria</th>
                    <th className="border border-gray-300 px-4 py-2">Data De Validade</th>
                    <th className="border border-gray-300 px-4 py-2">Data De Chegada</th>
                    <th className="border border-gray-300 px-4 py-2">Quantidade</th>
                    <th className="border border-gray-300 px-4 py-2">Editar</th>
                    <th className="border border-gray-300 px-4 py-2">Excluir</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                    vetProduct.map( (product) => (
                        <tr key={product.id} className=''>
                        <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.nome}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.categoria}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.dt_validade}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.dt_chegada}</td>
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
                    ) ) }
                </tbody>
                </table>
    </>
    )
}