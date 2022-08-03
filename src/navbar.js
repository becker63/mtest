import { Box, Button, Center, Container, HStack } from '@chakra-ui/react'
import * as React from 'react'
import { useRecoilState } from 'recoil'
import { gridlayout } from './atoms'

const Navbar = () => {
  const [appMap, setAppMap] = useRecoilState(gridlayout)
  const setgrid = () => {}

  const [viewon, setview] = React.useState(false)

  return (
    <>
      <Box as="section" pb={{ base: '12', md: '24' }}>
        <Box as="nav" bg="bg-surface">
          <Container py={{ base: '4', lg: '5' }}>
            <Center>
              <Button onClick={() => setview(!viewon)}>Add New Window</Button>

              {viewon === true && (
                <div>
                  <HStack>
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                  </HStack>
                </div>
              )}
            </Center>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default Navbar
