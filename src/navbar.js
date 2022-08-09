import { Box, Button, Center, Container, HStack } from '@chakra-ui/react'
import * as React from 'react'
import dropRight from 'lodash/dropRight'
import {
  getPathToCorner,
  getNodeAtPath,
  getOtherDirection,
  Corner,
  updateTree
} from 'react-mosaic-component'
import { useRecoilState } from 'recoil'
import { gridlayout, openwindows } from './atoms'

const addToTopRight = (setgrid, gridstate, window) => {
  const path = getPathToCorner(gridstate, Corner.TOP_RIGHT)
  const parent = getNodeAtPath(gridstate, dropRight(path))
  const destination = getNodeAtPath(gridstate, path)
  const direction = parent ? getOtherDirection(parent.direction) : 'row'

  console.clear()
  console.log(JSON.stringify(gridstate, null, '\t'))
  console.log(path)
  console.log(parent)
  console.log(destination)
  console.log(direction)

  let first
  let second
  if (direction === 'row') {
    first = destination
    second = window
  } else {
    first = window
    second = destination
  }

  gridstate = updateTree(gridstate, [
    {
      path,
      spec: {
        $set: {
          direction,
          first,
          second
        }
      }
    }
  ])
  console.log(JSON.stringify(gridstate, null, '\t'))
  setgrid(gridstate)
}

const Navbar = () => {
  const [appMap, setAppMap] = useRecoilState(gridlayout)

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
                    <Button
                      onClick={() => addToTopRight(setAppMap, appMap, 'e1')}>
                      1
                    </Button>
                    <Button
                      onClick={() => addToTopRight(setAppMap, appMap, 'e2')}>
                      2
                    </Button>
                    <Button
                      onClick={() => addToTopRight(setAppMap, appMap, 'e3')}>
                      3
                    </Button>
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
