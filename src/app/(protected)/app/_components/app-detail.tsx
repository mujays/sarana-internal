import { useDisclosure } from "@/hooks/use-disclosure";
import { formatCurrency } from "@/lib/utils";
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
        {appData.transaction_fee && (
          <div className="mb-3 mt-4 pt-4 border-t">
            <p className="font-semibold text-xl">Transaksi Fee</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <p className="font-semibold">Fee Per Transaksi</p>
                <p>
                  {appData.transaction_fee?.type_per_transaction === "Nominal"
                    ? appData.transaction_fee?.fee_per_transaction
                    : appData.transaction_fee?.fee_per_transaction + " %"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Fee Withdrawl</p>
                <p>{appData.transaction_fee?.fee_per_withdrawal}</p>
              </div>
              <div>
                <p className="font-semibold">Biaya Layanan</p>
                <p>{appData.transaction_fee?.biaya_layanan}</p>
              </div>
              <div>
                <p className="font-semibold">Dibebankan kepada</p>
                <p>{appData.transaction_fee?.charged_to}</p>
              </div>
            </div>
          </div>
        )}
        {appData.plan.length > 0 && (
          <div className="mb-3 mt-4 pt-4 border-t">
            <p className="font-semibold text-xl">Plan</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <p className="font-semibold">Nama</p>
                <p>{appData.plan[0]?.name}</p>
              </div>
              <div>
                <p className="font-semibold">Durasi</p>
                <p>{appData.plan[0]?.duration}</p>
              </div>
              <div>
                <p className="font-semibold">Harga</p>
                <p>{formatCurrency(appData.plan[0]?.harga)}</p>
              </div>
              <div>
                <p className="font-semibold">Deskripsi</p>
                <p>{appData.plan[0]?.description}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Tooltip>
  );
}
