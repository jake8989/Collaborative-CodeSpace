import { fileType, fileTypeProps } from '../types/file';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

const FileContext = createContext<fileTypeProps | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [file, setFile] = useState<fileType | null>(null);
  useEffect(() => {
    const storedFile = localStorage.getItem('file');
    if (storedFile) {
      setFile(JSON.parse(storedFile));
    }
  }, []);

  const setFileDefault = (file: fileType) => {
    setFile(file);
    localStorage.setItem('file', JSON.stringify(file));
  };

  const defaultFileSetting = () => {
    setFile(null);
    localStorage.removeItem('file');
  };

  return (
    <FileContext.Provider value={{ file, setFileDefault, defaultFileSetting }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('Something not good:(');
  }
  return context;
};
