import { SquarePen } from "lucide-react";
import { DeleteModal } from "./delete-modal";
import React from "react";

function ActionTable({
  onEdit,
  onDelete,
  componentDetail,
}: {
  onEdit?: () => void;
  onDelete?: () => Promise<void>;
  componentDetail?: React.ReactNode;
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
      {componentDetail && componentDetail}
    </div>
  );
}

export default ActionTable;
