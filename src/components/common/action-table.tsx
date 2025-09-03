import { SquarePen } from "lucide-react";
import { DeleteModal } from "./delete-modal";

function ActionTable({
  onEdit,
  onDelete,
  onDetail,
}: {
  onEdit?: () => void;
  onDelete?: () => Promise<void>;
  onDetail?: () => void;
}) {
  return (
    <div className="flex gap-2">
      {onEdit && (
        <div
          onClick={onEdit}
          className="flex gap-2 items-center cursor-pointer text-[#8B5CF6]"
        >
          <SquarePen className="w-4 h-4" />
          <span>Edit</span>
        </div>
      )}
      {onDelete && <DeleteModal onConfirm={onDelete} />}
      {onDetail && (
        <div
          onClick={onDetail}
          className="flex gap-2 cursor-pointer text-[#8B5CF6]"
        >
          Detail
        </div>
      )}
    </div>
  );
}

export default ActionTable;
