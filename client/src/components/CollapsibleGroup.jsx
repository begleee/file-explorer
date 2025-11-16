import { useState } from "react";

export default function CollapsibleGroup({ title, items, renderItem }) {
  const [open, setOpen] = useState(true);

  if (!items || items.length === 0) return null;

  return (
    <div style={{
      marginBottom: "10px",
      borderRadius: "6px"
    }}>
      <div 
        onClick={() => setOpen(o => !o)}
        style={{
          cursor: "pointer",
          borderBottom: "1px solid #2d2d2d",
          fontWeight: "bold"
        }}
      >
        {title} ({items.length})
      </div>

      {open && (
        <ul style={{ padding: "10px" }}>
          {items.map(renderItem)}
        </ul>
      )}
    </div>
  );
}
