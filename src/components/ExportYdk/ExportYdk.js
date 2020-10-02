import React from "react";
import * as FileSaver from "file-saver";
export const ExportYdk = ({ cards }) => {
  const exportToYdk = () => {
    var blob = new Blob(["#main\n", cards]);
    FileSaver.saveAs(blob, "deck.ydk");
  };
  return (
    <button
      onClick={exportToYdk}
      style={{ marginTop: "20px", padding: "10px 40px" }}
    >
      Export
    </button>
  );
};
