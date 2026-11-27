
import {
    Box,
    Typography,
    IconButton,
    Tooltip,
    useScrollTrigger
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import ExportButton from "./ExportButton";

type DashboardHeaderProps = {
    title: string;
    subtitle: string;
    onExport: () => void;
    onOpenMenu: () => void;
};

function DashboardHeader({
    title,
    subtitle,
    onExport,
    onOpenMenu
}: DashboardHeaderProps) {

    // Detectar cuando se superan 80px de scroll
    const compact = useScrollTrigger({
        disableHysteresis: true,
        threshold: 80
    });

    return (
        <Box
            component="header"
            sx={{
                position: "sticky",
                top: 0,
                zIndex: 1100,
                width: "100%",
                bgcolor: "#16171d",
                color: "#ffffff",

                px: { xs: 1.5, md: 2 },
                py: compact
                    ? 1
                    : { xs: 1.5, md: 2 },

                borderBottom: compact
                    ? "1px solid rgba(255,255,255,0.12)"
                    : "1px solid transparent",

                boxShadow: compact
                    ? "0 4px 16px rgba(0,0,0,0.3)"
                    : "none",

                transition:
                    "padding 0.25s ease, box-shadow 0.25s ease"
            }}
        >
            {/* Contenedor principal */}
            <Box
                sx={{
                    display: "flex",

                    flexDirection: compact
                        ? "row"
                        : { xs: "column", md: "row" },

                    alignItems: compact
                        ? "center"
                        : { xs: "stretch", md: "center" },

                    columnGap: 2,
                    rowGap: 1.5,

                    minHeight: compact ? 48 : undefined,

                    transition: "all 0.25s ease"
                }}
            >
                {/* Zona del menú y título */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flex: 1,
                        minWidth: 0,
                        gap: { xs: 1, md: 0 }
                    }}
                >
                    {/* Menú móvil */}
                    <IconButton
                        aria-label="Abrir menú"
                        onClick={onOpenMenu}
                        sx={{
                            display: {
                                xs: "inline-flex",
                                md: "none"
                            },
                            color: "#ffffff",
                            flexShrink: 0
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Título y descripción */}
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,

                            textAlign: compact
                                ? "left"
                                : {
                                    xs: "left",
                                    md: "center"
                                }
                        }}
                    >
                        <Typography
                            component="h1"
                            sx={{
                                fontSize: compact
                                    ? {
                                        xs: "1rem",
                                        md: "1.25rem"
                                    }
                                    : {
                                        xs: "1.45rem",
                                        sm: "1.8rem",
                                        md: "2rem"
                                    },

                                fontWeight: compact ? 600 : 500,
                                lineHeight: 1.25,

                                color: "#ffffff",

                                whiteSpace: compact
                                    ? "nowrap"
                                    : "normal",

                                overflow: "hidden",
                                textOverflow: "ellipsis",

                                m: 0,

                                transition:
                                    "font-size 0.25s ease"
                            }}
                        >
                            {title}
                        </Typography>

                        {/* Descripción solo en modo normal */}
                        {!compact && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#b6bdcc",
                                    fontSize: {
                                        xs: "0.85rem",
                                        md: "0.95rem"
                                    },
                                    mt: 0.5
                                }}
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* Zona de exportación */}
                <Box
                    sx={{
                        flexShrink: 0,

                        alignSelf: compact
                            ? "center"
                            : {
                                xs: "flex-start",
                                md: "center"
                            },

                        ml: compact
                            ? 0
                            : { xs: 5, md: 0 }
                    }}
                >
                    {compact ? (
                        <Tooltip title="Exportar">
                            <IconButton
                                aria-label="Exportar"
                                onClick={onExport}
                                sx={{
                                    color: "#ffffff",

                                    "&:hover": {
                                        bgcolor:
                                            "rgba(255,255,255,0.12)"
                                    }
                                }}
                            >
                                <FileDownloadIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <ExportButton
                            onExport={onExport}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default DashboardHeader;
