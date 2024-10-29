import { getCharacterDetail } from "@/actions/character-actions";
import CharacterDetail from "@/app/character/[id]/_components/character-detail";
import Modal from "@/components/ui/modal";
import { PageProps } from "@/utils/typescript";

export default async function Character(props: PageProps) {
  const { id } = await props.params;
  const details = await getCharacterDetail(Number(id));

  return (
    <Modal>
      <CharacterDetail {...details} />
    </Modal>
  );
}
