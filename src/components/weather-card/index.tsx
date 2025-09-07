import { Box, Text, Flex, Divider } from "@chakra-ui/react";

type WeatherData = {
  name: string;
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
    temperature_2m_mean: number[];
  };
};

type WeatherCardProps = {
  weather?: WeatherData;
};

export default function WeatherCard({ weather }: WeatherCardProps) {
  if (!weather) return null;

  return (
    <Box
      bg="orange.50"
      p={6}
      rounded="xl"
      shadow="md"
      textAlign="center"
      w="100%"
      mx="auto"
      maxW="sm"
    >
      <Text fontWeight="bold" color="gray.700" mb={3} fontSize='2xl'>
        {weather.name}
      </Text>

      <Text fontSize="4xl" fontWeight="bold" color="gray.800">
        {Math.round(weather.daily.temperature_2m_mean[0])}ºC
      </Text>
      <Text fontSize="md" color="gray.600">
        Mín {Math.round(weather.daily.temperature_2m_min[0])}º / Máx{" "}
        {Math.round(weather.daily.temperature_2m_max[0])}º
      </Text>

      <Divider my={4} />

      <Flex justify="space-between" mt={2}>
        {weather.daily.time.slice(1, 6).map((day, i) => (
          <Box key={day} textAlign="center">
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              {new Date(day).toLocaleDateString("pt-BR", {
                weekday: "short",
              })}
            </Text>

            <Text fontSize="sm" color="orange.600">
              {Math.round(weather.daily.temperature_2m_min[i + 1])}º -{" "}
              {Math.round(weather.daily.temperature_2m_max[i + 1])}º
            </Text>
          </Box>
        ))}
      </Flex>

    </Box>
  );
}
