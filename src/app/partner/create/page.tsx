import CreatePartnerForm from "@/components/forms/CreatePartnerForm";
import Navbar from "@/components/Navbar";

export default async function Partner() {
  return (
    <>
      <Navbar />
      <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 max-w-[1200px] mx-auto">
        <div className="flex flex-col justify-center items-center align-middle gap-3">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Create partner
          </h3>
        </div>
        <CreatePartnerForm />
      </div>
    </>
  );
}
