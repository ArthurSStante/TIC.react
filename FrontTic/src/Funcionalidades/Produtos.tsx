interface Produtos {
    nome: string;
    descricao: string,
    categoria: string,
    dt_validade: string,
    qtde: number,
}
export function Produtos (ddcadastro: Produtos){
    return(
        <div className="bg-zinc-900 w-20 h-10 text-white rounded m2 flex items-center justify center">
            Nome:{ddcadastro.nome}
            Descrição:{ddcadastro.descricao}
            Categoria:{ddcadastro.categoria}
            dt_validade:{ddcadastro.dt_validade}
            Quantidade: {ddcadastro.qtde}
        </div>
    )
}