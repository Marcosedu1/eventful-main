import { Divider, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import BaseHeader from "../src/components/BaseHeader";
import CardDetails from "../src/components/CardDetails";

export default function Home() {
  return (
    <>
      <BaseHeader title="Home" />
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
            <Paper className="bg-gray-100 rounded-2xl border border-gray-300" sx={{
              height: 'auto'
              }} elevation={2}>
                <CardDetails />
            </Paper>
          </Grid>
        </Grid>
        <Grid container className="mt-6">
          <Grid item lg={8} md={8} xs={12}>
            <Divider sx={{ borderColor: 'rgba(255,207,0,.4)'}}/>
            <Typography variant="h5" component='h5' className="font-thin">
              Descrição do Evento
            </Typography>
          </Grid>
        </Grid>
      </main>
    </>
  );
}
