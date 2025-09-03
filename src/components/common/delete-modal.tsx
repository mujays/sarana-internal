import { useDisclosure } from "@/hooks/use-disclosure";
import errorResponse from "@/lib/error";
import { Modal, Tooltip, Typography } from "antd";
import { AxiosError } from "axios";
import { TrashIcon } from "lucide-react";
import * as React from "react";

export function DeleteModal({
  onConfirm,
  text = "Apakah yakin ingin menghapus data?",
}: {
  onConfirm: () => Promise<void>;
  text?: string;
}) {
  const modal = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);
      await onConfirm();
      modal.onClose();
    } catch (error) {
      errorResponse(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Tooltip title="Hapus">
      <div
        onClick={modal.onOpen}
        className="flex gap-1 items-center cursor-pointer text-red-500"
      >
        <TrashIcon className="w-4 h-4" />
        <span>Hapus</span>
      </div>

      <Modal
        title={
          <Typography.Title className="font-normal" level={3}>
            Hapus
          </Typography.Title>
        }
        open={modal.isOpen}
        onCancel={() => modal.onClose()}
        okText="Hapus"
        okButtonProps={{
          className: "!bg-red-500",
          loading: isLoading,
        }}
        onOk={handleDelete}
      >
        <Typography.Text>{text}</Typography.Text>
      </Modal>
    </Tooltip>
  );
}
