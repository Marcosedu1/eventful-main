import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { IEvent } from "../../interfaces/Event";
import Button from "../Button";

type Props = {
  events: IEvent[];
};

export default function Banner({ events }: Props) {
  const { banner, title, id } =
    events[Math.floor(Math.random() * events.length)];

  return (
    <Grid container className="mb-10 rounded-2xl" bgcolor="rgba(0,0,0,.03)">
      <Grid item xs={8}>
        <Image
          src={`/assets/${banner}`}
          width={750}
          height={200}
          alt="banner"
          className="rounded-xl"
        />
      </Grid>
      <Grid
        container
        gap={1}
        xs={4}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Typography variant="h5">
          {title}
        </Typography>
        <Link href={`/evento/${id}`} passHref>
          <Button title="Ver Detalhes" size="md" />
        </Link>
      </Grid>
    </Grid>
  );
}
