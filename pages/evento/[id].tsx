import { Divider, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import BaseHeader from "../../src/components/BaseHeader";
import CardDetails from "../../src/components/CardDetails";
import { useEvent } from "../../src/hooks/useEvent";

export default function EventDetail() {
  const {
    query: { id },
  } = useRouter();
  const { data, fetchStatus, status } = useEvent(id as string);

  const bannerUrl = data?.banner
    ? `/uploads/${data?.banner}`
    : `https://via.placeholder.com/750x370?text=${data?.title}`;

  return (
    <>
      <BaseHeader title={data?.title!} />
      <main>
        {status === "success" && (
          <>
            <Grid container>
              <Grid item className="relative" lg={8} md={8}>
                <Image
                  alt="banner"
                  src={bannerUrl}
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
                  <CardDetails event={data} />
                </Paper>
              </Grid>
            </Grid>
            <Grid container className="mt-6">
              <Grid item lg={8} md={8} xs={12}>
                <Divider sx={{ borderColor: "rgba(255,207,0,.4)" }} />
                <Typography
                  variant="h5"
                  component="h5"
                  className="font-light mt-5"
                >
                  Descrição do Evento
                </Typography>
                <Typography className="my-4 text-gray-500">
                  {data.description}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </main>
    </>
  );
}

// export async function getStaticPaths() {
//   const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/event`);

//   const paths = response.data?.map((event: IEvent) => ({
//     params: { id: event.id.toString() },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps(context: GetStaticPropsContext) {
//   // const response = await axios.get(
//   //   `${process.env.NEXT_PUBLIC_API_URL}/event/${context?.params?.id}`
//   // );
//   const queryClient = new QueryClient();
//   const eventId = context?.params?.id as string;
//   await queryClient.prefetchQuery(['event',eventId],() => fetchEvent(Number(eventId)));

//   // if (!response.data) {
//   //   return {
//   //     notFound: true,
//   //   };
//   // }

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient)
//     },
//   };
// }
