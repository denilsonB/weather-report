import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container
} from "@chakra-ui/react";

type WeatherData = {
  name: string;
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
  };
};

type WeatherTableProps = {
  weathers: WeatherData[];
};

export default function WeatherTable({ weathers }: WeatherTableProps) {
  return (
    <TableContainer>
      <Container >
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Min</Th>
              <Th>Max</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {weathers.map((weather, i) => (
              <Tr key={i}>
                <Td textColor={"black"}>{weather.daily.temperature_2m_min[0]}º</Td>
                <Td textColor={"black"}>{weather.daily.temperature_2m_max[0]}º</Td>
                <Td textColor={"black"}>{weather.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </TableContainer>
  );
}
