import FolderIcon from "../assets/icons/FolderIcon";
import Button from "./Button";
import fileIcon from '../assets/icons/file.png'


export default function Main({ items }) {
  const formatSize = (size) => (size ? `${(size / 1024).toFixed(1)} KB` : "");
  return (
    <div style={{paddingInline: '1rem'}}>
      <ul>
        <ul>
          <h5 style={{padding: '.4rem'}}>Documents</h5>
          {items.documents.map(doc =>(
            <li key={doc.name}>
              <Button docName={doc.name} fileType="doc">
                <span>
                  <img style={{width: "1rem"}} src={fileIcon} alt="" />
                </span>
                <span style={{ flex: 1 }}>{doc.name}</span>
                <span style={{ width: "100px", textAlign: "right" }}>
                  {formatSize(doc.size)}
                </span>
                <span style={{ width: "120px", textAlign: "right" }}>
                  {doc.modified.toLocaleDateString()}
                </span>
              </Button>
            </li>
          ))}
        </ul>
        <ul>
          <h5 style={{padding: '.4rem'}}>Folders</h5>
          {items.folders.map(folder => (
            <li key={folder.name}>
              <Button folderName={folder.name}>
                <span>
                  <FolderIcon width="1rem" height="1rem"/>
                </span>
                <span style={{ flex: 1 }}>{folder.name}</span>
                <span style={{ width: "120px", textAlign: "right" }}>
                  {folder.modified.toLocaleDateString()}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      </ul>
    </div>
  )
}
