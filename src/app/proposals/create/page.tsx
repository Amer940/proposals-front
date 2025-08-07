import { getAllPartnersForSelect } from "@/actions/partner/get-all-partners-for-select";
import { getAllStatusesForSelect } from "@/actions/statuses/get-all-statuses-for-select";
import CreateProposalForm from "@/components/forms/CreateProposalForm";
import Navbar from "@/components/Navbar";

export default async function Proposal() {
  const allStatuses = await getAllStatusesForSelect();
  const allPartners = await getAllPartnersForSelect();

  return (
    <>
      <Navbar />
      <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 max-w-[1200px] mx-auto">
        <div className="flex flex-col justify-center items-center align-middle gap-3">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Create proposal
          </h3>
        </div>
        <CreateProposalForm
          allPartners={allPartners}
          allStatuses={allStatuses}
        />
      </div>
    </>
  );
}
