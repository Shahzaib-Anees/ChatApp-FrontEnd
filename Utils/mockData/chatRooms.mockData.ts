// Fake user IDs (ObjectId strings)
const user1 = "64c123456789abcdef000001";
const user2 = "64c123456789abcdef000002";
const user3 = "64c123456789abcdef000003";
const user4 = "64c123456789abcdef000004";

// Mock chat data
const mockChats = [
  // Single Chat Example
  {
    members: [user1, user2],
    message: "Hey! How are you?",
    locked: false,
    archived: false,
    chatType: "single",
    permissions: {
      onlyAdminsCanSend: false,
      onlyAdminsCanAddMembers: false,
      allowMemberLeave: true,
    },
  },
  // Group Chat Example
  {
    memebers: [user1, user2, user3],
    message: "Welcome to the project team!",
    locked: true,
    archived: false,
    chatType: "group",
    permissions: {
      onlyAdminsCanSend: true,
      onlyAdminsCanAddMembers: true,
      allowMemberLeave: true,
    },
  },
  // Archived Group Chat
  {
    memebers: [user2, user3, user4],
    message: "This chat is archived now.",
    locked: false,
    archived: true,
    chatType: "group",
    permissions: {
      onlyAdminsCanSend: false,
      onlyAdminsCanAddMembers: true,
      allowMemberLeave: false,
    },
  },
];
export default mockChats;
