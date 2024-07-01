import React, { useEffect, useState } from "react";
import "./detail.css";
import { auth, db } from "../../lib/firebse";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
export default function Detail() {
  const [addMode, setAddMode] = useState(false);
  const [addMode1, setAddMode1] = useState(false);
  const [addMode2, setAddMode2] = useState(false);
  const [addMode3, setAddMode3] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const [chat, setChat] = useState();
  var count = 0;

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);
  console.log("chats", chat);

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Live the life with happiness</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img
              src={addMode ? "./arrowUp.png" : "./arrowDown.png"}
              alt=""
              className="add"
              onClick={() => setAddMode((prev) => !prev)}
            />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img
              src={addMode1 ? "./arrowUp.png" : "./arrowDown.png"}
              alt=""
              className="add"
              onClick={() => setAddMode1((prev) => !prev)}
            />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img
              src={addMode2 ? "./arrowDown.png" : "./arrowUp.png"}
              alt=""
              className="add"
              onClick={() => setAddMode2((prev) => !prev)}
            />
          </div>

          <div className="photos">
          {addMode2 &&
              chat?.messages?.map((message, index) =>
                message.img ? (
                  <div className="photoItem" key={index}>
                    <div className="photoDetail">
                      <img src={message.img} alt={`photo ${index + 1}.jpg`} />
                      <span>photo {count++}.jpg</span>
                    </div>
                    <img src="./download.png" alt="" className="icon" />
                  </div>
                ) : null
              )}
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img
              src={addMode3 ? "./arrowUp.png" : "./arrowDown.png"}
              alt=""
              className="add"
              onClick={() => setAddMode3((prev) => !prev)}
            />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}
