import Navbar from "@/components/Navbar";
import { VaultSchema } from "@/utils/interfaces";
import { UploadButton } from "@/utils/uploadthing";
import { FieldApi, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { z } from "zod";
import { createVault } from "./api/api";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <span className="pl-2 text-xs text-red-500 font-semibold">
          {field.state.meta.touchedErrors}
        </span>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter();
  const { mutate, isLoading: isCreatingVault } = useMutation(createVault, {
    onSuccess(data) {
      router.push(`/vault/${data._id}`);
    },
  });
  const form = useForm<VaultSchema, any>({
    defaultValues: {
      name: "",
      extensions:
        "codeium.codeium\neamodio.gitlens\nastro-build.astro-vscode\n",
    },
    onSubmit: async ({ value }) => {
      let newValues = { ...value, image: imageUrl };
      mutate(newValues);
    },
    validatorAdapter: zodValidator,
  });

  return (
    <>
      <Head>
        <title>VSCode Vault 🚀</title>
      </Head>
      <Navbar title="VSCode Vault" />

      <main
        className={`flex min-h-screen flex-col items-center justify-between bg-gray-100 p-8 ${inter.className} sm:p-2`}
      >
        <form.Provider>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <div className="flex flex-col items-center justify-center py-4">
              <h1 className="text-lg font-light text-black sm:text-3xl">
                Share your extensions for Visual Studio Code 🚀
              </h1>
              <div className="w-full flex flex-col">
                <form.Field
                  name="name"
                  validators={{
                    onChange: z
                      .string()
                      .min(
                        3,
                        "Extension list name must be at least 3 characters"
                      )
                      .max(
                        50,
                        "Extension list name must be less than 50 characters"
                      ),
                  }}
                  // eslint-disable-next-line react/no-children-prop
                  children={(field) => {
                    return (
                      <>
                        <label
                          htmlFor={field.name}
                          className="items-start justify-start text-black py-4 sm:text-base"
                        >
                          1. Choose the name of your list
                        </label>
                        <input
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="For example: John's extensions list"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </>
                    );
                  }}
                />

                <ol className="items-start justify-start text-black py-4 sm:text-base">
                  2. Choose an image (optional)
                </ol>
                <div className="flex flex-row items-center justify-center gap-4">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setIsUploading(false);
                      setImageUrl(res[0].serverData.url);
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                    onUploadProgress={() => {
                      setIsUploading(true);
                    }}
                    className="py-2"
                  />
                  {imageUrl && (
                    <>
                      <Image
                        src={imageUrl}
                        alt="Uploaded image"
                        width={128}
                        height={128}
                      />
                      <button
                        className="text-red-500"
                        onClick={() => setImageUrl("")}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
                <ol className="items-start justify-start text-black py-4 sm:text-base">
                  3. Run the following command in your terminal
                </ol>
                <pre className="w-full rounded-lg text-sm p-4 bg-gray-50 text-gray-800">
                  <code>code --list-extensions</code>
                </pre>
              </div>
              <div className="w-full py-4">
                <form.Field
                  name="extensions"
                  validators={{
                    onChange: z.string().refine(
                      (value) => {
                        const extensionesArray = value.trim().split("\n");
                        return extensionesArray.every((extension) =>
                          /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(extension)
                        );
                      },
                      {
                        message:
                          "The format must be a list of extensions with the format 'author.extension'.",
                      }
                    ),
                  }}
                  // eslint-disable-next-line react/no-children-prop
                  children={(field) => {
                    return (
                      <>
                        <label
                          htmlFor={field.name}
                          className="block mb-2 text-gray-900"
                        >
                          4. Paste your list of extensions here
                        </label>
                        <textarea
                          rows={10}
                          className="w-full block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Please use the multiline editor."
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </>
                    );
                  }}
                />

                <div className="flex items-center justify-center py-2">
                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    // eslint-disable-next-line react/no-children-prop
                    children={([canSubmit, isSubmitting]) => (
                      <button
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg disabled:bg-gray-300"
                        disabled={!canSubmit || isUploading || isSubmitting}
                      >
                        {isSubmitting || isCreatingVault
                          ? "Creating..."
                          : "Create and share your list!"}
                      </button>
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </form.Provider>
      </main>
    </>
  );
}
