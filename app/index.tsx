import { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/Utils/redux/reducers/theme.slice";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import "@/global.css";
import {
  PermanentMarker_400Regular,
  useFonts,
} from "@expo-google-fonts/permanent-marker";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { checkUserAuthentication } from "@/Utils/methods/methods";
import { useGetUserDetailsMutation } from "@/Utils/redux/apiQuery/authApi";

export default function WelcomeScreen() {
  const [appIsReady, setAppIsReady] = useState(false);
  const selector = useSelector((state: any) => state.user);
  const [fetchUserDetails] = useGetUserDetailsMutation();
  const { info } = selector;

  const [fontsLoaded, fontError] = useFonts({
    PermanentMarker: PermanentMarker_400Regular,
    Roboto: Roboto_400Regular,
    RobotoBold: Roboto_700Bold,
    Poppinsregular: Poppins_400Regular,
    PoppinsSemiBold: Poppins_600SemiBold,
    PoppinsBold: Poppins_700Bold,
    PoppinsExtraBold: Poppins_800ExtraBold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const themeMode = await AsyncStorage.getItem("themeMode");
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      const isAuthenticated = await checkUserAuthentication();
      if (isAuthenticated) {
        console.log("Authenticated");
        try {
          const result = await fetchUserDetails(null);
          if ("data" in result) {
            console.log("User Details Fetched Successfully");
            router.replace("/chatsTabs");
          } else if ("error" in result) {
            console.log("API Error fetching user details:", result.error);
          }
          await SplashScreen.hideAsync();
        } catch (error) {
          console.log("Exception while fetching user details:", error);
        }
      } else {
        console.log("Not Authenticated");
        await SplashScreen.hideAsync();
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#000", "#471b72", "#000"]}
      onLayout={onLayoutRootView}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 0.8 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 items-center gap-1 bg-[rgba(0,0,0,0.4)] px-3">
        <View className="flex-row items-center justify-center gap-1 mt-[35px]">
          <Text
            className="text-[#fff] text-[40px]"
            style={{
              fontFamily: "PermanentMarker",
            }}
          >
            C
          </Text>
          <Text className="text-[#fff] text-[22px] font-[900] tracking-wider">
            Chatbox
          </Text>
        </View>
        <View>
          <Text className="text-[#fff] text-[87px] font-[400] tracking-wider">
            Connect friends <Text className="font-[900]">easily & quickly</Text>
          </Text>
          <Text className="text-lighterGrey text-[20px] tracking-wider mt-3 leading-[30px]">
            Our chat app is the perfect way to stay connected with friends and
            family.
          </Text>
        </View>

        {/* Fixed Sign Up Button */}
        <View className="w-[100%] items-center justify-center px-4 mt-[15px]">
          <View
            className="w-[100%] bg-[#fff] h-[45px] flex-row items-center justify-center rounded-[10px]"
            onTouchEnd={() => router.push("/Register")}
          >
            <Text className="text-darkestBlack text-[18px] font-semibold text-center">
              Sign up with email
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-center gap-2 w-[100%] px-28 mt-[15px]">
          <View className="w-[100%] h-[1px] bg-[#969594]"></View>
          <Text className="text-lighterGrey text-[18px] font-semibold">OR</Text>
          <View className="w-[100%] h-[1px] bg-[#969594]"></View>
        </View>

        <View className="w-[100%] items-center justify-center mt-[10px] px-4 gap-[15px]">
          <Text className="text-lighterGrey text-[17px] font-semibold tracking-widest">
            Already have an account ?
          </Text>

          {/* Fixed Log In Button */}
          <View
            className="w-[100%] border-[1px] border-[#fff] h-[45px] flex-row items-center justify-center rounded-[10px]"
            onTouchEnd={() => router.push("/Login")}
          >
            <Text className="text-[#fff] text-[18px] font-semibold text-center">
              Log In
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
