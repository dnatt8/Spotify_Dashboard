
import { Card, CardContent, Typography } from "@mui/material";

type KpiCardProps = {
    label: string;
    value: string;
    unit?: string;
    helperText?: string;
};

function KpiCard({ label, value, unit, helperText }: KpiCardProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {label}
                </Typography>

                <Typography variant="h4" component="div">
                    {value} {unit}
                </Typography>

                {helperText && (
                    <Typography variant="caption" color="text.secondary">
                        {helperText}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

export default KpiCard;

