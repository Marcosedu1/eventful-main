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
  event: { id, title, banner, datetime, city, uf },
}: Props) {
  const bannerUrl = banner
    ? `/uploads/${banner}`
    : `https://via.placeholder.com/350x180?text=${title}`;

  return (
    <Grid>
      <Box className="relative">
        <Link passHref href={`/evento/${id}`}>
          <Image
            src={bannerUrl}
            width={350}
            height={180}
            alt="banner"
            className="max-h-[180px] w-full object-cover rounded-xl hover:opacity-80 transition-opacity"
            placeholder="blur"
            blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
            unoptimized={!banner}
          />
          <Box className="p-5">
            <Typography sx={{ color: "rgba(255,155,0,1)" }}>
              {format(new Date(datetime), "dd/MM/yyyy")}
            </Typography>
            <Typography variant="h5">{title}</Typography>
            <Typography className="mt-1">
              {city} - {uf}
            </Typography>
          </Box>
        </Link>
      </Box>
    </Grid>
  );
}
