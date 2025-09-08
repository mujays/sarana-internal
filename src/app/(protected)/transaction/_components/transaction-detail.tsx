import { useDisclosure } from "@/hooks/use-disclosure";
import { TransactionType } from "@/services/base/base.dto";
import { Modal, Tooltip, Typography } from "antd";
import { EyeIcon } from "lucide-react";

export function TransactionDetail({
  transactionData,
}: {
  transactionData: TransactionType;
}) {
  const modal = useDisclosure();

  const handleClose = () => {
    modal.onClose();
  };

  return (
    <Tooltip title="Hapus">
      <div
        onClick={modal.onOpen}
        className="flex gap-1 items-center cursor-pointer text-blue-500"
      >
        <EyeIcon className="w-4 h-4" />
        <span>Log</span>
      </div>

      <Modal
        title={
          <Typography.Title className="font-normal" level={3}>
            Detail
          </Typography.Title>
        }
        open={modal.isOpen}
        onCancel={() => modal.onClose()}
        okButtonProps={{ className: "!hidden" }}
        okText="Tutup"
        onOk={handleClose}
      >
        <div className="overflow-x-auto">
          <pre>
            {JSON.stringify(
              typeof transactionData.transaction_log === "string"
                ? JSON.parse(transactionData.transaction_log) // parse kalau masih string
                : transactionData.transaction_log,
              null,
              2
            )}
          </pre>
        </div>
      </Modal>
    </Tooltip>
  );
}
