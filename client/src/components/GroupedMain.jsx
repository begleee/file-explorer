import CollapsibleGroup from "./CollapsibleGroup";
import FolderIcon from "../assets/icons/FolderIcon";
import groupByDate from "../utils/groupByDate";
import groupByName from "../utils/groupByName";
import Button from "./Button";
import fileIcon from '../assets/icons/file.png'

export default function GroupedMain({ items, groupType }) {
  const formatSize = (size) => (size ? `${(size / 1024).toFixed(1)} KB` : "");
    const groupedDocs = groupType === 'date'
        ? groupByDate(items.documents)
        : groupByName(items.documents);

    const grouped = groupType === "date"
        ? groupByDate(items.folders)
        : groupByName(items.folders);

    return (
        <div style={{ padding: "1rem" }}>
            <h3>Documents</h3>
            {Object.entries(groupedDocs).map(([groupName, groupItems]) => (
                <CollapsibleGroup
                    key={groupName}
                    title={groupName}
                    items={groupItems}
                    renderItem={(doc) => (
                        <li key={doc.name}>
                            <Button folderName={doc.name} fileType="doc">
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
                    )}
                />
            ))}

            <h3>Folders</h3>

            {Object.entries(grouped).map(([groupName, groupItems]) => (
            <CollapsibleGroup
                key={groupName}
                title={groupName}
                items={groupItems}
                renderItem={(folder) => (
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
                )}
            />
            ))}
        </div>
    );
}
