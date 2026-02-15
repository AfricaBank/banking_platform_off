import { Flex, Text, Box, Icon, Spacer } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface CustomCardDashboardStatProps {
  title: string;
  value: string | number;
  percentage?: string;
  total?: string | number;
  icon: IconType;
  iconBg?: string; // Utilise tes variantes (ex: "dogerBlue.400")
  progressColor?: string; // Utilise tes variantes (ex: "brandGreen.400")
}

export const CustomCardDashboardStat: React.FC<
  CustomCardDashboardStatProps
> = ({
  title,
  value,
  percentage,
  total,
  icon: IconComponent,
  iconBg = "dogerBlue.400",
  progressColor = "brandGreen.400",
}) => {
  return (
    <Box
      maxWidth="331px"
      borderRadius="md"
      minHeight="170px"
      p="15px"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.05)"
      height="169px"
      backgroundColor="white"
      width="100%"
    >
      <Flex>
        <Box
          borderRadius="10px"
          bg={iconBg}
          p="4"
          height="62px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon color="white" fontSize="30px">
            <IconComponent />
          </Icon>
        </Box>
        <Box ml="3">
          <Text mt="1" fontWeight="medium" color="text.muted">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {value}
            {percentage && (
              <Box
                as="span"
                ml="1"
                color={progressColor}
                fontSize="13px"
                verticalAlign="super"
              >
                {percentage}
              </Box>
            )}
          </Text>
        </Box>
      </Flex>

      <Box mt="24px">
        <Flex mb="1">
          <Text fontSize="xs" fontWeight="bold" color={progressColor}>
            0
          </Text>
          <Spacer />
          <Text fontSize="xs" fontWeight="bold" color={progressColor}>
            {total || value}
          </Text>
        </Flex>
        {/* Barre de progression utilisant la prop dynamique */}
        <Box bg="lightGrey.100" h="8px" w="100%" rounded="md" overflow="hidden">
          <Box bg={progressColor} h="100%" w="100%" />
        </Box>
      </Box>
    </Box>
  );
};
