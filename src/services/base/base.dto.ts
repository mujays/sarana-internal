export type PlanType = {
  id: number;
  app_id: number;
  name: string;
  duration_finance: number;
  description: string;
  harga: number;
  duration: number;
  app: AppType;
  created_at: string;
  updated_at: string;
};

export type AppType = {
  id: number;
  kode: string;
  deskripsi: string;
  name: string;
  jenis: string;
  created_at: string;
  updated_at: string;
};

export type TransactionType = {
  id: number;
  client_id: number;
  transaction_id: string;
  total: number;
  net_payment: number;
  status: string;
  transaction_log: string;
  client: ClientType;
};

export type SettlementType = {
  id: number;
  client_id: number;
  by: string;
  jumlah: number;
  tujuan: string;
  xendit_payout_id: string;
  xendit_payout_refences_id: null | string;
  status: string;
  client: ClientType;
  created_at: string;
  updated_at: string;
};

export type ClientType = {
  id: number;
  nama: string;
  email: string;
  type: string;
  status: string;
  saldo: number;
  saldo_yang_bisa_ditarik: number;
  alamat: string;
  no_telp_pic: string;
  pic: string;
  email_pic: string;
  norek: string;
  bank: string;
  xendit_customer_id: string;
  xendit_customer_secret: string | null;
  xendit_token: string | null;
  xendit_bank_code: string | null;
  created_at: string;
  updated_at: string;
};

export type WithdrawalType = {
  id: number;
  client_id: number;
  status: string;
  by: string;
  url: string;
  jumlah: number;
  biaya_penarikan: number;
  ditransfer_oleh: string | null;
  tanggal_transfer: string | null;
  created_at: string;
  updated_at: string;
};
