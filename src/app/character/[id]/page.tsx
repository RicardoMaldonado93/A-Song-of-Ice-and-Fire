import { getCharacterDetail } from "@/actions/character-actions";
import { ReturnHomeButton } from "@/components/custom/return-home-button";
import type { PageProps } from "@/utils/typescript";
import CharacterDetail from "./_components/character-detail";

export default async function CharacterID(props: PageProps) {
  const { id } = await props.params;
  const details = await getCharacterDetail(Number(id));

  return (
    <section className="container">
      <CharacterDetail {...details} />

      <div className="w-full justify-center flex mt-2 pb-4">
        <ReturnHomeButton />
      </div>
    </section>
  );
}
