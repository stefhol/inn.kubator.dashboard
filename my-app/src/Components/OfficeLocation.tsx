import { Card, Stack, Typography } from "@mui/material"

export interface OfficeLocationProps {
    title: string | null | undefined;
    children: any
}
export const OfficeLocation: React.FC<OfficeLocationProps> = (props) => {

    return (<>
        <Card elevation={2} className="office-location" title={props.title == null ? "" : props.title}>
            <Stack>
                <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                    {props.title == null ? "" : props.title}
                </Typography>

                {props.children}
            </Stack>
        </Card>
    </>)
}