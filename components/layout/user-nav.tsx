'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import axios from 'axios';
import credentials from 'next-auth/providers/credentials';
import { signOut, useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function UserNav() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [umaVez, setUmaVez] = useState(true);
  const [img_url, setimg_url] = useState('');

  useEffect(() => {
    if (umaVez) {
      setLoading(true);
   
      const tste = async () => {

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/usuario/buscausuarioemail`,
            {
              email: session?.user.email
            },
            {
              headers: {
                Authorization: `Bearer ${session?.user.tokenApi}` // Adiciona o token no header
              }
            }
          );
  
          /*    const dataresponse = await response.json(); */
          /*  console.log(response); */
          setimg_url(response.data.sfaUsuario.img_url);
  
          setLoading(false);
        } catch (error) {
          signOut()
          setLoading(false);
        }


       
      };

      tste();

      setUmaVez(false); // Corrigido para evitar repetição infinita
    }
  }, [session, umaVez]);

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={img_url} alt={session.user?.name ?? ''} />
              <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/dashboard/perfil')}>
              Perfil
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            {/*  <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>*/}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            Sair
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
