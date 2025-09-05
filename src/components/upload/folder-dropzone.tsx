
import Chips from "@/components/ui/chips";
import Icons from "@/constants/icons";
import React, { useCallback, useRef, useState } from "react";

type FileInfo = {
  file: File;
  path: string;
};

async function readFileFromFileEntry(fileEntry: any): Promise<File> {
  return new Promise((resolve, reject) => {
    fileEntry.file(
      (file: File) => resolve(file),
      (err: any) => reject(err)
    );
  });
}

function readAllEntries(reader: any): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const entries: any[] = [];
    const readChunk = () => {
      reader.readEntries((results: any[]) => {
        if (!results.length) return resolve(entries);
        entries.push(...results);
        readChunk();
      }, reject);
    };
    readChunk();
  });
}

async function traverseEntry(entry: any, path = ""): Promise<FileInfo[]> {
  if (entry.isFile) {
    const file = await readFileFromFileEntry(entry);
    return [{ path: path + file.name, file }];
  }
  if (entry.isDirectory) {
    const dirReader = entry.createReader();
    const entries = await readAllEntries(dirReader);
    let results: FileInfo[] = [];
    for (const e of entries) {
      const nested = await traverseEntry(e, path + entry.name + "/");
      results = results.concat(nested);
    }
    return results;
  }
  return [];
}

export default function FolderDropzone() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  // const [uploading, setUploading] = useState(false);
  const [uploadResult] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click()
  };

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const items = e.dataTransfer?.items;
    let collected: FileInfo[] = [];

    if (items && items.length) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const entry = (item as any).webkitGetAsEntry?.();
        if (entry) {
          const found = await traverseEntry(entry, "");
          collected = collected.concat(found);
        } else if (item.kind === "file") {
          const f = item.getAsFile();
          if (f) collected.push({ path: f.name, file: f });
        }
      }
    }
    setFiles(collected);
  }, []);

  const handleInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const list: FileInfo[] = [];
      const fileList = e.target.files;
      if (fileList) {
        for (let i = 0; i < fileList.length; i++) {
          const f = fileList[i];
          if (f && f.type !== "") {
            const path = (f as any).webkitRelativePath || f.name;
            list.push({ path, file: f });
          }
        }
      }
      setFiles(list);
    },
    []
  );

  const countStats = () => {
    const actualFiles = files.filter((f) => f.file.type !== "");
    const folders = new Set<string>();
    let excel = 0,
      doc = 0,
      image = 0,
      pdf = 0;

    actualFiles.forEach(({ path, file }) => {
      const parts = path.split("/");
      if (parts.length > 1) folders.add(parts.slice(0, -1).join("/"));

      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      if (["xls", "xlsx"].includes(ext)) {
        excel++;
      } else if (["doc", "docx"].includes(ext)) {
        doc++;
      } else if (["png", "jpg", "jpeg", "gif", "bmp", "webp"].includes(ext)) {
        image++;
      } else if (ext === "pdf") {
        pdf++;
      }
    });

    const other = actualFiles.length - (excel + doc + image + pdf);

    return {
      folderCount: folders.size,
      excel,
      doc,
      image,
      pdf,
      other,
      totalFiles: actualFiles.length,
    };
  };

  // const upload = async () => {
  //   if (!files.length) return;
  //   setUploading(true);
  //   const formData = new FormData();
  //   files.forEach(({ path, file }) => {
  //     formData.append("files", file, path);
  //   });
  //   try {
  //     const resp = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     if (!resp.ok) throw new Error("Upload failed");
  //     setUploadResult("Upload successful");
  //   } catch (err: any) {
  //     setUploadResult("Error: " + err.message);
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const stats = countStats();

  return (
    <div className='w-full mx-auto'>
      <div
        onDrop={handleDrop}
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
        className='border border-dashed border-[#7D7E8E4D] p-6 rounded mb-4 bg-[#F5F5F7] w-full flex flex-col justify-center items-center h-[272px] cursor-pointer'>
        <Icons.uploadCloud />
        <p className='font-maven text-xl font-normal text-[#2F2F30] text-center'>
          Drag file or folder or click here to upload
        </p>
        <div className='relative mt-2'>
          <input
            type='file'
            webkitdirectory=''
            multiple
            ref={inputRef}
            onChange={handleInput}
            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
          />
        </div>
        {files.length > 0 && (
          <div className='mb-4 text-sm flex items-center gap-2 flex-wrap justify-center'>
            <div>
              <Chips
                label={`${stats.folderCount} Folders`}
                icon={<Icons.folder />}
              />{" "}
            </div>
            <div>
              <Chips
                label={`${stats.totalFiles} Files`}
                icon={<Icons.file />}
              />
            </div>
            <div>
              <Chips
                label={`${stats.excel} Spreadsheets`}
                icon={<Icons.excel />}
              />
            </div>
            <div>
              <Chips label={`${stats.doc} Docs`} icon={<Icons.docs />} />
            </div>
            <div>
              <Chips label={`${stats.image} Images`} icon={<Icons.image />} />
            </div>
            <div>
              <Chips label={`${stats.pdf} PDFs`} icon={<Icons.pdf />} />
            </div>
            <div>
              <Chips
                label={`${stats.other} Others`}
                icon={<Icons.otherDoc />}
              />
            </div>
          </div>
        )}
      </div>

      {/* <button
        disabled={!files.length || uploading}
        onClick={upload}
        className='bg-blue-500 text-white px-3 py-1 rounded'>
        {uploading ? "Uploading..." : "Upload All"}
      </button> */}

      {uploadResult && <div className='mt-2 text-sm'>{uploadResult}</div>}
    </div>
  );
}
