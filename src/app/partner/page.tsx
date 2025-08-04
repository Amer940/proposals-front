import { columns } from "@/columns/PartnerMainColumns";
import { PartnerMainTable } from "@/components/tables/PartnerMainTable";

export default async function Partner() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 max-w-[1200px] mx-auto">
      <div className="flex flex-col justify-center items-center align-middle gap-3">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Partners
        </h3>
        <small className="text-sm leading-none font-medium text-white/50">
          This is the partners &quot;see-all&quot; table.
        </small>
      </div>
      <PartnerMainTable columns={columns} />
    </div>
  );
}
