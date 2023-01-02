import { Divider, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { GetStaticPropsContext } from "next";
import Image from "next/image";
import BaseHeader from "../../src/components/BaseHeader";
import CardDetails from "../../src/components/CardDetails";
import { IEvent } from "../../src/interfaces/Event";

export default function EventDetail({props}) {
  console.log(props);
  
  return (
    <>
      <BaseHeader title="Detalhes" />
      <main>
        <Grid container>
          <Grid item className="relative" lg={8} md={8}>
            <Image
              alt="banner"
              src="/assets/banner.jpg"
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
              <CardDetails />
            </Paper>
          </Grid>
        </Grid>
        <Grid container className="mt-6">
          <Grid item lg={8} md={8} xs={12}>
            <Divider sx={{ borderColor: "rgba(255,207,0,.4)" }} />
            <Typography variant="h5" component="h5" className="font-light">
              Descrição do Evento
            </Typography>
            <Typography className="my-4 text-gray-500">descricao</Typography>
          </Grid>
        </Grid>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const response = await axios.get<IEvent[]>("/api/eventos");

  const paths = response.data.map((event) => ({
    params: { id: event.id },
  }));
  console.log(paths);
  

  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const response = await axios.get<IEvent[]>("/api/eventos");
  const event = response.data.filter((data) => data.id === context?.params?.id);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: { event },
  };
}
