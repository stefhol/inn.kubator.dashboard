import { Avatar, Button, Card, CardActions, CardContent, Chip, Menu, MenuItem, Stack, Typography } from "@mui/material"
import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
export interface UserScreenProps {
    name: string
    srcImage: string
    mail: string
    availability: string | undefined
    preferredLanguage: string
    jobTitle: string
    businessPhones: string[]
}
export const UserScreen: React.FC<UserScreenProps> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openMenuBusinessPhone, setOpenMenuBusinessPhone] = React.useState(false);
    const handlecloseMenuBusinessPhone = (e: React.MouseEvent) => {
        setAnchorEl(null)
        setOpenMenuBusinessPhone(false)
    }
    return (<>

        <Card sx={{ width: 300 }} className="card">
            <CardContent>
                <Stack direction="row" spacing={1} justifyContent={"space-around"}>
                    <Stack alignItems={"center"}>
                        <Avatar alt={props.name} src={props.srcImage} />
                        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                            {props.name}
                        </Typography>
                    </Stack>
                    <Stack spacing={0.2} alignSelf={"end"}>
                        {props.availability && <Chip label={props.availability} />}
                        {props.preferredLanguage && <Chip label={props.preferredLanguage} />}
                        {props.jobTitle && <Chip label={props.jobTitle} />}
                    </Stack>

                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small" href={`mailto:${props.mail}`}>Email</Button>
                {(props?.businessPhones?.length > 0) &&
                    <><Button
                        id="menu-button"
                        aria-haspopup="true"
                        onClick={(ev) => {
                            setOpenMenuBusinessPhone(true)
                            setAnchorEl(ev.currentTarget);
                        }}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Phone
                    </Button>
                        <Menu open={openMenuBusinessPhone} anchorEl={anchorEl}
                            onClose={handlecloseMenuBusinessPhone}
                        >

                            {props.businessPhones.map(el => <MenuItem
                                href={`tel:${el}`}
                                onClick={handlecloseMenuBusinessPhone}>{el}
                            </MenuItem>)}
                        </Menu>
                    </>
                }
            </CardActions>
        </Card>
    </>)
}