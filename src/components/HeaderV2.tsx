"use client";

import { demos, type Item } from '../lib/demos'
import Spinner from "./Spinner";
import Link from "next/link";
import useSession from "@/lib/useSession";
import useStore from "@/store";
import { apiLogoutUser } from "@/lib/api-requests";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { X, List, User } from 'phosphor-react'
import clsx from 'clsx'


import { useSelectedLayoutSegment } from 'next/navigation'

const Header = () => {
  const store = useStore();
  const user = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  const handleLogout = async () => {
    store.setRequestLoading(true);
    try {
      await apiLogoutUser();
    } catch (error) {
    } finally {
      store.reset();
      router.push("/login");
    }
  };
  return (
    <>
      <header className="bg-white h-20">
        <nav className="h-full flex justify-between container items-center">
          <div>
            <Link href="/" className="text-ct-dark-600 text-2xl font-semibold">
              Império
            </Link>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              
              <Link href="/" className="text-ct-dark-600">
                Inicio
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link href="/register" className="text-ct-dark-600">
                    Registrar
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-ct-dark-600">
                    Entrar
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link href="/profile" className="text-ct-dark-600">
                    Perfil
                  </Link>
                </li>
                <li className="cursor-pointer" onClick={handleLogout}>
                  Sair
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <div className="pt-4 pl-2 bg-ct-blue-600 fixed">
        {store.requestLoading && <Spinner color="text-ct-yellow-600" />}
      </div>





      <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-800">
      <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
        <Link
          href="/"
          className="group flex w-4/5 items-center gap-x-2.5"
          onClick={close}
        >
          <div className="flex h-7 w-7 items-center  rounded-full border border-white/30 group-hover:border-white/50">
            <User size={26} className="text-cyan-900" />
          </div>

          <h3 className="font-semibold tracking-wide text-gray-400 group-hover:text-gray-50">
            Fabiano Bispo
          </h3>
        </Link>
      </div>

      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-gray-100 group-hover:text-gray-400">
          Menu
        </div>
        {isOpen ? (
          <X size={24} className="block w-6 text-gray-400" />
        ) : (
          <List size={24} className="block w-6 text-gray-400" />
        )}
      </button>
      <div
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
          hidden: !isOpen,
        })}
      >
        <div className="flex items-center justify-center">
          {/* <LoginLogoutButton /> */}
        </div>

        <nav className="space-y-6 px-2 py-5">
          {demos.map((section) => {
            return (
              <div key={section.key}>
                <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400/80">
                  <div>{section.name}</div>
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <GlobalNavItem key={item.slug} item={item} close={close} />
                  ))}
                </div>
              </div>
            )
          })}
        </nav>
    {/*     <Byline className="absolute hidden sm:block" /> */}
      </div>
    </div>



      
    </>
  );
};

function GlobalNavItem({
  item,
  close,
}: {
  item: Item
  close: () => false | void
}) {
  const segment = useSelectedLayoutSegment()
  const isActive = item.slug === segment

  return (
    <Link
      onClick={close}
      href={`/${item.slug}`}
      className={clsx(
        'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300',
        {
          'text-gray-400 hover:bg-gray-800': !isActive,
          'text-white': isActive,
        },
      )}
    >
      {item.name}
    </Link>
  )
}


export default Header;
