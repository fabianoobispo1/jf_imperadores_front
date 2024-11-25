import { Metadata } from 'next';
import AuthenticationModal from '@/components/signin/authentication-modal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Redirecionador from '@/components/redirecionador';

export const metadata: Metadata = {
  title: 'JF Imperadores',
  description: 'Pagina inicial JF Imperadores',
  keywords:
    'imperadores, jf imperadores, jfimperadores, futebolamericano, futebol ameriacno, fabr, juiz de fora imperadores, time imperadores, time jfimperadores, time jf imperadores'
};

export default function HomePage() {
  return (
    <div className="flex h-screen items-center justify-center ">
      {/* <Redirecionador link={'https://jfimperadores.lojavirtualnuvem.com.br'} /> */}
      <p>linktree</p>
      {/*  <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <Image
          alt="Campo-de-futebol-americano.jpg"
          src={'/Campo-de-futebol-americano.jpg'}
          fill={true}
          objectFit="cover"
        />

        <div className="relative z-20 flex items-center text-lg font-bold text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg"></p>
          </blockquote>
        </div>
      </div>
      <AuthenticationModal /> */}
    </div>
  );
}
