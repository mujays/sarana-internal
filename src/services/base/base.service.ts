/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosConfig from "@/configs/axios";
import { BaseResponseDto, BaseResponsePaginate } from "@/types/response";
import {
  AppType,
  ClientType,
  PlanType,
  SettlementType,
  SubscribeType,
  TransactionType,
  WithdrawalType,
} from "./base.dto";

const BaseService = {
  getSubs: async (params: any) => {
    const response = await axiosConfig.get<
      BaseResponsePaginate<SubscribeType[]>
    >("/admin/subsription", {
      params,
    });
    return response.data;
  },
  getTransaction: async (params: any) => {
    const response = await axiosConfig.get<
      BaseResponsePaginate<TransactionType[]>
    >("/admin/finance/transaction", {
      params,
    });
    return response.data;
  },
  getSettlement: async (params: any) => {
    const response = await axiosConfig.get<
      BaseResponsePaginate<SettlementType[]>
    >("/admin/settlement", {
      params,
    });
    return response.data;
  },
  getSettlementOne: async (id: number) => {
    const response = await axiosConfig.get<BaseResponseDto<SettlementType>>(
      `/admin/settlement/${id}`
    );
    return response.data;
  },
  addSettlement: async (payload: any) => {
    const response = await axiosConfig.post<BaseResponseDto<SettlementType>>(
      "/admin/settlement",
      payload
    );
    return response.data;
  },
  updateSettlement: async (settlementId: number, payload: any) => {
    const response = await axiosConfig.put<BaseResponseDto<SettlementType>>(
      `/admin/settlement/${settlementId}`,
      payload
    );
    return response.data;
  },
  deleteSettlement: async (settlementId: number) => {
    const response = await axiosConfig.delete<BaseResponseDto<SettlementType>>(
      `/admin/settlement/${settlementId}`
    );
    return response.data;
  },
  getPlan: async (params: any) => {
    const response = await axiosConfig.get<BaseResponsePaginate<PlanType[]>>(
      "/plan",
      {
        params,
      }
    );
    return response.data;
  },
  addPlan: async (payload: any) => {
    const response = await axiosConfig.post<BaseResponseDto<PlanType>>(
      "/admin/plan",
      payload
    );
    return response.data;
  },
  updatePlan: async (planId: number, payload: any) => {
    const response = await axiosConfig.put<BaseResponseDto<PlanType>>(
      `/admin/plan/${planId}`,
      payload
    );
    return response.data;
  },
  deletePlan: async (planId: number) => {
    const response = await axiosConfig.delete<BaseResponseDto<PlanType>>(
      `/admin/plan/${planId}`
    );
    return response.data;
  },
  getOnePlan: async (planId: number, params?: any) => {
    const response = await axiosConfig.get<BaseResponseDto<PlanType>>(
      `/plan/${planId}`,
      {
        params,
      }
    );
    return response.data;
  },
  getClient: async (params: any) => {
    const response = await axiosConfig.get<BaseResponsePaginate<ClientType[]>>(
      "/admin/client",
      {
        params,
      }
    );
    return response.data;
  },
  addClient: async (payload: any) => {
    const response = await axiosConfig.post<BaseResponseDto<ClientType>>(
      "/admin/client",
      payload
    );
    return response.data;
  },
  updateClient: async (clientId: number, payload: any) => {
    const response = await axiosConfig.put<BaseResponseDto<ClientType>>(
      `/admin/client/${clientId}`,
      payload
    );
    return response.data;
  },
  deleteClient: async (clientId: number) => {
    const response = await axiosConfig.delete<BaseResponseDto<ClientType>>(
      `/client/${clientId}`
    );
    return response.data;
  },
  getOneClient: async (clientId: number, params?: any) => {
    const response = await axiosConfig.get<BaseResponseDto<ClientType>>(
      `/client/${clientId}`,
      {
        params,
      }
    );
    return response.data;
  },
  getWithdrawal: async (params: any) => {
    const response = await axiosConfig.get<
      BaseResponsePaginate<WithdrawalType[]>
    >("/admin/withdrawal", {
      params,
    });
    return response.data;
  },
  addWithdrawal: async (payload: any) => {
    const response = await axiosConfig.post<BaseResponseDto<WithdrawalType>>(
      "/admin/withdrawal",
      payload
    );
    return response.data;
  },
  updateWithdrawal: async (withdrawalId: number, payload: any) => {
    const response = await axiosConfig.put<BaseResponseDto<WithdrawalType>>(
      `/admin/withdrawal/${withdrawalId}`,
      payload
    );
    return response.data;
  },
  deleteWithdrawal: async (withdrawalId: number) => {
    const response = await axiosConfig.delete<BaseResponseDto<WithdrawalType>>(
      `/admin/withdrawal/${withdrawalId}`
    );
    return response.data;
  },
  getOneWithdrawal: async (withdrawalId: number, params?: any) => {
    const response = await axiosConfig.get<BaseResponseDto<WithdrawalType>>(
      `/withdrawal/${withdrawalId}`,
      {
        params,
      }
    );
    return response.data;
  },
  getApp: async (params: any) => {
    const response = await axiosConfig.get<BaseResponsePaginate<AppType[]>>(
      "/admin/app",
      {
        params,
      }
    );
    return response.data;
  },
  addApp: async (payload: any) => {
    const response = await axiosConfig.post<BaseResponseDto<AppType>>(
      "/admin/app",
      payload
    );
    return response.data;
  },
  updateApp: async (appId: number, payload: any) => {
    const response = await axiosConfig.put<BaseResponseDto<AppType>>(
      `/admin/app/${appId}`,
      payload
    );
    return response.data;
  },
  deleteApp: async (appId: number) => {
    const response = await axiosConfig.delete<BaseResponseDto<AppType>>(
      `/admin/app/${appId}`
    );
    return response.data;
  },
  getOneApp: async (appId: number, params?: any) => {
    const response = await axiosConfig.get<BaseResponseDto<AppType>>(
      `/app/${appId}`,
      {
        params,
      }
    );
    return response.data;
  },
};

export default BaseService;
