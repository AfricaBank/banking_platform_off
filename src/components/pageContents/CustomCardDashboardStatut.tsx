import { Flex, Text, Box, Icon, Spacer } from "@chakra-ui/react";
import { CustomCardDashboardStatProps } from "./pageContents.type.ts";

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
      borderRadius="24px"
      p="30px"
      boxShadow="0px 10px 30px rgba(0, 0, 0, 0.04)"
      backgroundColor="white"
      width="100%"
    >
      <Flex align="center">
        <Box
          borderRadius="15px"
          bg={iconBg}
          p="4"
          height="75px"
          width="75px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {IconComponent && (
            <Icon as={IconComponent} color="white" fontSize="40px" />
          )}
        </Box>
        <Box ml="6">
          <Text fontWeight="medium" color="text.muted" fontSize="md">
            {title}
          </Text>
          <Text
            fontSize="4xl"
            fontWeight="bold"
            color="text.main"
            letterSpacing="-1px"
          >
            {value}
            {percentage && (
              <Box
                as="span"
                ml="2"
                color={progressColor}
                fontSize="16px"
                fontWeight="semibold"
                verticalAlign="middle"
              >
                {percentage}
              </Box>
            )}
          </Text>
        </Box>
      </Flex>

      <Box mt="45px">
        <Flex mb="3">
          <Text fontSize="md" fontWeight="bold" color={progressColor}>
            0
          </Text>
          <Spacer />
          <Text fontSize="md" fontWeight="bold" color={progressColor}>
            {total || value}
          </Text>
        </Flex>
        <Box
          bg="darkGrey.50"
          h="10px"
          w="100%"
          rounded="full"
          overflow="hidden"
        >
          <Box bg={progressColor} h="100%" w="100%" />
        </Box>
      </Box>
    </Box>
  );
};
