import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { List, ListItem } from "@mui/material";
import { IEvent } from "../../interfaces/Event";
import Button from "../Button";
import { format } from "date-fns";

type Props = {
  event: IEvent;
};

export default function CardDetails({
  event: { title, date, location },
}: Props) {
  return (
    <div>
      <div>
        <h2 className="font-bold text-center text-xl mt-4">{title}</h2>
        <List className="ml-4">
          <ListItem className="text-sm">
            <CalendarTodayIcon sx={{ fontSize: "15px" }} className="mr-1" />
            {format(date, 'dd/MM/yyyy')}
          </ListItem>
          <ListItem className="text-sm">
            <AccessTimeIcon sx={{ fontSize: "15px" }} className="mr-1" />
            {format(date, 'HH:mm')}
          </ListItem>
          <ListItem className="text-sm">
            <LocationOnIcon sx={{ fontSize: "15px" }} className="mr-1" />
            {location}
          </ListItem>
        </List>
      </div>
      <div className="flex items-center justify-center mt-1 mb-5">
        <Button title="Comprar ingresso" size="md" />
      </div>
    </div>
  );
}
