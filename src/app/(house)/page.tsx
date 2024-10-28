import { api } from "@/api";
import HouseTable from "./_components/house-table";
import NoRecordsAdvice from "./_components/no-records-advice";
import { PageProps } from "@/utils/typescript";

export default async function Houses({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;

  const page = parseInt(pageParam, 10) || 1;
  const housesWithMembers = await api.houses.getHousesWithSwornMembers(page);

  return (
    <div className="grid overflow-auto p-4">
      <h2 className="text-2xl font-bold mb-4">A Song of Ice and Fire</h2>

      {housesWithMembers.length > 0 ? (
        <HouseTable houses={housesWithMembers} page={page} />
      ) : (
        <NoRecordsAdvice />
      )}
    </div>
  );
}
