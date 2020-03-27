import React from "react";
import {
  Box,
  Checkbox,
  Link,
  Flex,
  Text,
} from "@chakra-ui/core";

export default function Talk({ title, link, description, onCheck, isChecked }) {
  return (
    <Box flex="1" textAlign="left">
      <Flex justify="space-between">
        <Flex>
          <Checkbox
            pl={3}
            pr={3}
            isChecked={isChecked}
            onChange={e => onCheck(e, link)}
          />
          <Text fontSize="lg">
            <Link
              isExternal
              href={link}
              >
              {title}
            </Link>
          </Text>
        </Flex>
        <Text pr={3}>
          <Link
            isExternal
            href={link}
            >
          {description}
          </Link>
        </Text>
      </Flex>
    </Box>
  );
}
