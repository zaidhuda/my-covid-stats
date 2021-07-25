import Head from 'next/head'
import { Box, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import Footer from '../components/Footer';
import CasesToday from '../components/CasesToday';
import Trend from '../components/Trend';
import { epidemic } from '../lib/api';

interface Props {
  casesState: any;
}

export default function Home({ casesState }: Props) {
  return (
    <>
      <Head>
        <title>MY Covid Stats</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box h="calc(100vh - var(--chakra-sizes-footer))">
        <Flex direction="column" alignItems="center" minH="full" minW="90vw">
          <Tabs isFitted variant="enclosed" w="full">
            <TabList>
              <Tab>Latest</Tab>
              <Tab>Trend</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CasesToday casesState={casesState} />
              </TabPanel>
              <TabPanel>
                <Trend casesState={casesState} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
        <Footer />
      </Box>
    </>
  );
}

export const getStaticProps = async () => {
  const { data: casesState } = await epidemic.casesState();

  return {
    props: {
      casesState,
    },
    revalidate: 600,
  };
};
