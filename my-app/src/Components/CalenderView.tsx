import { Card, CardContent, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import React from "react";
import { getListEvents } from "../authentication";
import { CalenderEventValue } from "../interfaces/CalenderEvent";
import { format, formatDuration, getUnixTime, intervalToDuration } from 'date-fns'
export interface CalenderViewProps {
    id: string
}
export const CalenderView: React.FC<CalenderViewProps> = (props) => {
    const [data, setData] = React.useState([] as CalenderEventValue[]);
    React.useEffect(() => {
        getListEvents(props.id).then(res => {
            setData(res.value)
            console.log(res);
        })

        return () => {

        }
    }, []);
    return (<>
        <Card>
            <CardHeader>
                Calender
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >name</TableCell>
                                <TableCell >start</TableCell>
                                <TableCell >end</TableCell>
                                <TableCell >duration</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    className={(getUnixTime(new Date(row.start.dateTime)) < getUnixTime(new Date()) && getUnixTime(new Date()) < getUnixTime(new Date(row.end.dateTime))) ? "active" : ""}
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.subject}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {format(new Date(row.start.dateTime), "dd.MM-yyyy hh:mm")}
                                    </TableCell><TableCell component="th" scope="row">
                                        {format(new Date(row.end.dateTime), "dd.MM-yyyy hh:mm")}
                                    </TableCell><TableCell component="th" scope="row">
                                        {formatDuration(intervalToDuration({
                                            start: new Date(row.start.dateTime),
                                            end: new Date(row.end.dateTime)
                                        }))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    </>)
}