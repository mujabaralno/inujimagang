"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing"; // type-safe helper
import { convertFileToUrl } from "@/utils";

type Props = {
  value?: string;                  // current URL dari form
  onChange: (url: string) => void; // set URL ke form
  endpoint?: "imageUploader";      // ganti union sesuai routermu
};

export function FileUploader({ value, onChange, endpoint = "imageUploader" }: Props) {
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const [uploading, setUploading] = useState(false);
  const { startUpload } = useUploadThing(endpoint);

  const onDrop = useCallback(async (accepted: File[]) => {
    if (!accepted.length) return;
    const file = accepted[0];

    // preview cepat
    setPreview(convertFileToUrl(file));

    try {
      setUploading(true);
      const res = await startUpload([file]);
      const url = res?.[0]?.url;
      if (url) {
        onChange(url);
        setPreview(url);
      } else {
        console.error("UploadThing: URL tidak ada", res);
      }
    } finally {
      setUploading(false);
    }
  }, [onChange, startUpload]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    maxFiles: 1,
    noClick: true,
  });

  return (
    <div {...getRootProps()} className="relative flex h-72 items-center justify-center overflow-hidden rounded-xl border-2 border-slate-300 bg-white">
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative h-full w-full">
          <Image src={preview} alt="preview" fill className="object-cover" unoptimized={preview.startsWith("blob:")} />
          <div className="absolute bottom-3 right-3">
            <button type="button" onClick={open} className="rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium shadow">
              Ganti Foto
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 grid place-items-center bg-white/60 backdrop-blur-sm">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center text-slate-600">
          <Image src="/assets/icons/upload.svg" width={64} height={64} alt="upload" />
          <p className="mt-2 text-sm">Drag photo here</p>
          <p className="text-xs text-slate-500">SVG, PNG, JPG</p>
          <button type="button" onClick={open} className="mt-3 rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
            Select from computer
          </button>
        </div>
      )}
    </div>
  );
}
