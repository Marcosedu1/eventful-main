import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { IEvent } from "../../interfaces/Event";

type Props = {
  event: IEvent;
};

export default function EventCard({
  event: { id, title, banner, date, location },
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
          <Typography sx={{ color: "rgba(255,155,0,1)" }}>date</Typography>
          <Typography variant="h5">{title}</Typography>
          <Typography className="mt-1">{location}</Typography>
        </Box>
      </Link>
    </Grid>
  );
}
