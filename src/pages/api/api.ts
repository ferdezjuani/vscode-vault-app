import { Vault, VaultSchema } from "@/utils/interfaces";

export const createVault = async (payload: VaultSchema) => {
  let diggestPayload = {
    ...payload,
    extensions: payload.extensions.trim().split("\n"),
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vault`, {
    method: "POST",
    body: JSON.stringify(diggestPayload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create vault");
  }

  return response.json();
};

export const getVaultById = async (id: string): Promise<Vault> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vault/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vault");
  }

  return response.json();
};
