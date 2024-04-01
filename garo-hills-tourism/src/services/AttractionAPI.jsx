import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeJCmW4O1MgyxeZeTkJGawxXXQLob1-aE",
  authDomain: "garo-hills-tourism.firebaseapp.com",
  projectId: "garo-hills-tourism",
  storageBucket: "garo-hills-tourism.appspot.com",
  messagingSenderId: "540914228568",
  appId: "1:540914228568:web:4ac51521f2dea4e96ad92d",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const getAttraction = async () => {
  const response = await fetch("http://localhost:4000/attraction");
  const data = await response.json();
  return data;
};

export const deleteAttraction = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/attraction/delete/${id}`,
      {
        method: "delete",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to Delete Data, Something went wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.messaage || "Failed to delete data");
  }
};

//Add Attraction

export const addAttraction = async (place) => {
  let headerImgUrl;
  let img1Url;

  try {
    const headerImgName = `${Math.random()}-${place.headerimage.name}`.replace(
      "/",
      ""
    );
    const storageRef1 = ref(storage, `images/${headerImgName}`);

    const img1Name = `${Math.random()}-${place.img1.name}`.replace("/", "");
    const storageRef2 = ref(storage, `images/${img1Name}`);

    // Upload image to Firebase Storage
    await uploadBytes(storageRef1, place.headerimage);
    await uploadBytes(storageRef2, place.img1);

    // Get the download URL of the uploaded image
    const downloadUrl1 = await getDownloadURL(storageRef1);
    const downloadUrl2 = await getDownloadURL(storageRef2);

    // Now you can use the downloadUrl as needed (e.g., save it to MongoDB)
    console.log(downloadUrl1);
    console.log(downloadUrl2);
    headerImgUrl = downloadUrl1;
    img1Url = downloadUrl2;
  } catch (error) {
    console.error("Failed to upload image to Firebase Storage:", error.message);
  }
  try {
    const requestData = {
      ...place,
      headerimage: headerImgUrl,
      img1: img1Url,
    };
    const response = await fetch("http://localhost:4000/attraction/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to upload new data");
  }
};

//Edit Attraction
export const editAttraction = async (place) => {
  const hasImagePath =
    typeof place.headerimage === "string" &&
    (place.headerimage.startsWith("https://firebasestorage.googleapis.com") ||
      place.headerimage.name.startsWith(
        "https://firebasestorage.googleapis.com"
      ));

  console.log(hasImagePath);

  let imageUrl;

  if (!hasImagePath) {
    try {
      const imageName = `${Math.random()}-${place.headerimage.name}`.replace(
        "/",
        ""
      );
      const storageRef = ref(storage, `images/${imageName}`);

      // Upload image to Firebase Storage
      await uploadBytes(storageRef, place.headerimage);

      // Get the download URL of the uploaded image
      const downloadUrl = await getDownloadURL(storageRef);

      // Now you can use the downloadUrl as needed (e.g., save it to MongoDB)
      console.log(downloadUrl);
      imageUrl = downloadUrl;
    } catch (error) {
      console.error(
        "Failed to upload image to Firebase Storage:",
        error.message
      );
    }
  }

  try {
    let requestData;
    if (!hasImagePath) {
      requestData = {
        ...place,
        headerimage: imageUrl,
      };
    }

    const response = await fetch(
      `http://localhost:4000/attraction/update/${place._id}`,
      {
        method: "Put",
        headers: {
          "Content-type": "application/json",
        },
        body: !hasImagePath
          ? JSON.stringify(requestData)
          : JSON.stringify(place),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to update data");
  }
};
