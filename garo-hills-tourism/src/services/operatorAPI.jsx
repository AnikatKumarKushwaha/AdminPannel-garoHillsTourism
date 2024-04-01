export const getOperator = async () => {
  const response = await fetch("http://localhost:4000/operator");
  const data = await response.json();
  return data;
};

export const deleteOperator = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/operator/delete/${id}`,
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

export const addOperator = async (place) => {
  try {
    const response = await fetch("http://localhost:4000/operator/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to upload new data");
  }
};

//Edit Attraction
export const editOperator = async (place) => {
  try {
    const response = await fetch(
      `http://localhost:4000/operator/update/${place._id}`,
      {
        method: "Put",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(place),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to update data");
  }
};
