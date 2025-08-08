import { getAllCountriesForSelect } from "@/actions/country/get-all-countries-for-select";
import { PartnersTableWrapper } from "@/columns/PartnerMainColumns";
import Navbar from "@/components/Navbar";

export default async function Partner() {
  const allCountries = await getAllCountriesForSelect();
  return (
    <>
      <Navbar />
      <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 max-w-[1200px] mx-auto">
        <div className="flex flex-col justify-center items-center align-middle gap-3">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Partners
          </h3>
          <small className="text-sm leading-none font-medium text-white/50">
            This is the partners &quot;see-all&quot; table.
          </small>
        </div>
        <PartnersTableWrapper allCountries={allCountries} />
      </div>
    </>
  );
}
