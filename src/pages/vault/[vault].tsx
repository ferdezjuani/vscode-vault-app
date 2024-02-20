import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { getVaultById } from "../api/api";
import { IExtensionResponse, IResults } from "@/utils/interfaces";
import ExtensionCard from "@/components/ExtensionCard";
import Head from "next/head";

const VaultDetails = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery(
    ["vault", router.query.vault],
    () => getVaultById(router.query.vault as string),
    {
      enabled: !!router.query.vault,
    }
  );

  const { data: marketplaceResponse, isLoading: isLoadingExtensions } =
    useQuery<IExtensionResponse>(
      ["extensions"],
      async () => {
        const response = await fetch(
          "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json;api-version=3.0-preview.1",
              "Accept-Enconding": "gzip, deflate, br",
            },
            body: JSON.stringify({
              assetTypes: null,
              filters: [
                {
                  criteria: data?.extensions.map((extension: string) => {
                    return { filterType: 7, value: extension };
                  }),
                },
              ],
              flags: 2,
            }),
          }
        );

        return response.json();
      },
      { enabled: !!data }
    );

  if (!data || !marketplaceResponse || isLoadingExtensions || isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100 flex-col items-center justify-center">
        <Head>
          <title>VSCode Vault 🚀</title>
        </Head>
        <svg
          aria-hidden="true"
          className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 sm:w-20 sm:h-20"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{data.name} - VSCode Vault</title>
      </Head>
      <Navbar title={data.name} avatar={data.image} />
      <div className="flex justify-center bg-gray-100 min-h-screen">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 py-6 px-2 gap-2">
          {marketplaceResponse.results[0].extensions.map((extension) => (
            <ExtensionCard
              key={extension.displayName}
              displayName={extension.displayName}
              image={
                extension.versions[0].files.find(
                  (file) =>
                    file.assetType ===
                    "Microsoft.VisualStudio.Services.Icons.Default"
                )?.source
              }
              publisher={extension.publisher.publisherName}
              shortDescription={extension.shortDescription}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default VaultDetails;
