// https://www.churchofjesuschrist.org/general-conference/speakers/archive?speaker=Russell%20M.%20Nelson&lang=eng&page=1

import React, { useState } from "react";
import {
  Divider,
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  Heading,
  Flex,
  Link,
  Text,
  Grid,
  Box,
} from "@chakra-ui/core";
import ColorModeToggle from "./ColorModeToggle";
import Talk from "./Talk";
import Page from "./Page";
import data from "./data/data.json";

function updateStorage(key, checked) {
  const storedItem = localStorage.getItem(key);
  checked && !storedItem
    ? localStorage.setItem(key, new Date())
    : localStorage.removeItem(key);
}

function getStoredCount(keys) {
  return keys.reduce((acc, key) => {
    if (localStorage.getItem(key)) {
      acc++;
    }
    return acc;
  }, 0);
}

function keyIsStored(key) {
  return localStorage.getItem(key);
}

export default function App() {
  const [checkedArr, setCheckedArr] = useState(() => {
    return data.talks
      .filter(talk => keyIsStored(talk.href))
      .map(talk => talk.href)
  });

  function onCheck(e, href) {
    updateStorage(href, e.target.checked)
    setCheckedArr(data.talks
      .filter(talk => keyIsStored(talk.href))
      .map(talk => talk.href))
  }
  return (
    <div className="App">
      <ThemeProvider>
        <CSSReset />
        <ColorModeProvider>
          <Page>
            <Heading p={3}>
              <Flex justify="space-between">
               <Flex> 
                  <Link
                    isExternal
                    href="https://www.churchofjesuschrist.org/study/general-conference/speakers/russell-m-nelson"
                  >
                    Talks of President Nelson
                  </Link>
                  <Text pl={2}>
                    (<span>{getStoredCount(data.talks.map(talk => talk.href))}</span>/
                    <span>{data.count}</span>)
                  </Text>
                </Flex>
                <ColorModeToggle />
              </Flex>
            </Heading>
              {data.talks.map((talk, i, arr) => {
                return (
                  <div key={`${talk.href}`}>
                    <Divider />
                    <Talk
                      title={talk.title}
                      link={talk.href}
                      description={talk.time}
                      onCheck={onCheck}
                      isChecked={checkedArr.includes(talk.href)}
                    />
                  </div>
                );
              })}
            <Divider />
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Box w="100%" h="30" p={10}>
                <Flex justify="right">
                  <Link
                    isExternal
                    href="https://www.churchofjesuschrist.org/church/leader/russell-m-nelson"
                    >
                    President Russell M. Nelson
                  </Link>
                </Flex>
              </Box>
              <Box w="100%" h="30" p={10}>
                <Flex justify="left">
                  <Link
                    isExternal
                    href="https://zvakanaka.github.io/scriptures-of-Jesus"
                  >
                    Sciptures of Jesus
                  </Link>
                </Flex>
              </Box>
            </Grid>
          </Page>
        </ColorModeProvider>
      </ThemeProvider>
    </div>
  );
}
