import { useDisclosure } from "@/hooks/use-disclosure";
import { SettlementType } from "@/services/base/base.dto";
import { Modal, Tooltip, Typography } from "antd";
import { EyeIcon } from "lucide-react";

export function SettlementDetail({
  settlementData,
}: {
  settlementData: SettlementType;
}) {
  const modal = useDisclosure();

  const handleClose = () => {
    modal.onClose();
  };

  return (
    <Tooltip title="Detail">
      <div
        onClick={modal.onOpen}
        className="flex gap-1 items-center cursor-pointer text-blue-500"
      >
        <EyeIcon className="w-4 h-4" />
        <span>Detail</span>
      </div>

      <Modal
        title={
          <Typography.Title className="font-normal" level={3}>
            Settlement Detail
          </Typography.Title>
        }
        open={modal.isOpen}
        onCancel={() => modal.onClose()}
        okButtonProps={{ className: "!hidden" }}
        okText="Tutup"
        onOk={handleClose}
      >
        <div className="overflow-x-auto">
          <pre>{JSON.stringify(settlementData, null, 2)}</pre>
        </div>
      </Modal>
    </Tooltip>
  );
}
