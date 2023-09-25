import { MdAutorenew, MdInventory2,} from "react-icons/md";
import { Link } from "react-router-dom";
import './Login/login.css'

interface Menu{
    username: string
}
export default function Menu( {username}: Menu) {

        return(
            <>
            <div className="flex flex-col h-screen overflow-y-auto px-4 py-8 border-r w-[453px] bg-cyan-400 relative mt-[5px]">
                <h2 className=""> Local Da imagem </h2>
                <h3 className=" text-center text-3xl text-white"> {username} </h3>
                <div className="flex flex-col justify-between mt-6">
                    <div> 
                        <ul className="list-none">
                            <li className="mb-[5em] menu-items">
                                <Link to="/cadastros" className="flex items-center py-2 rounded-md text-black"> 
                                    <MdInventory2 size={40}/>
                                    <span className="font-bold  text-3xl">Cadastro De Produto</span>
                                </Link> 
                            </li>   
                            <li className="mb-6">   
                                <Link to="/produtos" className="flex items-center py-2 rounded-md text-black font-bold"> 
                                    <MdAutorenew size={40} />
                                    <span className="text-3xl">Atualização</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </>
        )
}