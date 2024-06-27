'use client'
import { useSession } from 'next-auth/react';
import React from 'react';

export default function AcessoAdministrador() {
  const { data: session } = useSession();
  if(!session?.user.administrador){
    window.location.href = '/dashboard';
  }
  return (
   <></>
  );
}
