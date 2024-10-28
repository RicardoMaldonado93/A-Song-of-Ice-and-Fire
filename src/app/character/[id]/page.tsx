import type { PageProps } from "@/utils/typescript";
import CharacterDetail from "./_components/character-detail";
import { api } from "@/api";
import { ReturnHomeButton } from "@/components/custom/return-home-button";

export default async function CharacterID(props: PageProps) {
  const { id } = await props.params;
  const details = await api.characters.getDetail(Number(id));

  return (
    <section className="container">
      <CharacterDetail {...details} />

      <div className="w-full justify-center flex mt-2 pb-4">
        <ReturnHomeButton />
      </div>
    </section>
  );
}
