import { useDisclosure } from "@/hooks/use-disclosure";
import { AppType } from "@/services/base/base.dto";
import { Modal, Tooltip, Typography } from "antd";
import { EyeIcon } from "lucide-react";

export function AppDetail({ appData }: { appData: AppType }) {
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
        <span>Detail</span>
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
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <p className="font-semibold">Nama App</p>
            <p>{appData?.name}</p>
          </div>
          <div>
            <p className="font-semibold">ID App</p>
            <p>{appData?.id}</p>
          </div>
          <div>
            <p className="font-semibold">Deskripsi</p>
            <p>{appData?.deskripsi || "-"}</p>
          </div>
        </div>
      </Modal>
    </Tooltip>
  );
}
