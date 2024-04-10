"use client";

import { demos, type Item } from '../lib/demos'
import Spinner from "./Spinner";
import Link from "next/link";
import useSession from "@/lib/useSession";
import useStore from "@/store";
import { apiLogoutUser } from "@/lib/api-requests";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X, List, User } from 'phosphor-react'
import clsx from 'clsx'
import { NextRequest } from "next/server";


import { useSelectedLayoutSegment } from 'next/navigation'

const HeaderV2 = () => {
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

  if(store.authUser){
    return (
      <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-500 bg-white lg:bottom-0 lg:z-auto lg:w-1/6 lg:border-b-0 lg:border-r lg:border-gray-500">
        <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
          <Link
        
            href="/profile"
            className="group flex w-4/5 items-center gap-x-2.5"           
          >
            <div className="flex h-7 w-7 items-center  rounded-full border border-fa-dourado/30 group-hover:border-fa-dourado/50">
              <User size={26} className="text-cyan-900" />
            </div>
  
            <h3 className="font-semibold tracking-wide text-gray-900 group-hover:text-gray-400">
              {user?.name}
            </h3>
          </Link>
        </div>
  
        <button
          type="button"
          className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="font-medium text-gray-900 group-hover:text-gray-400">
            Menu
          </div>
          {isOpen ? (
            <X size={24} className="block w-6 text-gray-900" />
          ) : (
            <List size={24} className="block w-6 text-gray-900" />
          )}
        </button>
        <div
          className={clsx('overflow-y-auto lg:static lg:block', {
            'fixed inset-x-0 bottom-0 top-14 mt-px bg-white': isOpen,
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
                  <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-900/80">
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
          <div className="flex items-center justify-center">
            <button className="cursor-pointer " onClick={handleLogout}>
              Sair
            </button>
              
          </div>
  
      {/*     <Byline className="absolute hidden sm:block" /> */}
        </div>
      </div>
  
  
  
    
    );
  }else{
    return(<></>)
  }

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
        'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-900',
        {
          'text-gray-900 hover:bg-fa-dourado': !isActive,
          'text-gray-500': isActive,
        },
      )}
    >
      {item.name}
    </Link>
  )
}


export default HeaderV2;
