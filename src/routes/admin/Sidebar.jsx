import React from "react";
import { navSidebar } from "../../lib/utils";
import { Box, Image, Stack, StackDivider, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <VStack
      align={"flex-start"}
      className="w-[20%] border-r border-black"
      divider={<StackDivider></StackDivider>}
    >
      {navSidebar.map((item, index) => (
        <Box className="w-full" key={index}>
          {item.titleGroup ? (
            <h1 className="font-semibold text-gray-500">{item.titleGroup}</h1>
          ) : (
            <></>
          )}
          <VStack align={"flex-start"} className="w-full p-5">
            {item.listItem.map((children, indexchild) => (
              <Box key={indexchild} className="flex items-center p-2 gap-2">
                <children.iconItem className="h-5 w-5"></children.iconItem>
                <Link to={children.link ? children.link : ""}>
                  {children.nameItem}
                </Link>
              </Box>
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};
export default Sidebar;
