import { Divider, Grid, Paper, Typography } from "@mui/material";
import { GetStaticPropsContext } from "next";
import Image from "next/image";
import BaseHeader from "../../src/components/BaseHeader";
import CardDetails from "../../src/components/CardDetails";
import { IEvent } from "../../src/interfaces/Event";

export default function EventDetail(event: IEvent) {
  
  const { title, banner, description} = event
  
  return (
    <>
      <BaseHeader title={title} />
      <main>
        <Grid container>
          <Grid item className="relative" lg={8} md={8}>
            <Image
              alt="banner"
              src={`/assets/${banner}`}
              className="max-h-[430px] w-full object-cover rounded-2xl"
              width={430}
              height={100}
            />
          </Grid>
          <Grid item lg={4} md={4} className="px-10">
            <Paper
              className="bg-gray-100 rounded-2xl border border-gray-300"
              sx={{
                height: "auto",
              }}
              elevation={2}
            >
              <CardDetails event={event} />
            </Paper>
          </Grid>
        </Grid>
        <Grid container className="mt-6">
          <Grid item lg={8} md={8} xs={12}>
            <Divider sx={{ borderColor: "rgba(255,207,0,.4)" }} />
            <Typography variant="h5" component="h5" className="font-light">
              Descrição do Evento
            </Typography>
            <Typography className="my-4 text-gray-500">{description}</Typography>
          </Grid>
        </Grid>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const response = await fetch("http://localhost:3000/api/eventos")
  const events = await response.json();

  const paths = events?.map((event: IEvent) => ({
    params: { id: event.id.toString() }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const response = await fetch("http://localhost:3000/api/eventos")
  const events = await response.json();
  const event = events?.filter((data: IEvent) => data.id === Number(context?.params?.id));

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: { ...event[0] },
  };
}
