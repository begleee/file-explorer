import { useContext } from 'react';
import './Button.css'
import PathContext from '../store/path-context-creator';

function Button({ children, docName = "\\", fileType, folderName = '' }) {
  const { handleClick, setPath, setCurrentPath, currentPath } = useContext(PathContext);

  function handleFolderClick(folder, e) {
    e.preventDefault();
    setPath(currentPath + folder + "\\");
    setCurrentPath(currentPath + folder + "\\");
}

  return (
    <button onClick={(e) => {fileType === "doc" ? handleClick(docName) : handleFolderClick(folderName, e)}} className="file-button">
        {children}
    </button>
  )
}

export default Button;