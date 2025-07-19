import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi } from "../redux/apiQuery/authApi";
import store from "../redux/store/store";
import { jwtDecode } from "jwt-decode";
import * as Contacts from "expo-contacts";
import { setDataInUserState } from "../redux/reducers/user.slice";
import CONFIGS from "../config/configs.app";

// Function to fetch new access token from server
const fetchNewAccessTokenFromServer = async (refreshToken: string) => {
  try {
    const apiResponse = await store
      .dispatch(
        authApi.endpoints.refetchAccessToken.initiate({
          refreshToken: refreshToken,
        })
      )
      .unwrap();
    const data = apiResponse?.data;
    const accesstoken = data?.accessToken;
    const decodedAccesstoken = jwtDecode(accesstoken);
    const userAccessToken: {
      token: string;
      expiresAt: number | undefined;
    } = {
      token: accesstoken,
      expiresAt: decodedAccesstoken?.exp
        ? decodedAccesstoken?.exp * 1000
        : undefined,
    };

    console.log("new userAccessToken", userAccessToken);

    await AsyncStorage.setItem("accessToken", JSON.stringify(userAccessToken));
    return true;
  } catch (error) {
    console.log("Error fetching new access token:", error);
    return false;
  }
};

// Check User Authentication
const checkUserAuthentication = async () => {
  const accessToken: any = await AsyncStorage.getItem("accessToken");
  const refreshToken: any = await AsyncStorage.getItem("refreshToken");
  if (accessToken !== null) {
    const parsedAccessToken = JSON.parse(accessToken);
    console.log("parsedAccessToken", parsedAccessToken);
    // Check If Access Token is Expired
    console.log(typeof parsedAccessToken?.expiresAt);
    if (parsedAccessToken?.expiresAt < Date.now()) {
      console.log("accessToken expired! checking refreshToken");
      // Refresh Token checking if access token is expired
      if (refreshToken !== null) {
        const parsedRefreshToken = JSON.parse(refreshToken);
        //Check if refresh token is expired
        if (parsedRefreshToken?.expiresAt < Date.now()) {
          console.log("refreshToken expired");
          // if refreshToken expired return false
          return false;
        } else {
          // if refreshToken is not expired, fetch new access token from server and return true
          const isRefreshedAccessToken = await fetchNewAccessTokenFromServer(
            parsedRefreshToken?.token
          );
          if (isRefreshedAccessToken) {
            return true;
          }
        }
      }
      // if accessToken is expired and refreshToken is null, return false
      console.log("accessToken expired");
      return false;
    } else {
      // If access token is not expired, return true
      console.log("accessToken verified");
      const parsedToken = JSON.parse(accessToken);
      store?.dispatch(
        setDataInUserState({ name: "accessToken", data: parsedToken?.token })
      );
      return true;
    }
  } else {
    // if accessToken is null, return false
    return false;
  }
};

// Get contacts permsission

async function getContactPermissions() {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    console.log("Permission granted!");
  } else {
    console.log("Permission denied.");
  }
}

async function loadUserContacts() {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    let phoneNumbersArray: any[] = [];
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
    });
    data.map((contact: any) => {
      contact?.phoneNumbers.map((phoneNumber: any) => {
        phoneNumbersArray.push(phoneNumber?.number);
      });
    });
    console.log(phoneNumbersArray);
  } else {
    await getContactPermissions();
  }
}

const getFilterizedChatRooms = (filter: any, searchQuery: string) => {
  if (CONFIGS.useMockServer) {
  }
  const { data } = store.getState().chatRooms;
  const filteredChatRooms = data.filter((chatRoom: any) => {
    return chatRoom.members.some((member: any) => {
      return member.username.toLowerCase().includes(filter.toLowerCase());
    });
  });
  return filteredChatRooms;
};

const getGroupsFromChatRoom = () => {};
const getLockedChatRooms = () => {};
const getArchivedChatRooms = () => {};

export {
  checkUserAuthentication,
  getContactPermissions,
  loadUserContacts,
  getFilterizedChatRooms,
};
