'use client';

import { Button, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { useGoldPrice } from '@/stores/gold-price';

// const id = ['hello', 'world'];

function Home() {
  const goldPrice = useGoldPrice();
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle((prev) => !prev);

  return (
    <main>
      <Button colorScheme="blue" onClick={handleToggle}>
        Click me to open Gold Price
      </Button>
      {toggle && (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Gold Price</TableCaption>
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th>Unit</Th>
                <Th isNumeric>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Ask Price</Td>
                <Td>N/A</Td>
                <Td isNumeric>{goldPrice.askPrice}</Td>
              </Tr>
              <Tr>
                <Td>Bid Price</Td>
                <Td>N/A</Td>
                <Td isNumeric>{goldPrice.bidPrice}</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Type</Th>
                <Th>Unit</Th>
                <Th isNumeric>Price</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </main>
  );
}

export default observer(Home);
