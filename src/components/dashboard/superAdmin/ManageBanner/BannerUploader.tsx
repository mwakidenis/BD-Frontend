"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TImageUploader = {
  label?: string;
  className?: string;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  maxFiles?: number;
};

const BannerImageUploader = ({
  label = "Upload Images",
  className,
  setImageFiles,
  setImagePreview,
  maxFiles = 3,
}: TImageUploader) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    // Check if adding these files would exceed the maximum
    setImageFiles((prevFiles) => {
      const remainingSlots = maxFiles - prevFiles.length;
      const filesToAdd = files.slice(0, remainingSlots);

      if (filesToAdd.length < files.length) {
        // Show a warning if some files were ignored
        console.warn(
          `Only ${filesToAdd.length} files were added. Maximum ${maxFiles} files allowed.`
        );
      }

      return [...prevFiles, ...filesToAdd];
    });

    // Generate previews for the files
    setImagePreview((prevPreviews) => {
      const remainingSlots = maxFiles - prevPreviews.length;
      const filesToProcess = files.slice(0, remainingSlots);

      const newPreviews: string[] = [];
      let processedCount = 0;

      filesToProcess.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          processedCount++;

          // Update state only when all files are processed
          if (processedCount === filesToProcess.length) {
            setImagePreview((prev) => [...prev, ...newPreviews]);
          }
        };

        reader.readAsDataURL(file);
      });

      return prevPreviews; // Return current state, will be updated in the reader.onloadend
    });

    // Clear the input value to allow re-uploading the same files
    event.target.value = "";
  };

  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageChange}
      />
      <label
        htmlFor="image-upload"
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition rounded-lg"
      >
        <div className="flex flex-col items-center gap-2">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span>{label}</span>
          <span className="text-xs text-gray-400">
            Select up to {maxFiles} images
          </span>
        </div>
      </label>
    </div>
  );
};

export default BannerImageUploader;
