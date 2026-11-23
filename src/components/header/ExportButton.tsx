import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

type ExportButtonProps = {
    onExport: () => void;
};

function ExportButton({ onExport }: ExportButtonProps) {
    return (
        <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={onExport}
        >
            Exportar
        </Button>
    );
}

export default ExportButton;
