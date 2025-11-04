import { useEffect, useState } from "react";
import PathContext from "./path-context-creator";

export default function PathProvider({ children, initialPath }) {
    const [path, setPath] = useState(initialPath);
    const [files, setFiles] = useState({ folders: [], documents: []});
    const [currentPath, setCurrentPath] = useState(initialPath);

    const loadFiles = async (newPath) => {
        const result = await window.api.getFiles(newPath);
        if(!result.error) {
            setFiles(result);
            setPath(newPath);
        }
    }

    useEffect(() => {
        loadFiles(currentPath);
    }, [currentPath]);

    const handleClick = async (docName) => {
        const fullPath = `${path}\\${docName}`;
        console.log(fullPath);
        await window.api.openFile(fullPath);
    }

    return (
        <PathContext.Provider
            value={
                {
                    path,
                    files,
                    loadFiles,
                    handleClick,
                    setPath,
                    setFiles,
                    currentPath,
                    setCurrentPath
                }
            }
        >
            {children}
        </PathContext.Provider>
    )
}

