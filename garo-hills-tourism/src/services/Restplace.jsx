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

export const getRestPlace = async () => {
  const response = await fetch("http://localhost:4000/restplace");
  const data = await response.json();
  return data;
};

export const deleteRestPlace = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/restplace/delete/${id}`,
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

export const addRestPlace = async (place) => {
  let imageUrl;
  try {
    const imageName = `${Math.random()}-${place.image.name}`.replace("/", "");
    const storageRef = ref(storage, `images/${imageName}`);

    // Upload image to Firebase Storage
    await uploadBytes(storageRef, place.image);

    // Get the download URL of the uploaded image
    const downloadUrl = await getDownloadURL(storageRef);

    // Now you can use the downloadUrl as needed (e.g., save it to MongoDB)
    console.log(downloadUrl);
    imageUrl = downloadUrl;
  } catch (error) {
    console.error("Failed to upload image to Firebase Storage:", error.message);
  }
  try {
    const requestData = {
      ...place,
      image: imageUrl,
    };
    const response = await fetch("http://localhost:4000/restplace/new", {
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
export const editRestPlace = async (place) => {
  const hasImagePath =
    typeof place.image === "string" &&
    (place.image.startsWith("https://firebasestorage.googleapis.com") ||
      place.image.name.startsWith("https://firebasestorage.googleapis.com"));

  console.log(hasImagePath);

  let imageUrl;

  if (!hasImagePath) {
    try {
      const imageName = `${Math.random()}-${place.image.name}`.replace("/", "");
      const storageRef = ref(storage, `images/${imageName}`);

      // Upload image to Firebase Storage
      await uploadBytes(storageRef, place.image);

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
        image: imageUrl,
      };
    }

    const response = await fetch(
      `http://localhost:4000/restplace/update/${place._id}`,
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
