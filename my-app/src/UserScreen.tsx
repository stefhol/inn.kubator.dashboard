import { Avatar, Button, Card, CardActions, CardContent, Chip, Menu, MenuItem, Modal, Stack, Typography } from "@mui/material"
import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { CalenderView } from "./CalenderView"
import { isInMeeting, getIsInMeeting } from "./authentication"
export interface UserScreenProps {
    id: string
    name: string
    srcImage: string
    mail: string
    availability: string | undefined
    preferredLanguage: string
    jobTitle: string
    businessPhones: string[]
}
export const UserScreen: React.FC<UserScreenProps> = (props) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openMenuBusinessPhone, setOpenMenuBusinessPhone] = React.useState(false);
    const [isUserInMeeting, setIsInMeeting] = React.useState(false);
    const handlecloseMenuBusinessPhone = (e: React.MouseEvent) => {
        setAnchorEl(null)
        setOpenMenuBusinessPhone(false)
    }
    React.useEffect(() => {
        getIsInMeeting(props.id).then((res) => {
            setIsInMeeting(isInMeeting(res))
        }).catch((_) => {

        })


    }, [props.id]);
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
                        {props.availability && <Chip label={props.availability} className={`${props.availability.toLowerCase()} chip fix-size-70`} />}
                        {props.preferredLanguage && <Chip label={props.preferredLanguage} className={`chip`} />}
                        {props.jobTitle && <Chip label={props.jobTitle} className={`chip`} />}
                        {isUserInMeeting && <Chip label={"Is in Meeting"} className={`chip`} />}
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

                        {props.businessPhones.map((el, i) => <MenuItem key={i}
                                href={`tel:${el}`}
                                onClick={handlecloseMenuBusinessPhone}>{el}
                            </MenuItem>)}
                    </Menu>

                    </>
                }
                <Button onClick={(e) => {
                    e.preventDefault()
                    setOpenModal(true)
                }
                }>
                    Calender
                </Button>
                <Modal
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false)
                    }}
                >
                    <CalenderView id={props.id} />
                </Modal>
            </CardActions>
        </Card>
    </>)
}