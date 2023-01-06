import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { IEvent } from "../../interfaces/Event";

type Props = {
  event: IEvent;
};

export default function EventCard({
  event: { id, title, banner, date, city, uf },
}: Props) {
  return (
    <Grid>
      <Link passHref href={`/evento/${id}`}>
        <Image
          src={`/assets/${banner}`}
          width={350}
          height={180}
          alt="banner"
          className="rounded-xl"
        />
        <Box className="p-5">
          <Typography sx={{ color: "rgba(255,155,0,1)" }}>{format(date,'dd/MM/yyyy')}</Typography>
          <Typography variant="h5">{title}</Typography>
          <Typography className="mt-1">{city} - {uf}</Typography>
        </Box>
      </Link>
    </Grid>
  );
}
