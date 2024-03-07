import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html lang="pt-BR" >
      <Head>
        <metadata>
          <title>JF Imperadores</title>           
        </metadata>
      </Head>
      <body  className="overflow-y-scroll bg-slate-300 pb-36">   
      <div className="lg:pl-72">
            <div className="mx-auto max-w-7xl space-y-1 px-2 pt-20 lg:px-8 lg:py-8">
           
              <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/0">

              <Main />
        <NextScript />
              </div>
              </div>
              </div>
               
     
      </body>
    </Html>
  )
}