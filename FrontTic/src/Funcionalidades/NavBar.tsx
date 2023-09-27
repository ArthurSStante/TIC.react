import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import Creche from "./imgs/crecheL.png";

const navBarItens = [
  {
    nome: "Produtos",
    link: "/produtos",
  },
  {
    nome: "Cadastros",
    link: "/cadastros",
  },
];

export default function NavBar() {
  const [currentRoute, setCurrentRoute] = useState(""); // Estado para armazenar a rota atual
  const location = useLocation(); // Obtém a localização atual
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentRoute(location.pathname); // Atualiza o estado com a rota atual sempre que ela mudar
  }, [location.pathname]);

  return (
    <>
      {location.pathname === "/" ? (
        <> </>
      ) : (
        <Disclosure
          as="nav"
          className={`container-header-login ${
            !isOpen && "shadow-[0px_2px_5px_rgba(39,39,39,0.6)]"
          } `}
        >
          {({ open }) => (
            <>
              <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="-mr-2 flex items-center">
                    {/* Mobile menu button */}
                    <Disclosure.Button
                      onClick={() => setIsOpen(!isOpen)}
                      className="relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-black  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                    <span
                      className="text-left font-semibold text-[25px]  "
                      id="title"
                    >
                      Cadastro De Produtos
                    </span>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="absolute bg-[#00d4ff] w-full max-w-[400px] ">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  <div className="flex w-full justify-center">
                    <img
                      className="h-50 w-50 mx-auto rounded-full"
                      src={Creche}
                      alt=""
                    />
                  </div>
                  {navBarItens.map((item, index) => (
                    <Disclosure.Button
                      key={index}
                      as="a"
                      href={item.link}
                      className={`block rounded-md px-3 py-2 text-base font-medium ${
                        currentRoute === item.link
                          ? "bg-cyan-700 text-white"
                          : "text-black hover:bg-cyan-700 hover:text-white"
                      } transition-all duration-200`}
                    >
                      {item.nome}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}
    </>
  );
}
