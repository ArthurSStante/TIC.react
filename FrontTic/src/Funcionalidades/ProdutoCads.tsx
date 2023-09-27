import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdInventory2, MdReorder, MdClose } from "react-icons/md";
import "../style/ProdutoCads.css";
import Menu from "./menu";
import "../style/global.css";
import NavBar from "./NavBar";

interface Produtos {
  nome: string;
  dt_chegada: string;
  categoria: string;
  dt_validade: string;
  qtde: number;
}

export function ProdutoCads() {
  // esta variável vai conter o username passado na navegação
  const location = useLocation();
  // recupera o username
  const username = location.state?.username || "";
  // Vetor para armazenar os produtos
  const [vetProduct, setProduct] = useState<Produtos[]>([]);
  // Variaveis
  const [nome, setNome] = useState("");
  const [dt_chegada, setDt_chegada] = useState("");
  const [categoria, setCategoria] = useState("");
  const [dt_validade, setDt_Validade] = useState("");
  const [qtde, setQtde] = useState(0);
  const [id, setId] = useState(0);

  // Cadastrar Produto
  // Cadastrar Produto
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Verifica se os campos obrigatórios estão preenchidos
    if (!nome || !categoria || !dt_validade || qtde === 0) {
      alert('Preencha todos os campos obrigatórios.');
      return; // Impede o envio do formulário
    }
  
    let produto = {
      nome,
      categoria,
      dt_chegada,
      dt_validade,
      qtde,
    };
  
    try {
      const produtoCadastrado = await fetch(`http://localhost:3000/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto),
      }).then((resp) => {
        return resp.json();
      });
  
      if (id === 0) {
        setProduct([...vetProduct, produtoCadastrado]);
        alert('Cadastrado');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="ml-[540px]">
        <div className="flex flex-col">
          <div className="flex items-center mb-[-20px]">
            <MdInventory2 size={30} />{" "}
            <h1 className="font-normal text-[30px] pl-[5px]">Novos Produtos</h1>
          </div>
          <div className="mb-[1px] mr-5">Nova entrada no Estoque</div>
        </div>
      </div>
      <div className="mt-16 flex flex-col items-center">
        <div
          id="dados"
          className="w-[800px] rounded-tl-[20px] rounded-tr-[20px] flex items-center container-C "
        >
          <MdInventory2 size={20} className="ml-[20px]" />{" "}
          <h3 className="text-[20px] ml-[3px]"> Dados Dos Produto</h3>{" "}
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-[576px] h-[490px] rounded-bl-[20px] rounded-br-[20px] pt-[40px] px-[7em] container-form"
        >
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap100 ">
              <div className="w-8/12 ">
                <label htmlFor="nome" className="text-sm font-bold mb-2 mr-2 ">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black"
                />
              </div>
              <div className="w-8/12 ">
                <label
                  htmlFor="categoria"
                  className="text-sm font-bold mb-2 mr-2"
                >
                  Categoria
                </label>
                <input
                  type="text"
                  id="categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black"
                />
              </div>
              <div className="w-8/12 ">
                <label
                  htmlFor="dt_validade"
                  className="text-sm font-bold mb-2 mr-2"
                >
                  Data Validade
                </label>
                <input
                  type="text"
                  id="dt_validade"
                  value={dt_validade}
                  onChange={(e) => setDt_Validade(e.target.value)}
                  className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black"
                />
              </div>
              <div className="w-8/12 ">
                <label htmlFor="qtde" className="text-sm font-bold mb-2 mr-2 ">
                  Quantidade
                </label>
                <input
                  type="number"
                  id="qtde"
                  value={qtde}
                  onChange={(e) => setQtde(Number(e.target.value))}
                  className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black"
                />
              </div>
              <div className="w-8/12 ">
                <label
                  htmlFor="dt_chegada"
                  className="text-sm font-bold mb-2 mr-2"
                >
                  Data De Chegada
                </label>
                <input
                  type="text"
                  id="dt_chegada"
                  value={dt_chegada}
                  onChange={(e) => setDt_chegada(e.target.value)}
                  className="mb-2 w-[314px] h-8 bg-white rounded-[5px] shadow-inner border border-black border-opacity-50 text-black"
                />
              </div>
            </div>

            <div className="">
              <button
                type="submit"
                className=" rounded-[5px] border border-black border-opacity-50 mb-0 mt-[5em] container-button-C"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
