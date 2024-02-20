import type { OurFileRouter } from "@/server/uploadthings";
import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
   
   
  export const UploadButton = generateUploadButton<OurFileRouter>();
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();