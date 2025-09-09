import { useDisclosure } from "@/hooks/use-disclosure";
import { ClientType } from "@/services/base/base.dto";
import { Modal, Tooltip, Typography } from "antd";
import { EyeIcon } from "lucide-react";

export function ClientDetail({ clientData }: { clientData: ClientType }) {
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
            <p className="font-semibold">Nama Client</p>
            <p>{clientData?.nama}</p>
          </div>
          <div>
            <p className="font-semibold">Xendit ID</p>
            <p>{clientData?.xendit_customer_id}</p>
          </div>
          <div>
            <p className="font-semibold">Email</p>
            <p>{clientData?.email || "-"}</p>
          </div>
          <div>
            <p className="font-semibold">PIC</p>
            <p>{clientData?.pic || "-"}</p>
          </div>
          <div>
            <p className="font-semibold">Email PIC</p>
            <p>{clientData?.email_pic || "-"}</p>
          </div>
          <div>
            <p className="font-semibold">Nomor Rekening</p>
            <p>{clientData?.norek || "-"}</p>
          </div>
          <div>
            <p className="font-semibold">Nomor Telepon</p>
            <p>{clientData?.no_telp_pic || "-"}</p>
          </div>
          <div>
            <p className="font-semibold">Saldo</p>
            <p>{clientData?.saldo || "-"}</p>
          </div>
          <div>
            <p className="font-semibold">Saldo yang bisa ditarik</p>
            <p>{clientData?.saldo_yang_bisa_ditarik || "-"}</p>
          </div>
        </div>
      </Modal>
    </Tooltip>
  );
}
