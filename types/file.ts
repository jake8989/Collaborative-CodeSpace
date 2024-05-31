export interface fileType {
  file: {
    content: string;
    extention: string;
  };
}
export interface fileTypeProps {
  file: fileType | null;
  setFileDefault: (file: fileType) => void;
  defaultFileSetting: () => void;
}
