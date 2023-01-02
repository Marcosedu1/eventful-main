import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { List, ListItem } from "@mui/material";
import Button from "../Button";

export default function CardDetails() {
  return (
    <div>
      <div>
        <h2 className="font-bold text-center text-xl mt-4">Titulo Evento</h2>
        <List className="ml-4">
          <ListItem className="text-sm">
            <CalendarTodayIcon sx={{ fontSize: "15px" }} className="mr-1" />
            Data
          </ListItem>
          <ListItem className="text-sm">
            <AccessTimeIcon sx={{ fontSize: "15px" }} className="mr-1" />
            Horario
          </ListItem>
          <ListItem className="text-sm">
            <LocationOnIcon sx={{ fontSize: "15px" }} className="mr-1" />
            Localização
          </ListItem>
        </List>
      </div>
      <div className="flex items-center justify-center mt-1 mb-5">
        <Button title="Comprar ingresso" size="md" />
      </div>
    </div>
  );
}
