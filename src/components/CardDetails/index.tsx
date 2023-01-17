import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { List, ListItem } from "@mui/material";
import { format } from "date-fns";
import { IEvent } from "../../interfaces/Event";
import Button from "../Button";

type Props = {
  event: IEvent;
};

export default function CardDetails({
  event: { title, datetime, address, number, city, uf, },
}: Props) {
  return (
    <div>
      <div>
        <h2 className="font-bold text-center text-xl mt-4">{title}</h2>
        <List className="ml-4">
          <ListItem className="text-sm">
            <CalendarTodayIcon sx={{ fontSize: "15px" }} className="mr-1" />
            {format(new Date(datetime), 'dd/MM/yyyy')}
          </ListItem>
          <ListItem className="text-sm">
            <AccessTimeIcon sx={{ fontSize: "15px" }} className="mr-1" />
            {format(new Date(datetime), 'HH:mm')}
          </ListItem>
          <ListItem className="text-sm">
            <LocationOnIcon sx={{ fontSize: "15px" }} className="mr-1" />
            {address} {number}, {city}, {uf}
          </ListItem>
        </List>
      </div>
      <div className="flex items-center justify-center mt-1 mb-5">
        <Button title="Comprar ingresso" size="md" />
      </div>
    </div>
  );
}
