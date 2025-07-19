// Fake user IDs (ObjectId strings)
const user1 = "64c123456789abcdef000001";
const user2 = "64c123456789abcdef000002";
const user3 = "64c123456789abcdef000003";
const user4 = "64c123456789abcdef000004";

// Mock chat data
const mockChats = [
  // Single Chat Example
  {
    members: [
      {
        _id: user1,
        username: "John Doe",
        profilePicture: "https://example.com/profile1.jpg",
      },
      {
        _id: user2,
        username: "Jane Smith",
        profilePicture: "https://example.com/profile2.jpg",
      },
    ],
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
  {
    members: [
      {
        _id: user1,
        username: "John Doe",
        profilePicture: "https://example.com/profile1.jpg",
      },
      {
        _id: user2,
        username: "Jane Smith",
        profilePicture: "https://example.com/profile2.jpg",
      },
      {
        _id: user3,
        username: "Alice Johnson",
        profilePicture: "https://example.com/profile3.jpg",
      },
    ],
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
    members: [
      {
        _id: user1,
        username: "John Doe",
        profilePicture: "https://example.com/profile1.jpg",
      },
      {
        _id: user2,
        username: "Jane Smith",
        profilePicture: "https://example.com/profile2.jpg",
      },
      {
        _id: user3,
        username: "Alice Johnson",
        profilePicture: "https://example.com/profile3.jpg",
      },
    ],
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
