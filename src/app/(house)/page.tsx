import { getHousesWithSwornMembers } from "@/actions/house-actions";
import { PageProps } from "@/utils/typescript";
import HouseTable from "./_components/house-table";
import NoRecordsAdvice from "./_components/no-records-advice";

export default async function Houses({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;

  const page = parseInt(pageParam, 10) || 1;
  const housesWithMembers = await getHousesWithSwornMembers(page);

  return (
    <section className="max-w-[1440px] mx-auto">
      <h2 className="text-2xl font-bold my-4">A Song of Ice and Fire</h2>

      {housesWithMembers.length > 0 ? (
        <HouseTable houses={housesWithMembers} page={page} />
      ) : (
        <NoRecordsAdvice />
      )}
    </section>
  );
}
