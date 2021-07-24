import { Flex } from "@chakra-ui/react"
import Image from "next/image"

const Footer = () => {
  return (
    <Flex
      as="footer"
      mt="auto"
      borderTop="1px solid"
      borderColor="black"
      p={4}
      w="full"
      h="footer"
      justifyContent="center"
    >
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </Flex>
  )
}

export default Footer
