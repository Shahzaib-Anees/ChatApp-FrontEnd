import { Text, FlatList, View } from "react-native";
import React, { useState } from "react";

const ChatFiltersListSection = ({ darkMode }: { darkMode: boolean }) => {
  const [activatedFilter, setActivatedFilter] = useState<string>("All");
  const filterTypes = [
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Unread",
    },
    {
      id: 3,
      name: "Favourites",
    },
    {
      id: 4,
      name: "Groups",
    },
  ];
  return (
    <View className="mt-2 px-[1px]">
      <FlatList
        style={{
          zIndex: 1,
        }}
        data={filterTypes}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            className={`flex-row gap-1 items-center justify-center py-2 px-5 border-[1px]  ${darkMode ? "border-[#686666]" : "border-lighterGrey"} rounded-[25px] mx-2 ${activatedFilter == item.name && "!border-none bg-darkGreen"}`}
            // There to change the filter functionality
            onTouchStart={() => {
              setActivatedFilter(item.name);
            }}
          >
            <Text
              className={`${darkMode ? "text-lightestGrey" : "text-darkestBlack"} font-[RobotoBold] ${activatedFilter == item.name && "text-white "}`}
            >
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ChatFiltersListSection;
