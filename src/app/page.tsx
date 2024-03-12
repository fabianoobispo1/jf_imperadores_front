import Header from "@/components/Header";
import HeaderV2 from "@/components/HeaderV2";

export default function Home() {
  return (
    <>
    <Header />
   {/*     <HeaderV2 /> */}
      <section className="bg-ct-blue-600 min-h-screen pt-12">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <p className="text-3xl font-semibold">
            Em Breve 🏈 ...
          </p>
        </div>
      </section>
    </>
  );
}
