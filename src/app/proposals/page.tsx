import { ProposalsTableWrapper } from "@/columns/HomeColumns";
import Navbar from "@/components/Navbar";
import { getAllStatusesForSelect } from "@/actions/statuses/get-all-statuses-for-select";
import { getAllPartnersForSelect } from "@/actions/partner/get-all-partners-for-select";

export default async function Proposals() {
  const allStatuses = await getAllStatusesForSelect();
  const allPartners = await getAllPartnersForSelect();
  return (
    <>
      <Navbar />
      <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 max-w-[1200px] mx-auto">
        <div className="flex flex-col justify-center items-center align-middle gap-3">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Proposal Tracker
          </h3>
          <small className="text-sm leading-none font-medium text-white/50">
            This is the main &quot;see-all&quot; table. Go to other pages from
            the navbar for a more powerful overview.
          </small>
        </div>
        <ProposalsTableWrapper
          allStatuses={allStatuses}
          allPartners={allPartners}
        />
      </div>
    </>
  );
}
